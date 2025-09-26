// src/components/ApplicationForm.tsx
import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useLanguage } from "@/contexts/language-context";
import { PersonalInfoStep } from "@/components/steps/personal-info-step";
import { FamilyFinancialStep } from "@/components/steps/family-financial-step";
import { SituationDescriptionStep } from "@/components/steps/situation-description-step";
import {
  personalInfoSchema,
  familyFinancialSchema,
  situationDescriptionSchema,
  fullFormSchema,
} from "@/lib/validations";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import type { SubmissionForm } from "@/types/types";
import { useDraft, clearDraft } from "@/hooks/useDraft";
import { localizedZodResolver } from "@/lib/localizedZodResolver";
import type { StepKey } from "@/constants/steps";
import { FORM_DEFAULTS, FIELDS_BY_STEP, TITLE_KEYS } from "@/constants/form";
import { isRTL as isRTLLang } from "@/constants/lang";
import { toast } from "@/components/ui/use-toast"; // shadcn toast

export interface ApplicationFormProps {
  onSubmit: (data: SubmissionForm) => Promise<void> | void;
  initialValues?: Partial<SubmissionForm>;
  draftKey: string;
  stepKey: StepKey;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToIndex: (idx: number) => void;
  /** new: drives post-submit behavior */
  mode?: "create" | "edit";
  /** optional: redirect handler for create mode */
  onRedirectToSubmissions?: () => void;
}

export function ApplicationForm({
  onSubmit,
  initialValues,
  draftKey,
  stepKey,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  mode = "create",
  onRedirectToSubmissions,
}: ApplicationFormProps) {
  const { t, language } = useLanguage();
  const resolver = useMemo(() => localizedZodResolver(fullFormSchema, t), [t]);
  const isRTL = isRTLLang(language);

  const form = useForm<SubmissionForm>({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: FORM_DEFAULTS,
  });

  useDraft(form, draftKey, initialValues);

  const currentFields = useMemo(() => FIELDS_BY_STEP[stepKey], [stepKey]);

  const validateCurrentStep = useCallback(async () => {
    const ok = await form.trigger(currentFields as any, { shouldFocus: true });
    if (!ok) return false;
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
  }, [currentFields, form, stepKey]);

  const nextStep = useCallback(async () => {
    const ok = await validateCurrentStep();
    if (ok && stepIndex < totalSteps - 1) onNext();
    else if (!ok) await form.trigger(undefined, { shouldFocus: true });
  }, [validateCurrentStep, stepIndex, totalSteps, onNext, form]);

  // IMPORTANT: click-driven submit; prevent native submit.
  const handleFinalClick = useCallback(
    () =>
      form.handleSubmit(async (data) => {
        if (stepIndex < totalSteps - 1) {
          await nextStep();
          return;
        }
        const ok = await form.trigger(undefined, { shouldFocus: true });
        if (!ok) return;

        await Promise.resolve(onSubmit(data));
        clearDraft(draftKey);

        // Show localized toast. Fallback if key missing.
        const title =
          t(
            mode === "edit"
              ? "success.applicationUpdated"
              : "success.applicationCreated"
          ) ||
          (mode === "edit" ? "Application updated" : "Application submitted");
        const description =
          t(
            mode === "edit"
              ? "success.stayOnPage"
              : "success.takingYouToSubmissions"
          ) ||
          (mode === "edit"
            ? "Your changes have been saved."
            : "Taking you to your submissions...");

        toast({ title, description });

        // Only redirect on create.
        if (mode === "create" && onRedirectToSubmissions) {
          onRedirectToSubmissions();
        }
      })(),
    [
      draftKey,
      form,
      mode,
      nextStep,
      onSubmit,
      onRedirectToSubmissions,
      stepIndex,
      t,
    ]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4 px-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 text-sm sm:text-base ${
                i <= stepIndex
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        {/* Kill native submit; use explicit clicks only */}
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center text-foreground px-4">
                {t(TITLE_KEYS[stepKey])}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {stepKey === "personal" && <PersonalInfoStep form={form} />}
              {stepKey === "financial" && <FamilyFinancialStep form={form} />}
              {stepKey === "situation" && (
                <SituationDescriptionStep form={form} />
              )}

              <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 gap-3 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrev}
                  disabled={stepIndex === 0}
                  className={`flex items-center gap-2 w-full sm:w-auto ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  {isRTL ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                  <span>{t("app.back")}</span>
                </Button>

                {stepIndex < totalSteps - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className={`flex items-center gap-2 w-full sm:w-auto ${
                      isRTL ? "flex-row-reversed" : ""
                    }`}
                  >
                    <span>{t("app.next")}</span>
                    {isRTL ? (
                      <ChevronLeft className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinalClick}
                    className={`flex items-center gap-2 bg-gradient-primary w-full sm:w-auto ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Send
                      className="h-4 w-4"
                      style={isRTL ? { transform: "scaleX(-1)" } : undefined}
                      aria-hidden
                    />
                    <span>{t("app.submit")}</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
