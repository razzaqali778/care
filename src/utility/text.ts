import type { ApiLang } from "@/constants/lang";
import { AR } from "@/constants/lang";

export function isArabicText(s: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(s);
}

export function needsTranslation(text: string, target: ApiLang): boolean {
  if (!text || text.trim().length < 2) return false;
  const hasAr = isArabicText(text);
  return target === AR ? !hasAr : hasAr;
}
