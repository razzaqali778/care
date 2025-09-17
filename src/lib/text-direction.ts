import { UiField, UiLang } from "@/types/types";

const FORCE_LTR = new Set<UiField>([
  "email",
  "phone",
  "nationalId",
  "dateOfBirth",
]);

export function fieldTextProps(language: UiLang, field: UiField) {
  const rtl = language === "ar";
  const forceLtr = FORCE_LTR.has(field);
  const dir: "ltr" | "rtl" = forceLtr ? "ltr" : rtl ? "rtl" : "ltr";
  const langAttr: "en" | "ar" = forceLtr ? "en" : rtl ? "ar" : "en";

  const className = dir === "rtl" ? "text-right" : "text-left";
  return { dir, lang: langAttr, className };
}
