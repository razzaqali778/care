export function safeT(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v && !v.startsWith("[") ? v : fallback;
}
