import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

const navigateMock = vi.fn();

vi.mock("@/components/ui/language-switch", () => ({
  LanguageSwitch: () => <div data-testid="language-switch" />,
}));

vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => (key === "header.title" ? "Care Fund" : key),
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Header", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("renders the translated title and language switch", () => {
    render(<Header />);

    expect(screen.getByText("Care Fund")).toBeInTheDocument();
    expect(screen.getByTestId("language-switch")).toBeInTheDocument();
  });

  it("navigates home when the brand button is clicked", () => {
    render(<Header />);

    const [homeButton] = screen.getAllByRole("button", { name: "Go home" });
    fireEvent.click(homeButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
