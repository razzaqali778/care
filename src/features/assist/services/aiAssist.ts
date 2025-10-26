import type { ChatMessage } from "@/types/Types";
import {
  OPENAI_CHAT_URL,
  OPENAI_API_KEY,
  hasOpenAIKey,
  DEFAULT_MODEL,
  OPENAI_DEFAULTS,
} from "@/constants/ai";
import {
  buildGeneratePrompt,
  buildRefinePrompt,
  buildOfflineTemplate,
  systemPrompt,
  systemTranslatePrompt,
  userTranslatePrompt,
} from "@/features/assist/prompts";
import type { AiAssistRequest } from "../types";

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
  const response = await fetch(OPENAI_CHAT_URL, {
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

  if (!response.ok) {
    const body = await response.text().catch(() => "<no body>");
    throw new Error(`[OpenAI ${response.status}] ${body.slice(0, 500)}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() ?? "";
}

export const offlineAssist = ({
  fieldKey,
  application,
  language,
  sourceText,
}: AiAssistRequest): string => {
  if (sourceText?.trim()) {
    const normalized = sourceText.trim().replace(/\s+/g, " ");
    return normalized.length > 900 ? `${normalized.slice(0, 900)}...` : normalized;
  }

  return buildOfflineTemplate({ fieldKey, application, language });
};

export const requestAiAssist = async (
  params: AiAssistRequest
): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    OPENAI_DEFAULTS.timeoutMs
  );

  const prompt = params.sourceText?.trim()
    ? buildRefinePrompt({
        ...params,
        sourceText: params.sourceText.trim(),
      })
    : buildGeneratePrompt(params);

  try {
    if (!hasOpenAIKey) {
      return offlineAssist(params);
    }

    const result = await chatComplete({
      messages: [
        { role: "system", content: systemPrompt(params.language) },
        { role: "user", content: prompt },
      ],
      signal: controller.signal,
      maxTokens: OPENAI_DEFAULTS.maxTokens,
      temperature: OPENAI_DEFAULTS.temperature,
    });

    return result || offlineAssist(params);
  } catch {
    return offlineAssist(params);
  } finally {
    clearTimeout(timeout);
  }
};

export const translateText = async (
  text: string,
  target: "en" | "ar"
): Promise<string> => {
  const normalized = text?.trim();
  if (!normalized) return text;
  if (!hasOpenAIKey) return text;

  const output = await chatComplete({
    messages: [
      { role: "system", content: systemTranslatePrompt({ target }) },
      { role: "user", content: userTranslatePrompt({ text: normalized, target }) },
    ],
    maxTokens: OPENAI_DEFAULTS.translateMaxTokens,
    temperature: OPENAI_DEFAULTS.translateTemperature,
  });

  return output?.trim() || text;
};

export { hasOpenAIKey, DEFAULT_MODEL } from "@/constants/ai";
