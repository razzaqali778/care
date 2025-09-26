import type { Submission, SubmissionForm, SubmissionRow } from "@/types/types";

const KEY = "submissions";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function read(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(list: Submission[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export const api = {
  async list(): Promise<Submission[]> {
    await delay(150);
    return read();
  },
  async get(id: string): Promise<Submission | undefined> {
    await delay(120);
    return read().find((s) => s.id === id);
  },
  async create(payload: SubmissionForm): Promise<Submission> {
    await delay(200);
    const now = new Date().toISOString();
    const sub: Submission = {
      id: String(Date.now()),
      ...payload,
      submittedAt: now,
      updatedAt: now,
    };
    const list = read();
    list.push(sub);
    write(list);
    return sub;
  },
  async update(
    id: string,
    payload: SubmissionForm
  ): Promise<Submission | undefined> {
    await delay(200);
    const list = read();
    const idx = list.findIndex((s) => s.id === id);
    if (idx < 0) return undefined;
    const updated: Submission = {
      ...list[idx],
      ...payload,
      id,
      updatedAt: new Date().toISOString(),
    };
    list[idx] = updated;
    write(list);
    return updated;
  },
  async remove(id: string): Promise<void> {
    await delay(120);
    write(read().filter((s) => s.id !== id));
  },
  toRow(s: Submission): SubmissionRow {
    return {
      id: s.id,
      idTail: `#${s.id.slice(-6)}`,
      name: s.name ?? "",
      nationalId: s.nationalId ?? "",
      email: s.email ?? "",
      reasonShort:
        (s.reasonForApplying ?? "").slice(0, 50) +
        ((s.reasonForApplying ?? "").length > 50 ? "…" : ""),
      submittedAtFmt: formatDate(s.submittedAt),
    };
  },
};

function formatDate(iso?: string) {
  const d = iso ? new Date(iso) : undefined;
  if (!d || Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
