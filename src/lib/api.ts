import type { Submission, SubmissionForm, SubmissionRow } from "@/types/Types";
import {
  API_OPERATION_DELAYS,
  STORAGE_KEYS,
  type SubmissionApiOperation,
} from "@/constants/api";
import {
  createApiClient,
  type ApiInterceptor,
  type ApiOperation,
} from "@/lib/ApiClient";

const sleep = (ms: number) =>
  new Promise((resolve) => globalThis.setTimeout(resolve, ms));

const delayInterceptor: ApiInterceptor = {
  async onRequest({ operation }) {
    const delayMs =
      API_OPERATION_DELAYS[operation as SubmissionApiOperation] ?? 0;
    if (delayMs > 0) {
      await sleep(delayMs);
    }
  },
};

const logErrorInterceptor: ApiInterceptor = {
  onError(error, { operation }) {
    console.error(`[api:${operation}]`, error);
  },
};

const client = createApiClient([delayInterceptor, logErrorInterceptor]);
const STORAGE_KEY = STORAGE_KEYS.submissions;

const read = (): Submission[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const write = (list: Submission[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

const exec = <T>(
  operation: ApiOperation,
  action: () => Promise<T>,
  payload?: unknown
) => client.execute(operation, action, payload);

export const api = {
  list(): Promise<Submission[]> {
    return exec("list", async () => read());
  },
  get(id: string): Promise<Submission | undefined> {
    return exec(
      "get",
      async () => read().find((submission) => submission.id === id),
      id
    );
  },
  create(payload: SubmissionForm): Promise<Submission> {
    return exec(
      "create",
      async () => {
        const now = new Date().toISOString();
        const submission: Submission = {
          id: String(Date.now()),
          ...payload,
          submittedAt: now,
          updatedAt: now,
        };
        const list = read();
        list.push(submission);
        write(list);
        return submission;
      },
      payload
    );
  },
  update(id: string, payload: SubmissionForm): Promise<Submission | undefined> {
    return exec(
      "update",
      async () => {
        const list = read();
        const idx = list.findIndex((submission) => submission.id === id);
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
      { id, payload }
    );
  },
  remove(id: string): Promise<void> {
    return exec(
      "remove",
      async () => {
        write(read().filter((submission) => submission.id !== id));
      },
      id
    );
  },
  toRow(submission: Submission): SubmissionRow {
    const { reasonForApplying = "" } = submission;
    const trimmedReason = reasonForApplying.slice(0, 50);
    const hasOverflow = reasonForApplying.length > 50;

    return {
      id: submission.id,
      idTail: `#${submission.id.slice(-6)}`,
      name: submission.name ?? "",
      nationalId: submission.nationalId ?? "",
      email: submission.email ?? "",
      reasonShort: trimmedReason + (hasOverflow ? "..." : ""),
      submittedAtFmt: formatDate(submission.submittedAt),
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
