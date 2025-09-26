import type { ApplicationState } from "@/types/types";

export type Step3Form = {
  financialSituation: string;
  employmentCircumstance: string;
  reasonForApplying: string;
  name?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  maritalStatus?: string;
  dependents?: string | number;
  employmentStatus?: string;
  monthlyIncome?: string | number;
  housingStatus?: string;
};

export function toApplicationState(v: Step3Form): ApplicationState {
  return {
    personal: {
      name: v.name || "",
      nationalId: v.nationalId || "",
      dob: v.dateOfBirth || "",
      gender: v.gender || "",
      address: v.address || "",
      city: v.city || "",
      state: v.state || "",
      country: v.country || "",
      phone: v.phone || "",
      email: v.email || "",
    },
    family: {
      maritalStatus: v.maritalStatus || "",
      dependents: Number(v.dependents ?? 0) || 0,
      employmentStatus: v.employmentStatus || "",
      monthlyIncome: Number(v.monthlyIncome ?? 0) || 0,
      housingStatus: v.housingStatus || "",
    },
    situation: {
      currentFinancialSituation: v.financialSituation || "",
      employmentCircumstances: v.employmentCircumstance || "",
      reasonForApplying: v.reasonForApplying || "",
    },
  };
}
