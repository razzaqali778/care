import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StepNavigation } from "./StepNavigation";

const labels = {
  back: "Back",
  next: "Next",
  submit: "Submit",
};

describe("StepNavigation", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("disables the back button on the first step and calls onNext", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    const { getAllByRole } = render(
      <StepNavigation
        isFirstStep
        isLastStep={false}
        isRTL={false}
        onPrev={onPrev}
        onNext={onNext}
        onSubmit={vi.fn()}
        labels={labels}
      />
    );

    const [backButton] = getAllByRole("button", { name: "Back" });
    const [nextButton] = getAllByRole("button", { name: "Next" });

    expect(backButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrev).not.toHaveBeenCalled();
  });

  it("renders submit controls on the last step and respects RTL layout", () => {
    const onPrev = vi.fn();
    const onSubmit = vi.fn();

    const { getAllByRole } = render(
      <StepNavigation
        isFirstStep={false}
        isLastStep
        isRTL
        onPrev={onPrev}
        onNext={vi.fn()}
        onSubmit={onSubmit}
        labels={labels}
      />
    );

    const [backButton] = getAllByRole("button", { name: "Back" });
    const [submitButton] = getAllByRole("button", { name: "Submit" });

    expect(backButton).not.toBeDisabled();
    expect(backButton.className).toContain("flex-row-reverse");
    expect(submitButton.className).toContain("flex-row-reverse");

    fireEvent.click(backButton);
    fireEvent.click(submitButton);

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
