import { describe, expect, it } from "vitest";
import { normalizeInitialValues, toDateInput } from "./initialValues";
import type { Submission } from "@/types/Types";

describe("toDateInput", () => {
  it("returns an empty string when value is missing", () => {
    expect(toDateInput()).toBe("");
  });

  it("trims time segments from ISO strings", () => {
    expect(toDateInput("2024-07-15T10:30:00Z")).toBe("2024-07-15");
  });

  it("rejects malformed values", () => {
    expect(toDateInput("15/07/2024")).toBe("");
  });
});

describe("normalizeInitialValues", () => {
  const submission: Submission = {
    id: "abc",
    submittedAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
    name: "Jane Doe",
    nationalId: "123",
    dateOfBirth: "2024-07-15T10:30:00Z",
    gender: "female",
    address: "123 Main St",
    city: "Riyadh",
    state: "Riyadh",
    country: "SA",
    phone: "+9660",
    email: "jane@example.com",
    maritalStatus: "single",
    dependents: "2",
    employmentStatus: "employed",
    monthlyIncome: "5000",
    housingStatus: "rent",
    financialSituation: "Needs help",
    employmentCircumstance: "Contract",
    reasonForApplying: "Medical",
  };

  it("returns undefined when record is missing", () => {
    expect(normalizeInitialValues(undefined)).toBeUndefined();
  });

  it("normalizes submission values and removes metadata fields", () => {
    const normalized = normalizeInitialValues(submission);
    expect(normalized).toMatchObject({
      name: "Jane Doe",
      nationalId: "123",
      dateOfBirth: "2024-07-15",
      gender: "female",
      address: "123 Main St",
      city: "Riyadh",
      state: "Riyadh",
      country: "SA",
      phone: "+9660",
      email: "jane@example.com",
      maritalStatus: "single",
      dependents: "2",
      employmentStatus: "employed",
      monthlyIncome: "5000",
      housingStatus: "rent",
      financialSituation: "Needs help",
      employmentCircumstance: "Contract",
      reasonForApplying: "Medical",
    });
  });

  it("falls back to empty strings when optional values are missing", () => {
    const { name, gender, reasonForApplying } = normalizeInitialValues({
      ...submission,
      name: undefined as unknown as string,
      gender: undefined as unknown as string,
      reasonForApplying: undefined as unknown as string,
    })!;

    expect(name).toBe("");
    expect(gender).toBe("");
    expect(reasonForApplying).toBe("");
  });
});
