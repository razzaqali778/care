export const OPENAI_CHAT_URL =
  "https://api.openai.com/v1/chat/completions" as const;

const RAW_KEY =
  (import.meta as any)?.env?.VITE_OPENAI_API_KEY ??
  (process as any)?.env?.REACT_APP_OPENAI_API_KEY ??
  (typeof window !== "undefined" ? (window as any).__OPENAI_KEY__ : undefined);

export const OPENAI_API_KEY: string | undefined =
  typeof RAW_KEY === "string" ? RAW_KEY.trim() : undefined;
export const hasOpenAIKey = Boolean(OPENAI_API_KEY);

export const DEFAULT_MODEL =
  (
    (import.meta as any)?.env?.VITE_OPENAI_MODEL as string | undefined
  )?.trim() || "gpt-4o-mini";

export const OPENAI_DEFAULTS = {
  temperature: 0.4,
  maxTokens: 240,
  translateTemperature: 0.2,
  translateMaxTokens: 220,
  timeoutMs: 10_000,
} as const;

export const maskKey = (k?: string) =>
  k ? `${k.slice(0, 7)}…${k.slice(-4)}` : "<none>";

if (import.meta.env?.DEV) {
  console.debug(
    "[ai-assist] key:",
    maskKey(OPENAI_API_KEY),
    "model:",
    DEFAULT_MODEL
  );
}

export function __setDevOpenAIKey(key: string) {
  if (typeof window !== "undefined")
    (window as any).__OPENAI_KEY__ = String(key || "").trim();
}
