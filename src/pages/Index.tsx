import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, ChevronLeft, FileText } from "lucide-react";
import { routes } from "@/constants/application";
import { LANDING } from "@/constants/landing";
import { iconSpacing } from "@/utility/Rtl";
import { isRTL as isRTLLang } from "@/constants/lang";

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isRTL = isRTLLang(language);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 sm:mb-6">
              {t(LANDING.hero.badgeKey)}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-4">
              {t(LANDING.hero.titleKey).split(" ").slice(0, 2).join(" ")}{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t(LANDING.hero.titleKey).split(" ").slice(2, 5).join(" ")}
              </span>{" "}
              {t(LANDING.hero.titleKey).split(" ").slice(5).join(" ")}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              {t(LANDING.hero.subtitleKey)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              {/* Start Application */}
              <Button
                size="lg"
                onClick={() => navigate(routes.application("new", "personal"))}
                className={`bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300 w-full sm:w-auto flex items-center ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FileText
                  className={`${iconSpacing(isRTL, "start")} h-5 w-5`}
                />
                <span>{t(LANDING.hero.startKey)}</span>
              </Button>

              {/* View Submissions */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(routes.submissions)}
                className={`w-full sm:w-auto flex items-center justify-center ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span>{t(LANDING.hero.viewSubmissionsKey)}</span>
                {isRTL ? (
                  <ChevronLeft
                    className={`${iconSpacing(isRTL, "end")} h-5 w-5`}
                  />
                ) : (
                  <ChevronRight
                    className={`${iconSpacing(isRTL, "end")} h-5 w-5`}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 px-4">
              {t(LANDING.why.titleKey)}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {t(LANDING.why.subtitleKey)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {LANDING.features.map((f, i) => (
              <Card
                key={i}
                className="text-center hover:shadow-medium transition-shadow duration-300 h-full"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    {t(f.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {t(f.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-primary text-primary-foreground shadow-strong">
            <CardContent className="text-center py-12 sm:py-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-4">
                {t(LANDING.cta.titleKey)}
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                {t(LANDING.cta.subtitleKey)}
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate(routes.application("new", "personal"))}
                className={`shadow-medium hover:shadow-strong transition-all duration-300 w-full sm:w-auto flex items-center justify-center mx-auto ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FileText
                  className={`${iconSpacing(isRTL, "start")} h-5 w-5`}
                />
                <span>{t(LANDING.cta.applyNowKey)}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
