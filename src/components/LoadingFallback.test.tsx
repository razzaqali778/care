import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingFallback } from "./LoadingFallback";

describe("LoadingFallback", () => {
  it("renders a spinning loader with an accessible label", () => {
    render(<LoadingFallback />);

    const loader = screen.getByLabelText("Loading");
    expect(loader).toBeInTheDocument();
    expect(screen.getByText("Loading")).toHaveClass("sr-only");
  });
});

