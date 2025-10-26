import type { SubmissionForm } from "@/types/Types";

export const FORM_FIELDS: { [K in keyof SubmissionForm]: K } = {
  name: "name",
  nationalId: "nationalId",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  address: "address",
  city: "city",
  state: "state",
  country: "country",
  phone: "phone",
  email: "email",
  maritalStatus: "maritalStatus",
  dependents: "dependents",
  employmentStatus: "employmentStatus",
  monthlyIncome: "monthlyIncome",
  housingStatus: "housingStatus",
  financialSituation: "financialSituation",
  employmentCircumstance: "employmentCircumstance",
  reasonForApplying: "reasonForApplying",
};

export type FormFieldName = keyof typeof FORM_FIELDS;
