export function iconSpacing(
  isRTL: boolean,
  side: "start" | "end" = "start"
): string {
  return isRTL
    ? side === "start"
      ? "ml-2"
      : "mr-2"
    : side === "start"
    ? "mr-2"
    : "ml-2";
}
