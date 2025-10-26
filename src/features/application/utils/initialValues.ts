import type { Submission } from "@/types/Types";

export const toDateInput = (value?: string) => {
  if (!value) return "";
  const normalized = value.includes("T") ? value.slice(0, 10) : value;
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : "";
};

export const normalizeInitialValues = (record?: Submission) => {
  if (!record) return undefined;
  const { id: _id, submittedAt: _submittedAt, updatedAt: _updatedAt, ...rest } =
    record as Record<string, unknown>;

  return {
    name: (rest.name as string) ?? "",
    nationalId: (rest.nationalId as string) ?? "",
    dateOfBirth: toDateInput(rest.dateOfBirth as string | undefined),
    gender: (rest.gender as string) ?? "",
    address: (rest.address as string) ?? "",
    city: (rest.city as string) ?? "",
    state: (rest.state as string) ?? "",
    country: (rest.country as string) ?? "",
    phone: (rest.phone as string) ?? "",
    email: (rest.email as string) ?? "",
    maritalStatus: (rest.maritalStatus as string) ?? "",
    dependents: String(rest.dependents ?? ""),
    employmentStatus: (rest.employmentStatus as string) ?? "",
    monthlyIncome: String(rest.monthlyIncome ?? ""),
    housingStatus: (rest.housingStatus as string) ?? "",
    financialSituation: (rest.financialSituation as string) ?? "",
    employmentCircumstance: (rest.employmentCircumstance as string) ?? "",
    reasonForApplying: (rest.reasonForApplying as string) ?? "",
  };
};
