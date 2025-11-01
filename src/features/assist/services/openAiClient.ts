import type { ChatMessage } from "@/types/Types";
import {
  OPENAI_CHAT_URL,
  OPENAI_API_KEY,
  DEFAULT_MODEL,
  OPENAI_DEFAULTS,
} from "@/constants/ai";
import { createApiClient, type ApiInterceptor } from "@/lib/ApiClient";

export type OpenAiOperation = "ai:assist" | "ai:translate";

export type OpenAiChatRequest = {
  messages: ChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
};

const aiInterceptors: ApiInterceptor[] = [
  {
    onRequest({ operation }) {
      if (import.meta.env?.DEV) {
        console.debug(`[ai:${operation}] → request`);
      }
    },
    onResponse({ operation }) {
      if (import.meta.env?.DEV) {
        console.debug(`[ai:${operation}] ← response`);
      }
    },
    onError(error, { operation }) {
      const err = error as Error;
      if (err?.name === "AbortError") {
        console.warn(`[ai:${operation}] request aborted`);
        return;
      }
      console.error(`[ai:${operation}]`, error);
    },
  },
];

const aiClient = createApiClient(aiInterceptors);

async function fetchChatCompletion({
  messages,
  model = DEFAULT_MODEL,
  maxTokens = OPENAI_DEFAULTS.maxTokens,
  temperature = OPENAI_DEFAULTS.temperature,
  timeoutMs = OPENAI_DEFAULTS.timeoutMs,
}: OpenAiChatRequest): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("Missing OpenAI API key");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(OPENAI_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      signal: controller.signal,
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
  } catch (error) {
    const err = error as Error;
    if (err?.name === "AbortError") {
      throw new Error("OpenAI request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const openAiClient = {
  chat(operation: OpenAiOperation, request: OpenAiChatRequest, payload?: unknown) {
    return aiClient.execute(operation, () => fetchChatCompletion(request), payload);
  },
};

