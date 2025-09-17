import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, SupportedLang } from "@/i18n/translations";

type LanguageContextValue = {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<SupportedLang>(() => {
    const saved =
      (localStorage.getItem(STORAGE_KEY) as SupportedLang | null) || "en";
    return saved === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {}
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", "ltr");
  }, [language]);

  const t = useMemo(() => {
    const table = translations[language];
    const fallback = translations.en;
    return (key: string) =>
      key in table ? table[key] : key in fallback ? fallback[key] : `[${key}]`;
  }, [language]);

  const setLanguage = (lang: SupportedLang) =>
    setLanguageState(lang === "ar" ? "ar" : "en");
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
