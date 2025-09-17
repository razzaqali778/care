import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { FileText, Users, Shield, Clock, ChevronRight, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('landing.feature.secure.title'),
      description: t('landing.feature.secure.desc')
    },
    {
      icon: Clock,
      title: t('landing.feature.quick.title'),
      description: t('landing.feature.quick.desc')
    },
    {
      icon: Users,
      title: t('landing.feature.support.title'),
      description: t('landing.feature.support.desc')
    },
    {
      icon: Heart,
      title: t('landing.feature.care.title'),
      description: t('landing.feature.care.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 sm:mb-6">
              {t('landing.badge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-4">
              {t('landing.hero.title').split(' ').slice(0, 2).join(' ')}{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t('landing.hero.title').split(' ').slice(2, 5).join(' ')}
              </span>{" "}
              {t('landing.hero.title').split(' ').slice(5).join(' ')}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                onClick={() => navigate("/application")}
                className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300 w-full sm:w-auto"
              >
                <FileText className="mr-2 h-5 w-5" />
                {t('landing.start.application')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/submissions")}
                className="w-full sm:w-auto"
              >
                {t('landing.view.submissions')}
                <ChevronRight className="ml-2 h-5 w-5" />
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
              {t('landing.why.choose')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {t('landing.why.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
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
                {t('landing.cta.title')}
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                {t('landing.cta.subtitle')}
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/application")}
                className="shadow-medium hover:shadow-strong transition-all duration-300 w-full sm:w-auto"
              >
                <FileText className="mr-2 h-5 w-5" />
                {t('landing.apply.now')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
