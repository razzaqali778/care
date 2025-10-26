import type {
  SystemTranslateParams,
  UserTranslateParams,
  PromptLanguage,
} from "../types";

export const systemPrompt = (lang: PromptLanguage): string =>
  lang === "ar"
    ? "أنت مساعد مختصر يعيد الصياغة بوضوح ويحافظ على الحقائق."
    : "You are a concise assistant that rewrites clearly while preserving facts.";

export const systemTranslatePrompt = ({
  target,
}: SystemTranslateParams): string =>
  target === "ar"
    ? "أنت مترجم دقيق. ترجم النص التالي إلى العربية فقط من دون شروحات."
    : "You are a precise translator. Translate into English only with no explanations.";

export const userTranslatePrompt = ({
  text,
  target,
}: UserTranslateParams): string =>
  target === "ar"
    ? `ترجم إلى العربية فقط:\nالنص:\n${text}`
    : `Translate to English only:\nText:\n${text}`;
