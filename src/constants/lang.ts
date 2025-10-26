export const SUPPORTED_LANGS = ["en", "ar"] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const EN: SupportedLang = "en";
export const AR: SupportedLang = "ar";

export const DIR_LTR = "ltr" as const;
export const DIR_RTL = "rtl" as const;
export type TextDirection = typeof DIR_LTR | typeof DIR_RTL;

export const LANG_DIR: Record<SupportedLang, TextDirection> = {
  en: DIR_LTR,
  ar: DIR_RTL,
};

const SUPPORTED_SET: ReadonlySet<string> = new Set(SUPPORTED_LANGS);

export function isSupportedLang(x: unknown): x is SupportedLang {
  return typeof x === "string" && SUPPORTED_SET.has(x);
}

export function parseSupportedLang(
  x: unknown,
  options?: { defaultLang?: SupportedLang }
): SupportedLang {
  const def = options?.defaultLang ?? EN;
  return isSupportedLang(x) ? x : def;
}

export function applyHtmlLangDir(doc: Document, lang: SupportedLang): void {
  doc.documentElement.setAttribute("lang", lang);
  doc.documentElement.setAttribute("dir", LANG_DIR[lang]);
}
export const RTL_LANGS: ReadonlySet<SupportedLang> = new Set([AR]);

export function isRTL(lang: SupportedLang): boolean {
  return RTL_LANGS.has(lang);
}
export type ApiLang = SupportedLang;
export function toApiLang(lang: SupportedLang): ApiLang {
  return lang;
}
