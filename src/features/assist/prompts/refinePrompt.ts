import type { RefinePromptParams } from "../types";
import { fieldLabel } from "./fieldLabel";

export const buildRefinePrompt = ({
  fieldKey,
  application,
  language,
  sourceText,
}: RefinePromptParams): string => {
  const label = fieldLabel(fieldKey, language) || String(fieldKey);

  if (language === "ar") {
    return [
      `حسّن وصغ النص التالي لحقل "${label}" مع الحفاظ على الحقائق.`,
      "استخدم فقرة أو فقرتين قصيرتين (بحد أقصى 150 كلمة). نص عربي واضح فقط.",
      "أعد الإجابة باللغة العربية فقط.",
      "النص:",
      sourceText,
    ].join("\n");
  }

  return [
    `Improve and tighten the following for "${label}" while preserving facts.`,
    "Return 1-2 short paragraphs (≤150 words). Plain text only.",
    "Respond in English only.",
    "Text:",
    sourceText,
  ].join("\n");
};
