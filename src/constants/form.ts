import type { SubmissionForm } from "@/types/Types";
import type { StepKey } from "@/constants/steps";

export const FORM_DEFAULTS: SubmissionForm = {
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
} as const;

export const FIELDS_BY_STEP: Record<StepKey, (keyof SubmissionForm)[]> = {
  personal: [
    "name",
    "nationalId",
    "dateOfBirth",
    "gender",
    "address",
    "city",
    "state",
    "country",
    "phone",
    "email",
  ],
  financial: [
    "maritalStatus",
    "dependents",
    "employmentStatus",
    "monthlyIncome",
    "housingStatus",
  ],
  situation: [
    "financialSituation",
    "employmentCircumstance",
    "reasonForApplying",
  ],
} as const;

export const TITLE_KEYS: Record<StepKey, string> = {
  personal: "app.step1.title",
  financial: "app.step2.title",
  situation: "app.step3.title",
} as const;
