import type { Submission } from "@/types/types";

export function toDateInput(v?: string) {
  if (!v) return "";
  const d = v.includes("T") ? v.slice(0, 10) : v;
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
}

export function normalizeInitialValues(r: Submission | undefined) {
  if (!r) return undefined;
  const { id: _id, submittedAt: _sa, updatedAt: _ua, ...rest } = r as any;
  return {
    name: rest.name ?? "",
    nationalId: rest.nationalId ?? "",
    dateOfBirth: toDateInput(rest.dateOfBirth),
    gender: rest.gender ?? "",
    address: rest.address ?? "",
    city: rest.city ?? "",
    state: rest.state ?? "",
    country: rest.country ?? "",
    phone: rest.phone ?? "",
    email: rest.email ?? "",
    maritalStatus: rest.maritalStatus ?? "",
    dependents: String(rest.dependents ?? ""),
    employmentStatus: rest.employmentStatus ?? "",
    monthlyIncome: String(rest.monthlyIncome ?? ""),
    housingStatus: rest.housingStatus ?? "",
    financialSituation: rest.financialSituation ?? "",
    employmentCircumstance: rest.employmentCircumstance ?? "",
    reasonForApplying: rest.reasonForApplying ?? "",
  };
}
