import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export interface FormData {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
  financialSituation: string;
  employmentCircumstance: string;
  reasonForApplying: string;
}

interface ApplicationFormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: Partial<FormData>;
}

export function ApplicationForm({
  onSubmit,
  initialValues,
}: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useLanguage();

  const form = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      name: "",
      nationalId: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
      maritalStatus: "",
      dependents: "",
      employmentStatus: "",
      monthlyIncome: "",
      housingStatus: "",
      financialSituation: "",
      employmentCircumstance: "",
      reasonForApplying: "",
    },
    mode: "onChange",
  });

  // Prefill when editing
  useEffect(() => {
    if (!initialValues) return;
    form.reset({
      name: "",
      nationalId: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
      maritalStatus: "",
      dependents: "",
      employmentStatus: "",
      monthlyIncome: "",
      housingStatus: "",
      financialSituation: "",
      employmentCircumstance: "",
      reasonForApplying: "",
      ...initialValues,
    });
  }, [initialValues, form]);

  const validateCurrentStep = async () => {
    const values = form.getValues();
    try {
      if (currentStep === 1) {
        await personalInfoSchema.parseAsync(values);
        return true;
      }
      if (currentStep === 2) {
        await familyFinancialSchema.parseAsync(values);
        return true;
      }
      if (currentStep === 3) {
        await situationDescriptionSchema.parseAsync(values);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const nextStep = async () => {
    const ok = await validateCurrentStep();
    if (ok && currentStep < 3) setCurrentStep((s) => s + 1);
    else await form.trigger();
  };

  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (data: FormData) => {
    const ok = await form.trigger();
    if (ok) onSubmit(data);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <FamilyFinancialStep form={form} />;
      case 3:
        return <SituationDescriptionStep form={form} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t("app.step1.title");
      case 2:
        return t("app.step2.title");
      case 3:
        return t("app.step3.title");
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4 px-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 text-sm sm:text-base ${
                step <= currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center text-foreground px-4">
                {getStepTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {renderStep()}

              <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 gap-3 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t("app.back")}
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 w-full sm:w-auto"
                  >
                    {t("app.next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-primary w-full sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    {t("app.submit")}
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
