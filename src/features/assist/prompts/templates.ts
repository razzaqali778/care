import { formatCurrency } from "@/constants/format";
import {
  EMPLOYMENT_STATUS_LABELS_AR,
  EMPLOYMENT_STATUS_LABELS_EN,
} from "@/constants/status";
import type { AssistFieldKey } from "@/constants/assist";
import type { OfflineTemplateParams, PromptLanguage } from "../types";

const describeApplicant = (name: string | undefined, dependents: number) =>
  name
    ? `I am ${name} and support ${dependents} household member${
        dependents === 1 ? "" : "s"
      }.`
    : `I support ${dependents} household member${
        dependents === 1 ? "" : "s"
      }.`;

const describeApplicantArabic = (
  name: string | undefined,
  dependents: number
) =>
  name
    ? `أنا ${name} وأعيل ${dependents} فردًا من الأسرة.`
    : `أعيل ${dependents} فردًا من الأسرة.`;

const labelEmployment = (lang: PromptLanguage, value: string): string => {
  const table =
    lang === "ar"
      ? EMPLOYMENT_STATUS_LABELS_AR
      : EMPLOYMENT_STATUS_LABELS_EN;
  return table[value] ?? (lang === "ar" ? "غير محدد" : "Not specified");
};

type TemplateBuilder = (ctx: OfflineTemplateParams) => string[];

const ENGLISH_TEMPLATES: Record<AssistFieldKey, TemplateBuilder> = {
  currentFinancialSituation: ({ application }) => {
    const dependents = application.family.dependents ?? 0;
    const income = formatCurrency(
      application.family.monthlyIncome ?? 0,
      "en",
      "USD"
    );
    return [
      describeApplicant(application.personal.name, dependents),
      `My monthly income is ${income}, which no longer covers rent, utilities, and groceries.`,
      "I'm cutting expenses where possible but need temporary help to stay current.",
    ];
  },
  employmentCircumstances: ({ application }) => [
    `Employment status: ${labelEmployment(
      "en",
      application.family.employmentStatus
    )}.`,
    "My hours and income recently changed, making on-time payments harder.",
    "I'm actively pursuing more stable work and additional income sources.",
  ],
  reasonForApplying: () => [
    "I'm requesting temporary financial assistance to cover essential living costs.",
    "This support will help bridge the gap until my income stabilizes.",
    "I'll use the funds responsibly and keep the organization updated.",
  ],
};

const ARABIC_TEMPLATES: Record<AssistFieldKey, TemplateBuilder> = {
  currentFinancialSituation: ({ application }) => {
    const dependents = application.family.dependents ?? 0;
    const income = formatCurrency(
      application.family.monthlyIncome ?? 0,
      "ar",
      "USD"
    );
    return [
      describeApplicantArabic(application.personal.name, dependents),
      `دخلي الشهري هو ${income} ولا يكفي لتغطية الإيجار والفواتير والمصاريف الأساسية.`,
      "أحاول تقليل المصروفات قدر الإمكان وأحتاج إلى دعم مؤقت للمحافظة على الالتزامات.",
    ];
  },
  employmentCircumstances: ({ application }) => [
    `الوضع الوظيفي: ${labelEmployment(
      "ar",
      application.family.employmentStatus
    )}.`,
    "تغيرت ساعات العمل والدخل مؤخرًا مما صعّب سداد الالتزامات في وقتها.",
    "أبحث بنشاط عن فرصة عمل أكثر استقرارًا ومصادر دخل إضافية.",
  ],
  reasonForApplying: () => [
    "أطلب مساعدة مالية مؤقتة لتغطية الاحتياجات الأساسية لأسرتي.",
    "سيساعدني هذا الدعم على سد الفجوة حتى يتحسن الدخل.",
    "سأستخدم المبلغ بمسؤولية وأبقي الجهة الداعمة على اطلاع.",
  ],
};

export const buildOfflineTemplate = (params: OfflineTemplateParams): string => {
  const { fieldKey, language } = params;
  const templateMap =
    language === "ar" ? ARABIC_TEMPLATES : ENGLISH_TEMPLATES;
  return templateMap[fieldKey](params).join(" ");
};
