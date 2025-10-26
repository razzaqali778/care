import { describe, expect, it } from "vitest";
import { DRAFT_PREFIX, STEPS, isStep, routes } from "./application";

describe("isStep", () => {
  it("accepts only supported steps", () => {
    STEPS.forEach((step) => expect(isStep(step)).toBe(true));
  });

  it("rejects unsupported values", () => {
    expect(isStep("unknown")).toBe(false);
    expect(isStep(undefined)).toBe(false);
  });
});

describe("routes", () => {
  it("builds application paths consistently", () => {
    expect(routes.application("new", "personal")).toBe(
      "/application/new/personal"
    );
    expect(routes.application("123", "financial")).toBe(
      "/application/123/financial"
    );
  });

  it("provides a stable draft prefix so persisted data does not collide", () => {
    expect(DRAFT_PREFIX.endsWith(":")).toBe(true);
  });
});
