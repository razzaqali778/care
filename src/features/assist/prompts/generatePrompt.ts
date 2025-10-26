import type { GeneratePromptParams } from "../types";
import { fieldLabel } from "./fieldLabel";

export const buildGeneratePrompt = ({
  fieldKey,
  application,
  language,
}: GeneratePromptParams): string => {
  const dependents = application.family?.dependents ?? 0;
  const income = application.family?.monthlyIncome ?? 0;
  const name = application.personal?.name ?? "";
  const label = fieldLabel(fieldKey, language);

  if (language === "ar") {
    return [
      `اكتب فقرة موجزة لحقل "${label}" بأسلوب محترم وواضح.`,
      `عدد المعالين: ${dependents}. الدخل الشهري: ${income}.${name ? ` الاسم: ${name}.` : ""}`,
      "الحد الأقصى 150 كلمة. استخدم نصًا عاديًا فقط.",
      "أجب باللغة العربية فقط.",
    ].join("\n");
  }

  return [
    `Draft a concise paragraph for "${label}" in a respectful, plain tone.`,
    `Dependents: ${dependents}. Monthly income: ${income}.${name ? ` Name: ${name}.` : ""}`,
    "Limit to 150 words. Plain text only.",
    "Respond in English only.",
  ].join("\n");
};
