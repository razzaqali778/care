export type Lang = "en" | "ar";

export type AssistFieldKey =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

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
  situation: {
    currentFinancialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
  };
};
export type ChatMessage = {
  role: "system" | "user" | "assistant";
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

export interface Submission {
  id: string;
  name: string;
  nationalId: string;
  email: string;
  reasonForApplying: string;
  submittedAt: string;
}

export type UiLang = "en" | "ar";
export type UiField =
  | "name"
  | "nationalId"
  | "address"
  | "city"
  | "state"
  | "country"
  | "phone"
  | "email"
  | "dateOfBirth"
  | "financialSituation"
  | "employmentCircumstance"
  | "reasonForApplying";
