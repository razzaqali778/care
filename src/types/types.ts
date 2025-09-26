import type { ChatRole, SupportedLang } from "@/constants";
import type { UiField } from "@/constants";
import type { AssistFieldKey } from "@/constants";
import { UseFormReturn } from "react-hook-form";

export type ApplicationState = {
  personal: {
    name: string;
    nationalId: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  };
  family: {
    maritalStatus: string;
    dependents: number;
    employmentStatus: string;
    monthlyIncome: number;
    housingStatus: string;
  };
  situation: Record<AssistFieldKey, string>;
};

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

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

export type UiLang = SupportedLang;
export type { UiField };

export type SubmissionForm = {
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
};

export type Submission = SubmissionForm & {
  id: string;
  submittedAt: string;
  updatedAt?: string;
};

export type SubmissionRow = {
  id: string;
  idTail: string;
  name: string;
  nationalId: string;
  email: string;
  reasonShort: string;
  submittedAtFmt: string;
};

export type SubmissionFormAlias = SubmissionForm;
export type SubmissionAlias = Submission;
export type SubmissionRowAlias = SubmissionRow;
export type FormDataAlias = FormData;

export type LanguageContextValue = {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  t: (key: string) => string;
};
export interface FamilyFinancialStepProps {
  form: UseFormReturn<SubmissionForm>;
}

export type Lang = string;
