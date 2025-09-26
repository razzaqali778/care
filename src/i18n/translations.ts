import en from "./en.json";
import ar from "./ar.json";
import { SupportedLang } from "@/constants";

export const translations: Record<SupportedLang, Record<string, string>> = {
  en,
  ar,
};
