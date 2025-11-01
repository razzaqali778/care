import { useCallback, useEffect, useMemo } from "react";
import { useForm, type UseFormReturn, type Path } from "react-hook-form";
import {
  personalInfoSchema,
  familyFinancialSchema,
  situationDescriptionSchema,
  fullFormSchema,
} from "@/lib/Validations";
import { localizedZodResolver } from "@/lib/LocalizedZodResolver";
import { FORM_DEFAULTS, FIELDS_BY_STEP } from "@/constants/form";
import { type StepKey } from "@/constants/application";
import type { SubmissionForm } from "@/types/Types";
import { useDraft, clearDraft } from "@/hooks/useDraft";
import type { SupportedLang } from "@/constants/lang";
import type { ApplicationMode } from "../types";

type UseApplicationStepperProps = {
  draftKey: string;
  initialValues?: Partial<SubmissionForm>;
  stepKey: StepKey;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSubmit: (data: SubmissionForm) => Promise<void> | void;
  mode?: ApplicationMode;
  onRedirectToSubmissions?: () => void;
  onSubmitSuccess?: () => void;
  t: (key: string) => string;
  language: SupportedLang;
};

type UseApplicationStepperReturn = {
  form: UseFormReturn<SubmissionForm>;
  isLastStep: boolean;
  nextStep: () => Promise<void>;
  handleFinalClick: () => Promise<void>;
};

export const useApplicationStepper = ({
  draftKey,
  initialValues,
  stepKey,
  stepIndex,
  totalSteps,
  onNext,
  onSubmit,
  mode = "create",
  onRedirectToSubmissions,
  onSubmitSuccess,
  t,
  language,
}: UseApplicationStepperProps): UseApplicationStepperReturn => {
  const resolver = useMemo(
    () => localizedZodResolver(fullFormSchema, t),
    [t, language]
  );

  const form = useForm<SubmissionForm>({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: FORM_DEFAULTS,
  });

  useDraft(form, draftKey, initialValues);

  const currentFields = useMemo(() => FIELDS_BY_STEP[stepKey], [stepKey]);
  const isLastStep = stepIndex >= totalSteps - 1;

  const markStepFieldsTouched = useCallback(
    (fields: readonly (keyof SubmissionForm)[]) => {
      fields.forEach((fieldName) => {
        const path = fieldName as Path<SubmissionForm>;
        const currentValue = form.getValues(path);
        form.setValue(path, currentValue, {
          shouldDirty: false,
          shouldTouch: true,
          shouldValidate: false,
        });
      });
    },
    [form]
  );

  useEffect(() => {
    const activeFields = FIELDS_BY_STEP[stepKey];
    const firstField = activeFields[0];
    const allFields = Object.keys(form.getValues()) as Array<
      keyof SubmissionForm
    >;
    const inactiveFields = allFields.filter(
      (field) => !(activeFields as readonly string[]).includes(field)
    );
    if (inactiveFields.length) {
      form.clearErrors(inactiveFields as Path<SubmissionForm>[]);
    }
    if (firstField) {
      requestAnimationFrame(() => {
        form.setFocus(firstField as Path<SubmissionForm>);
      });
    }
  }, [form, stepKey]);

  useEffect(() => {
    const hasErrors =
      Object.keys(form.formState.errors).length > 0 ||
      form.formState.isSubmitted;
    if (!hasErrors) return;
    form.trigger(undefined, { shouldFocus: false });
  }, [form, language]);

  const validateCurrentStep = useCallback(async () => {
    const ok = await form.trigger(currentFields as any, { shouldFocus: true });
    if (!ok) {
      markStepFieldsTouched(currentFields);
      return false;
    }
    try {
      const values = form.getValues();
      if (stepKey === "personal") await personalInfoSchema.parseAsync(values);
      if (stepKey === "financial")
        await familyFinancialSchema.parseAsync(values);
      if (stepKey === "situation")
        await situationDescriptionSchema.parseAsync(values);
      return true;
    } catch {
      return false;
    }
  }, [currentFields, form, markStepFieldsTouched, stepKey]);

  const nextStep = useCallback(async () => {
    const ok = await validateCurrentStep();
    if (ok && !isLastStep) {
      onNext();
    } else if (!ok) {
      await form.trigger(undefined, { shouldFocus: true });
    }
  }, [form, isLastStep, onNext, validateCurrentStep]);

  const handleFinalClick = useCallback(
    () =>
      form.handleSubmit(async (data) => {
        if (!isLastStep) {
          await nextStep();
          return;
        }
        const ok = await form.trigger(undefined, { shouldFocus: true });
        if (!ok) return;

        await Promise.resolve(onSubmit(data));
        clearDraft(draftKey);

        onSubmitSuccess?.();

        if (mode === "create" && onRedirectToSubmissions) {
          onRedirectToSubmissions();
        }
      })(),
    [
      draftKey,
      form,
      isLastStep,
      mode,
      nextStep,
      onRedirectToSubmissions,
      onSubmit,
      onSubmitSuccess,
    ]
  );

  return { form, isLastStep, nextStep, handleFinalClick };
};
