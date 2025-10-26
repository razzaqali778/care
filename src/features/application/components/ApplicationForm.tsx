import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PersonalInfoStep } from "@/components/steps/PersonalInfoStep";
import { FamilyFinancialStep } from "@/components/steps/FamilyFinancialStep";
import { SituationDescriptionStep } from "@/components/steps/SituationDescriptionStep";
import { TITLE_KEYS } from "@/constants/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { isRTL as isRTLLang } from "@/constants/lang";
import { StepIndicator } from "./StepIndicator";
import { StepNavigation } from "./StepNavigation";
import { useApplicationStepper } from "../hooks/useApplicationStepper";
import type { ApplicationFormProps } from "../types";
import { STEP_NAV_LABEL_KEYS } from "../constants/labels";
export type { ApplicationFormProps } from "../types";

export const ApplicationForm = ({
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
  onSubmitSuccess,
}: ApplicationFormProps) => {
  const { t, language } = useLanguage();
  const isRTL = isRTLLang(language);

  const { form, isLastStep, nextStep, handleFinalClick } =
    useApplicationStepper({
      draftKey,
      initialValues,
      stepKey,
      stepIndex,
      totalSteps,
      onNext,
      onSubmit,
      mode,
      onRedirectToSubmissions,
      onSubmitSuccess,
      t,
      language,
    });

  const labels = useMemo(
    () => ({
      back: t(STEP_NAV_LABEL_KEYS.back),
      next: t(STEP_NAV_LABEL_KEYS.next),
      submit: t(STEP_NAV_LABEL_KEYS.submit),
    }),
    [t, language]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator totalSteps={totalSteps} currentStepIndex={stepIndex} />

      <Form {...form}>
        <form onSubmit={(event) => event.preventDefault()} noValidate>
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

              <StepNavigation
                isFirstStep={stepIndex === 0}
                isLastStep={isLastStep}
                isRTL={isRTL}
                onPrev={onPrev}
                onNext={nextStep}
                onSubmit={handleFinalClick}
                labels={labels}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
