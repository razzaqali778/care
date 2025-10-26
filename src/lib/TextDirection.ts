import { UiField, UiLang } from "@/types/Types";
import { AR, EN, DIR_LTR, DIR_RTL, type TextDirection } from "@/constants/lang";

const FORCE_LTR = new Set<UiField>([
  "email",
  "phone",
  "nationalId",
  "dateOfBirth",
]);

export function fieldTextProps(language: UiLang, field: UiField) {
  const rtl = language === AR;
  const forceLtr = FORCE_LTR.has(field);
  const dir: TextDirection = forceLtr ? DIR_LTR : rtl ? DIR_RTL : DIR_LTR;
  const langAttr: UiLang = forceLtr ? EN : rtl ? AR : EN;

  const className = dir === DIR_RTL ? "text-right" : "text-left";
  return { dir, lang: langAttr, className };
}
