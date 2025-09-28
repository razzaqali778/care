import { LanguageSwitch } from "@/components/ui/language-switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            className="flex items-center space-x-2"
            onClick={() => navigate("/")}
            aria-label="Go home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="font-bold text-primary-foreground">C</span>
            </span>
            <span className="text-xl font-bold text-foreground">
              {t("header.title")}
            </span>
          </button>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
