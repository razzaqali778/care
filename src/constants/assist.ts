export const ASSIST_FIELD_KEYS = [
  "currentFinancialSituation",
  "employmentCircumstances",
  "reasonForApplying",
] as const;

export type AssistFieldKey = (typeof ASSIST_FIELD_KEYS)[number];

const ASSIST_SET: ReadonlySet<string> = new Set(ASSIST_FIELD_KEYS);
export function isAssistFieldKey(x: unknown): x is AssistFieldKey {
  return typeof x === "string" && ASSIST_SET.has(x);
}

export const ASSIST_FIELD_ORDER: readonly AssistFieldKey[] = ASSIST_FIELD_KEYS;

export const ASSIST_TARGET_FIELDS = [
  "financialSituation",
  "employmentCircumstance",
  "reasonForApplying",
] as const;
export type AssistTargetField = (typeof ASSIST_TARGET_FIELDS)[number];

export const ASSIST_LABEL_KEYS = {
  help: { key: "assist.help", fb: "Help me write" },
  generating: { key: "assist.generating", fb: "Generating…" },
  insert: { key: "assist.insert", fb: "Insert" },
  edit: { key: "assist.edit", fb: "Edit" },
  done: { key: "assist.done", fb: "Done" },
  discard: { key: "assist.discard", fb: "Discard" },
  regenerate: { key: "assist.regenerate", fb: "Regenerate" },
  suggestion: { key: "assist.suggestion", fb: "Suggestion" },
  error: { key: "assist.error", fb: "Could not generate a suggestion." },
} as const;

export function makeAssistLabels(t: (k: string) => string) {
  const pick = (k: keyof typeof ASSIST_LABEL_KEYS) => {
    const { key, fb } = ASSIST_LABEL_KEYS[k];
    const v = t(key);
    return v && !v.startsWith("[") ? v : fb;
  };
  return {
    help: pick("help"),
    generating: pick("generating"),
    insert: pick("insert"),
    edit: pick("edit"),
    done: pick("done"),
    discard: pick("discard"),
    regenerate: pick("regenerate"),
    suggestion: pick("suggestion"),
    error: pick("error"),
  };
}

export const ASSIST_FIELD_MAP: Record<AssistFieldKey, AssistTargetField> = {
  currentFinancialSituation: "financialSituation",
  employmentCircumstances: "employmentCircumstance",
  reasonForApplying: "reasonForApplying",
} as const;

export const ASSIST_FIELD_LABELS: Record<
  AssistFieldKey,
  { en: string; ar: string }
> = {
  currentFinancialSituation: {
    en: "Current Financial Situation",
    ar: "الوضع المالي الحالي",
  },
  employmentCircumstances: {
    en: "Employment Circumstances",
    ar: "الظروف الوظيفية",
  },
  reasonForApplying: { en: "Reason for Applying", ar: "سبب التقديم" },
};
