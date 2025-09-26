export const STEPS = ["personal", "financial", "situation"] as const;
export type StepKey = (typeof STEPS)[number];
