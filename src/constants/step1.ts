export const STEP1_GENDER_OPTIONS = [
  { value: "male", labelKey: "step1.gender.male" },
  { value: "female", labelKey: "step1.gender.female" },
  { value: "other", labelKey: "step1.gender.other" },
] as const;

export type GenderValue = (typeof STEP1_GENDER_OPTIONS)[number]["value"];
