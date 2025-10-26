import type { StepKey } from "@/constants/application";
import type { SubmissionForm } from "@/types/Types";

export type ApplicationMode = "create" | "edit";

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
  mode?: ApplicationMode;
  onRedirectToSubmissions?: () => void;
  onSubmitSuccess?: () => void;
}

export interface StepIndicatorProps {
  totalSteps: number;
  currentStepIndex: number;
}

export interface StepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isRTL: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  labels: StepNavigationLabels;
}

export interface StepNavigationLabels {
  back: string;
  next: string;
  submit: string;
}
