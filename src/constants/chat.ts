export const CHAT_ROLES = ["system", "user", "assistant"] as const;

export type ChatRole = (typeof CHAT_ROLES)[number];

export const ROLE_SYSTEM: ChatRole = "system";
export const ROLE_USER: ChatRole = "user";
export const ROLE_ASSISTANT: ChatRole = "assistant";

const ROLE_SET: ReadonlySet<string> = new Set(CHAT_ROLES);
export function isChatRole(x: unknown): x is ChatRole {
  return typeof x === "string" && ROLE_SET.has(x);
}

export function makeMessage(role: ChatRole, content: string): ChatMessage {
  return { role, content };
}

export type ChatMessage = {
  role: ChatRole;
  content: string;
};
