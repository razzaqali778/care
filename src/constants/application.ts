export const STEPS = ["personal", "financial", "situation"] as const;
export type StepKey = (typeof STEPS)[number];

export const isStep = (s?: string): s is StepKey =>
  !!s && (STEPS as readonly string[]).includes(s);

export const DRAFT_PREFIX = "draft:" as const;

export const routes = {
  application: (id: string | "new", step: StepKey) =>
    `/application/${id}/${step}`,
  submissions: "/submissions",
} as const;

export const I18N_KEYS = {
  notFoundTitle: "error.notFound.title",
  notFoundDesc: "error.notFound.description",
  successSubmittedTitle: "success.applicationSubmitted",
  successUpdatedTitle: "success.applicationUpdated",
  successRedirecting: "success.redirecting",
} as const;
