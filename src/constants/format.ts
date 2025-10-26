import type { Lang } from "@/types/Types";
import { AR, EN } from "@/constants/lang";

export function formatCurrency(
  amount: number | undefined,
  lang: Lang,
  currency = "USD"
): string {
  const n = typeof amount === "number" ? amount : 0;
  const locale = lang === AR ? AR : EN;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}
