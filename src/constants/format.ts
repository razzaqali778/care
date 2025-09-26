import type { Lang } from "@/types/types";

export function formatCurrency(
  amount: number | undefined,
  lang: Lang,
  currency = "USD"
): string {
  const n = typeof amount === "number" ? amount : 0;
  return new Intl.NumberFormat(lang === "ar" ? "ar" : "en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}
