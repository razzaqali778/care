export const UI_FIELDS = [
  "name",
  "nationalId",
  "address",
  "city",
  "state",
  "country",
  "phone",
  "email",
  "dateOfBirth",
  "financialSituation",
  "employmentCircumstance",
  "reasonForApplying",
] as const;

export type UiField = (typeof UI_FIELDS)[number];
