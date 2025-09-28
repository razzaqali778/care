import type { ApplicationState, Lang } from "@/types/Types";
import { ASSIST_FIELD_LABELS, AssistFieldKey } from "@/constants/assist";

export function fieldLabel(key: AssistFieldKey, lang: Lang): string {
  const m = ASSIST_FIELD_LABELS[key];
  return lang === "ar" ? m.ar : m.en;
}

export function buildGeneratePrompt(p: {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
}): string {
  const deps = p.application.family?.dependents ?? 0;
  const income = p.application.family?.monthlyIncome ?? 0;
  const name = p.application.personal?.name ?? "";
  if (p.language === "ar") {
    return [
      `اكتب فقرة مختصرة لـ "${fieldLabel(
        p.fieldKey,
        "ar"
      )}" بنبرة محترمة ومباشرة.`,
      `عدد المعالين: ${deps}. الدخل الشهري: ${income}. ${
        name ? `الاسم: ${name}.` : ""
      }`,
      `الحد: 150 كلمة. نص عادي فقط.`,
      `أعد الإجابة بالعربية فقط.`,
    ].join("\n");
  }
  return [
    `Draft a concise paragraph for "${fieldLabel(
      p.fieldKey,
      "en"
    )}" in a respectful, plain tone.`,
    `Dependents: ${deps}. Monthly income: ${income}. ${
      name ? `Name: ${name}.` : ""
    }`,
    `Limit: 150 words. Plain text only.`,
    `Respond in English only.`,
  ].join("\n");
}

export interface BuildRefinePromptParams {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
  sourceText: string;
}

export function buildRefinePrompt(p: BuildRefinePromptParams): string {
  const label = fieldLabel(p.fieldKey, p.language) || String(p.fieldKey);

  if (p.language === "ar") {
    return [
      `حسّن/لخّص النص التالي لـ "${label}" باختصار ووضوح مع الحفاظ على الحقائق.`,
      `فقرة أو فقرتان (حتى 150 كلمة). نص عادي فقط.`,
      `أعد النتيجة بالعربية فقط.`,
      `— النص —`,
      p.sourceText,
    ].join("\n");
  }

  return [
    `Improve/condense the following for "${label}" while preserving facts.`,
    `1–2 short paragraphs (≤150 words). Plain text only.`,
    `Return in English only.`,
    `— text —`,
    p.sourceText,
  ].join("\n");
}

export function systemPrompt(lang: Lang): string {
  return lang === "ar"
    ? "أنت مساعد موجز يعيد الصياغة بوضوح ويحافظ على الحقائق."
    : "You are a concise assistant that rewrites and summarizes clearly while preserving facts.";
}

export function systemTranslatePrompt(target: "en" | "ar"): string {
  return target === "ar"
    ? "أنت مترجم دقيق. ترجم النص إلى العربية فقط دون شرح."
    : "You are a precise translator. Translate the text into English only with no explanations.";
}

export function userTranslatePrompt(text: string, target: "en" | "ar"): string {
  return target === "ar"
    ? `ترجم إلى العربية فقط:\n— النص —\n${text}`
    : `Translate to English only:\n— text —\n${text}`;
}
