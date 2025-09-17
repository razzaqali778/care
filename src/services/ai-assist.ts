import type {
  ApplicationState,
  AssistFieldKey,
  ChatMessage,
  Lang,
} from "../types/types";

const API_KEY = (import.meta as any).env?.VITE_OPENAI_API_KEY?.trim();
const DEFAULT_MODEL =
  (import.meta as any).env?.VITE_OPENAI_MODEL?.trim() || "gpt-4o-mini";
export const hasOpenAIKey = Boolean(API_KEY);

const mask = (k?: string) => (k ? `${k.slice(0, 7)}…${k.slice(-4)}` : "<none>");
if (import.meta.env.DEV) {
  console.debug("[ai-assist] key:", mask(API_KEY), "model:", DEFAULT_MODEL);
}

export async function chatComplete({
  messages,
  model = DEFAULT_MODEL,
  maxTokens = 240,
  temperature = 0.4,
  signal,
}: {
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}): Promise<string> {
  if (!API_KEY) throw new Error("Missing VITE_OPENAI_API_KEY");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    signal,
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "<no body>");
    throw new Error(`[OpenAI ${res.status}] ${body.slice(0, 500)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "";
}

export function offlineAssist({
  fieldKey,
  application,
  language,
  sourceText,
}: {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
  sourceText?: string;
}): string {
  // why: keep UX working without network/key
  if (sourceText?.trim()) {
    const t = sourceText.trim().replace(/\s+/g, " ");
    return t.length > 900 ? `${t.slice(0, 900)}…` : t;
  }
  return templateDraft(fieldKey, application, language);
}

function nf(lang: Lang) {
  return new Intl.NumberFormat(lang === "ar" ? "ar" : "en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function labelEn(v: string) {
  switch (v) {
    case "employed":
      return "Employed";
    case "unemployed":
      return "Unemployed";
    case "self-employed":
      return "Self-employed";
    case "student":
      return "Student";
    case "retired":
      return "Retired";
    default:
      return "N/A";
  }
}
function labelAr(v: string) {
  switch (v) {
    case "employed":
      return "موظف";
    case "unemployed":
      return "عاطل";
    case "self-employed":
      return "عمل حر";
    case "student":
      return "طالب";
    case "retired":
      return "متقاعد";
    default:
      return "غير محدد";
  }
}

function templateDraft(
  fieldKey: AssistFieldKey,
  app: ApplicationState,
  lang: Lang
): string {
  const dep = app.family.dependents ?? 0;
  const income = nf(lang).format(app.family.monthlyIncome ?? 0);
  if (lang === "ar") {
    const lines = {
      currentFinancialSituation: [
        (
          `أنا ${app.personal.name || ""}`.trim() +
          ` وأتكفّل بمصروف أسرتي (${dep} معال).`
        ).trim(),
        `الدخل الشهري ${income} ولا يغطي الإيجار والاحتياجات الأساسية بالكامل.`,
        `أقلّل المصاريف قدر الإمكان وأحتاج دعمًا مؤقتًا.`,
      ],
      employmentCircumstances: [
        `حالتي الوظيفية: ${labelAr(app.family.employmentStatus)}.`,
        `تغيّرت ساعات العمل/الدخل مؤخرًا مما أثّر على السداد في الموعد.`,
        `أسعى للاستقرار الوظيفي ودخل ثابت.`,
      ],
      reasonForApplying: [
        `أتقدّم بطلب دعم مؤقت لتغطية الاحتياجات الأساسية للأسرة.`,
        `سيساعدني هذا الدعم على تجاوز الفترة الحالية حتى يتحسّن الدخل.`,
        `سأستخدم المساعدة بمسؤولية.`,
      ],
    } as const;
    return lines[fieldKey].join(" ");
  }
  const lines = {
    currentFinancialSituation: [
      (
        `I am ${app.personal.name || ""}`.trim() +
        ` and support a household of ${dep}.`
      ).trim(),
      `My monthly income is ${income} and doesn't fully cover rent and essentials.`,
      `I'm cutting expenses where possible and need temporary support.`,
    ],
    employmentCircumstances: [
      `Employment status: ${labelEn(app.family.employmentStatus)}.`,
      `My hours/income changed recently, making on-time payments harder.`,
      `I'm working toward a more stable role and steady income.`,
    ],
    reasonForApplying: [
      `I'm requesting temporary support to cover basic needs for my household.`,
      `This assistance helps bridge the gap until my income improves.`,
      `I'll use the funds responsibly.`,
    ],
  } as const;
  return lines[fieldKey].join(" ");
}

export function fieldLabel(key: AssistFieldKey, lang: Lang): string {
  const m = {
    currentFinancialSituation: {
      en: "Current Financial Situation",
      ar: "الوضع المالي الحالي",
    },
    employmentCircumstances: {
      en: "Employment Circumstances",
      ar: "الظروف الوظيفية",
    },
    reasonForApplying: { en: "Reason for Applying", ar: "سبب التقديم" },
  } as const;
  return m[key][lang];
}

export function buildGeneratePrompt(p: {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
}): string {
  const deps = p.application.family?.dependents ?? 0;
  const income = p.application.family?.monthlyIncome ?? 0;
  const name = p.application.personal?.name ?? "";
  if (p.language === "ar") {
    return [
      `اكتب فقرة مختصرة لـ "${fieldLabel(
        p.fieldKey,
        "ar"
      )}" بنبرة محترمة ومباشرة.`,
      `عدد المعالين: ${deps}. الدخل الشهري: ${income}. ${
        name ? `الاسم: ${name}.` : ""
      }`,
      `الحد: 150 كلمة. نص عادي فقط.`,
      `أعد الإجابة بالعربية فقط.`,
    ].join("\n");
  }
  return [
    `Draft a concise paragraph for "${fieldLabel(
      p.fieldKey,
      "en"
    )}" in a respectful, plain tone.`,
    `Dependents: ${deps}. Monthly income: ${income}. ${
      name ? `Name: ${name}.` : ""
    }`,
    `Limit: 150 words. Plain text only.`,
    `Respond in English only.`,
  ].join("\n");
}

export function buildRefinePrompt(p: {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
  sourceText: string;
}): string {
  const label = fieldLabel(p.fieldKey, p.language);
  if (p.language === "ar") {
    return [
      `حسّن/لخّص النص التالي لـ "${label}" باختصار ووضوح مع الحفاظ على الحقائق.`,
      `فقرة أو فقرتان (حتى 150 كلمة). نص عادي فقط.`,
      `أعد النتيجة بالعربية فقط.`,
      `— النص —`,
      p.sourceText,
    ].join("\n");
  }
  return [
    `Improve/condense the following for "${label}" while preserving facts.`,
    `1–2 short paragraphs (≤150 words). Plain text only.`,
    `Return in English only.`,
    `— text —`,
    p.sourceText,
  ].join("\n");
}

export async function requestAiAssist({
  fieldKey,
  application,
  language,
  sourceText,
}: {
  fieldKey: AssistFieldKey;
  application: ApplicationState;
  language: Lang;
  sourceText?: string;
}): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  const sys =
    language === "ar"
      ? "أنت مساعد موجز يعيد الصياغة بوضوح ويحافظ على الحقائق."
      : "You are a concise assistant that rewrites and summarizes clearly while preserving facts.";
  const user = sourceText?.trim()
    ? buildRefinePrompt({
        fieldKey,
        application,
        language,
        sourceText: sourceText.trim(),
      })
    : buildGeneratePrompt({ fieldKey, application, language });

  try {
    if (!hasOpenAIKey)
      return offlineAssist({ fieldKey, application, language, sourceText });
    const text = await chatComplete({
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      signal: controller.signal,
      maxTokens: 240,
      temperature: 0.4,
    });
    return (
      text || offlineAssist({ fieldKey, application, language, sourceText })
    );
  } catch {
    return offlineAssist({ fieldKey, application, language, sourceText });
  } finally {
    clearTimeout(timeout);
  }
}

function readOpenAIKey(): string | undefined {
  try {
    const v = (import.meta as any)?.env?.VITE_OPENAI_API_KEY;
    if (v && String(v).trim()) return String(v).trim();
  } catch {}
  try {
    const v = (process as any)?.env?.REACT_APP_OPENAI_API_KEY;
    if (v && String(v).trim()) return String(v).trim();
  } catch {}
  if (typeof window !== "undefined") {
    const v = (window as any).__OPENAI_KEY__;
    if (v && String(v).trim()) return String(v).trim();
  }
  return undefined;
}

/** Exact translation, no commentary. Falls back to original text if no key. */
export async function translateText(
  text: string,
  target: "en" | "ar"
): Promise<string> {
  const src = text?.trim();
  if (!src) return text;
  if (!hasOpenAIKey) return text;

  const sys =
    target === "ar"
      ? "أنت مترجم دقيق. ترجم النص إلى العربية فقط دون شرح."
      : "You are a precise translator. Translate the text into English only with no explanations.";

  const user =
    target === "ar"
      ? `ترجم إلى العربية فقط:\n— النص —\n${src}`
      : `Translate to English only:\n— text —\n${src}`;

  const out = await chatComplete({
    messages: [
      { role: "system", content: sys },
      { role: "user", content: user },
    ],
    maxTokens: 220,
    temperature: 0.2,
  });

  return out?.trim() || text;
}

// Dev helper to set key at runtime if needed
export function __setDevOpenAIKey(key: string) {
  if (typeof window !== "undefined") (window as any).__OPENAI_KEY__ = key;
}
