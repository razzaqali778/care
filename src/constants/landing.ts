import { Shield, Clock, Users, Heart } from "lucide-react";

export const LANDING = {
  hero: {
    badgeKey: "landing.badge",
    titleKey: "landing.hero.title",
    subtitleKey: "landing.hero.subtitle",
    startKey: "landing.start.application",
    viewSubmissionsKey: "landing.view.submissions",
  },
  why: {
    titleKey: "landing.why.choose",
    subtitleKey: "landing.why.subtitle",
  },
  cta: {
    titleKey: "landing.cta.title",
    subtitleKey: "landing.cta.subtitle",
    applyNowKey: "landing.apply.now",
  },
  features: [
    {
      icon: Shield,
      titleKey: "landing.feature.secure.title",
      descKey: "landing.feature.secure.desc",
    },
    {
      icon: Clock,
      titleKey: "landing.feature.quick.title",
      descKey: "landing.feature.quick.desc",
    },
    {
      icon: Users,
      titleKey: "landing.feature.support.title",
      descKey: "landing.feature.support.desc",
    },
    {
      icon: Heart,
      titleKey: "landing.feature.care.title",
      descKey: "landing.feature.care.desc",
    },
  ] as const,
} as const;

export type LandingFeature = (typeof LANDING.features)[number];
