import { ApplicationState } from "@/types/Types";
import { AssistFieldKey } from "./assist";

export const STEP3_FIELDS = [
  "financialSituation",
  "employmentCircumstance",
  "reasonForApplying",
] as const;

export type Step3Field = (typeof STEP3_FIELDS)[number];

export const STEP3_COPY: Record<
  Step3Field,
  {
    labelKey: string;
    placeholderKey: string;
    assistKey: AssistFieldKey;
    inputId: string;
  }
> = {
  financialSituation: {
    labelKey: "step3.financialSituation.label",
    placeholderKey: "step3.financialSituation.placeholder",
    assistKey: "currentFinancialSituation",
    inputId: "financialSituation",
  },
  employmentCircumstance: {
    labelKey: "step3.employmentCircumstance.label",
    placeholderKey: "step3.employmentCircumstance.placeholder",
    assistKey: "employmentCircumstances",
    inputId: "employmentCircumstance",
  },
  reasonForApplying: {
    labelKey: "step3.reasonForApplying.label",
    placeholderKey: "step3.reasonForApplying.placeholder",
    assistKey: "reasonForApplying",
    inputId: "reasonForApplying",
  },
} as const;

export const STEP3_PAIRS: Array<
  [Step3Field, keyof ApplicationState["situation"]]
> = [
  ["financialSituation", "currentFinancialSituation"],
  ["employmentCircumstance", "employmentCircumstances"],
  ["reasonForApplying", "reasonForApplying"],
] as const;

export type Step3Touched = Record<Step3Field, boolean>;

export const makeInitialTouched = (): Step3Touched => ({
  financialSituation: false,
  employmentCircumstance: false,
  reasonForApplying: false,
});
