import { describe, expect, it, vi } from "vitest";
import { ApiClient } from "./ApiClient";

describe("ApiClient", () => {
  it("runs request and response interceptors around the action", async () => {
    const sequence: string[] = [];
    const client = new ApiClient([
      {
        onRequest: () => {
          sequence.push("request");
        },
        onResponse: () => {
          sequence.push("response");
        },
      },
    ]);

    const result = await client.execute("demo", async () => {
      sequence.push("action");
      return 42;
    });

    expect(result).toBe(42);
    expect(sequence).toEqual(["request", "action", "response"]);
  });

  it("notifies error interceptors and rethrows errors", async () => {
    const onError = vi.fn();
    const client = new ApiClient([{ onError }]);

    await expect(
      client.execute("demo", async () => {
        throw new Error("boom");
      })
    ).rejects.toThrow("boom");

    expect(onError).toHaveBeenCalledTimes(1);
    const [errorArg, contextArg] = onError.mock.calls[0];
    expect((errorArg as Error).message).toBe("boom");
    expect(contextArg).toMatchObject({ operation: "demo" });
  });
});
