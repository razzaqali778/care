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
  successStayOnPage: "success.stayOnPage",
  successTakingYou: "success.takingYouToSubmissions",
} as const;

export const I18N_FALLBACKS = {
  notFoundTitle: "Not found",
  notFoundDesc: "The submission you tried to edit does not exist.",
  successSubmittedTitle: "Application submitted",
  successUpdatedTitle: "Application updated",
  successRedirecting: "Taking you to your submissions...",
  successStayOnPage: "Your changes have been saved.",
  successTakingYou: "Taking you to your submissions...",
} as const;
