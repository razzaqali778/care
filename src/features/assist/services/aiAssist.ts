import { hasOpenAIKey, OPENAI_DEFAULTS } from "@/constants/ai";
import {
  buildGeneratePrompt,
  buildRefinePrompt,
  buildOfflineTemplate,
  systemPrompt,
  systemTranslatePrompt,
  userTranslatePrompt,
} from "@/features/assist/prompts";
import {
  openAiClient,
  type OpenAiChatRequest,
} from "@/features/assist/services/openAiClient";
import type { AiAssistRequest } from "../types";

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

    const request: OpenAiChatRequest = {
      messages: [
        { role: "system", content: systemPrompt(params.language) },
        { role: "user", content: prompt },
      ],
      maxTokens: OPENAI_DEFAULTS.maxTokens,
      temperature: OPENAI_DEFAULTS.temperature,
      timeoutMs: OPENAI_DEFAULTS.timeoutMs,
    };

    const result = await openAiClient.chat(
      "ai:assist",
      request,
      {
        fieldKey: params.fieldKey,
        language: params.language,
        hasSource: Boolean(params.sourceText?.trim()),
      }
    );

    return result || offlineAssist(params);
  } catch {
    return offlineAssist(params);
  }
};

export const translateText = async (
  text: string,
  target: "en" | "ar"
): Promise<string> => {
  const normalized = text?.trim();
  if (!normalized) return text;
  if (!hasOpenAIKey) return text;

  try {
    const request: OpenAiChatRequest = {
      messages: [
        { role: "system", content: systemTranslatePrompt({ target }) },
        {
          role: "user",
          content: userTranslatePrompt({ text: normalized, target }),
        },
      ],
      maxTokens: OPENAI_DEFAULTS.translateMaxTokens,
      temperature: OPENAI_DEFAULTS.translateTemperature,
      timeoutMs: OPENAI_DEFAULTS.timeoutMs,
    };

    const output = await openAiClient.chat(
      "ai:translate",
      request,
      { target }
    );

    return output?.trim() || text;
  } catch {
    return text;
  }
};

export { hasOpenAIKey, DEFAULT_MODEL } from "@/constants/ai";
