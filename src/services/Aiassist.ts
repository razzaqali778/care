import type { Lang } from "@/types/Types";
import type { ApplicationState, ChatMessage } from "@/types/Types";
import {
  OPENAI_CHAT_URL,
  OPENAI_API_KEY,
  hasOpenAIKey,
  DEFAULT_MODEL,
  OPENAI_DEFAULTS,
} from "@/constants/ai";
import { formatCurrency } from "@/constants/format";
import {
  buildGeneratePrompt,
  buildRefinePrompt,
  systemPrompt,
  systemTranslatePrompt,
  userTranslatePrompt,
} from "@/utility/Prompts";
import {
  EMPLOYMENT_STATUS_LABELS_EN,
  EMPLOYMENT_STATUS_LABELS_AR,
} from "@/constants/status";
import { AssistFieldKey } from "@/constants";

async function chatComplete({
  messages,
  model = DEFAULT_MODEL,
  maxTokens = OPENAI_DEFAULTS.maxTokens,
  temperature = OPENAI_DEFAULTS.temperature,
  signal,
}: {
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
}): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key");
  const res = await fetch(OPENAI_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
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
  if (sourceText?.trim()) {
    const t = sourceText.trim().replace(/\s+/g, " ");
    return t.length > 900 ? `${t.slice(0, 900)}…` : t;
  }
  return templateDraft(fieldKey, application, language);
}

function labelEmployment(lang: Lang, v: string): string {
  const map =
    lang === "ar" ? EMPLOYMENT_STATUS_LABELS_AR : EMPLOYMENT_STATUS_LABELS_EN;
  return map[v] ?? (lang === "ar" ? "غير محدد" : "N/A");
}

function templateDraft(
  fieldKey: AssistFieldKey,
  app: ApplicationState,
  lang: Lang
): string {
  const dep = app.family.dependents ?? 0;
  const income = formatCurrency(app.family.monthlyIncome ?? 0, lang, "USD");
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
        `حالتي الوظيفية: ${labelEmployment(
          "ar",
          app.family.employmentStatus
        )}.`,
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
      `Employment status: ${labelEmployment(
        "en",
        app.family.employmentStatus
      )}.`,
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
  const timeout = setTimeout(
    () => controller.abort(),
    OPENAI_DEFAULTS.timeoutMs
  );

  const sys = systemPrompt(language);
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
      maxTokens: OPENAI_DEFAULTS.maxTokens,
      temperature: OPENAI_DEFAULTS.temperature,
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

export async function translateText(
  text: string,
  target: "en" | "ar"
): Promise<string> {
  const src = text?.trim();
  if (!src) return text;
  if (!hasOpenAIKey) return text;

  const out = await chatComplete({
    messages: [
      { role: "system", content: systemTranslatePrompt(target) },
      { role: "user", content: userTranslatePrompt(src, target) },
    ],
    maxTokens: OPENAI_DEFAULTS.translateMaxTokens,
    temperature: OPENAI_DEFAULTS.translateTemperature,
  });

  return out?.trim() || text;
}

export { hasOpenAIKey } from "@/constants/ai";
export { DEFAULT_MODEL } from "@/constants/ai";
