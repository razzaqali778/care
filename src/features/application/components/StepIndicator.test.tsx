import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StepIndicator } from "./StepIndicator";

describe("StepIndicator", () => {
  it("renders the correct number of steps and highlights completed ones", () => {
    const { container } = render(
      <StepIndicator totalSteps={3} currentStepIndex={1} />
    );

    expect(screen.getByText("1")).toHaveClass("bg-primary");
    expect(screen.getByText("2")).toHaveClass("bg-primary");
    expect(screen.getByText("3")).not.toHaveClass("bg-primary");

    const progressBar = container.querySelector(
      ".bg-gradient-primary.h-2.rounded-full"
    ) as HTMLDivElement | null;
    expect(progressBar).toBeTruthy();
    if (progressBar) {
      const widthValue = parseFloat(progressBar.style.width);
      expect(widthValue).toBeCloseTo(((1 + 1) / 3) * 100);
    }
  });

});
