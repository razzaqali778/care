import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "@/i18n/Translations";
import { LanguageContextValue } from "@/types/Types";
import {
  EN,
  AR,
  parseSupportedLang,
  applyHtmlLangDir,
  SupportedLang,
} from "@/constants/lang";

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return parseSupportedLang(saved, { defaultLang: EN });
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {}
    applyHtmlLangDir(document, language);
  }, [language]);

  const t = useMemo(() => {
    const table = translations[language] ?? {};
    const fallback = translations[EN] ?? {};
    return (key: string) =>
      key in table ? table[key] : key in fallback ? fallback[key] : `[${key}]`;
  }, [language]);

  const setLanguage = (lang: SupportedLang) =>
    setLanguageState(lang === AR ? AR : EN);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
};
