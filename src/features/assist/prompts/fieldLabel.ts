import { ASSIST_FIELD_LABELS, type AssistFieldKey } from "@/constants/assist";
import type { PromptLanguage } from "../types";

export const fieldLabel = (
  key: AssistFieldKey,
  lang: PromptLanguage
): string => {
  const labels = ASSIST_FIELD_LABELS[key];
  return lang === "ar" ? labels.ar : labels.en;
};
