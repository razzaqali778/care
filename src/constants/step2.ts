export const STEP2_MARITAL_STATUS = [
  { value: "single", labelKey: "step2.maritalStatus.single" },
  { value: "married", labelKey: "step2.maritalStatus.married" },
  { value: "divorced", labelKey: "step2.maritalStatus.divorced" },
  { value: "widowed", labelKey: "step2.maritalStatus.widowed" },
  { value: "separated", labelKey: "step2.maritalStatus.separated" },
] as const;
export type MaritalStatusValue = (typeof STEP2_MARITAL_STATUS)[number]["value"];

export const STEP2_EMPLOYMENT_STATUS = [
  {
    value: "employed-full-time",
    labelKey: "step2.employmentStatus.employedFull",
  },
  {
    value: "employed-part-time",
    labelKey: "step2.employmentStatus.employedPart",
  },
  { value: "self-employed", labelKey: "step2.employmentStatus.selfEmployed" },
  { value: "unemployed", labelKey: "step2.employmentStatus.unemployed" },
  { value: "retired", labelKey: "step2.employmentStatus.retired" },
  { value: "student", labelKey: "step2.employmentStatus.student" },
  { value: "disabled", labelKey: "step2.employmentStatus.disabled" },
  { value: "other", labelKey: "step2.employmentStatus.other" },
] as const;
export type EmploymentStatusValue =
  (typeof STEP2_EMPLOYMENT_STATUS)[number]["value"];

export const STEP2_HOUSING_STATUS = [
  { value: "own-home", labelKey: "step2.housingStatus.ownHome" },
  { value: "rent", labelKey: "step2.housingStatus.rent" },
  {
    value: "living-with-family",
    labelKey: "step2.housingStatus.livingWithFamily",
  },
  {
    value: "temporary-housing",
    labelKey: "step2.housingStatus.temporaryHousing",
  },
  { value: "homeless", labelKey: "step2.housingStatus.homeless" },
  { value: "other", labelKey: "step2.housingStatus.other" },
] as const;

export type HousingStatusValue = (typeof STEP2_HOUSING_STATUS)[number]["value"];
