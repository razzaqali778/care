export const STORAGE_KEYS = {
  submissions: "submissions",
} as const;

export const API_OPERATION_DELAYS = {
  list: 150,
  get: 120,
  create: 200,
  update: 200,
  remove: 120,
} as const;

export type SubmissionApiOperation = keyof typeof API_OPERATION_DELAYS;
