import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mocks
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/pr-assistant",
}));

import PRAssistantPage from "@/app/pr-assistant/page";

describe("PRAssistantPage", () => {
  beforeEach(() => {
    render(<PRAssistantPage />);
  });

  it("renders the navbar", () => {
    expect(screen.getByTestId("navbar")).toBeTruthy();
  });

  it("renders the hero section with badge and title", () => {
    expect(screen.getByText("AI PR Assistant")).toBeTruthy();
    expect(screen.getByText(/AI Pull Request/)).toBeTruthy();
    expect(screen.getByText(/Reviewer/)).toBeTruthy();
  });

  it("renders the description text", () => {
    expect(
      screen.getByText(/Paste any GitHub pull request URL/)
    ).toBeTruthy();
  });

  it("renders the PR URL input field", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    expect(input).toBeTruthy();
  });

  it("renders the Analyze PR button", () => {
    expect(screen.getByText("Analyze PR")).toBeTruthy();
  });

  it("renders example PR buttons", () => {
    expect(screen.getByText("example #28758")).toBeTruthy();
    expect(screen.getByText("example #65432")).toBeTruthy();
    expect(screen.getByText("example #3456")).toBeTruthy();
  });

  it("renders feature badges", () => {
    expect(screen.getByText("5 Analysis Types")).toBeTruthy();
    expect(screen.getByText("Security Audit")).toBeTruthy();
    expect(screen.getByText("Actionable Insights")).toBeTruthy();
    expect(screen.getByText("GitHub API")).toBeTruthy();
  });

  it("disables the analyze button when input is empty", () => {
    const button = screen.getByText("Analyze PR").closest("button");
    expect(button?.hasAttribute("disabled")).toBe(true);
  });

  it("updates input value when typing", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    ) as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: "https://github.com/foo/bar/pull/42" },
    });
    expect(input.value).toBe("https://github.com/foo/bar/pull/42");
  });

  it("shows error for invalid URL when analyze is clicked", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    fireEvent.change(input, { target: { value: "invalid-url" } });

    const button = screen.getByText("Analyze PR").closest("button")!;
    fireEvent.click(button);

    expect(
      screen.getByText(/Please enter a valid GitHub PR URL/)
    ).toBeTruthy();
  });

  it("enables the analyze button when a valid URL is entered", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    fireEvent.change(input, {
      target: { value: "https://github.com/foo/bar/pull/42" },
    });

    const button = screen.getByText("Analyze PR").closest("button")!;
    expect(button.hasAttribute("disabled")).toBe(false);
  });

  it("fills the input when an example button is clicked", () => {
    fireEvent.click(screen.getByText("example #28758"));
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    ) as HTMLInputElement;
    expect(input.value).toContain("github.com/facebook/react/pull/28758");
  });

  it("shows loading state immediately after clicking analyze on a valid URL", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    fireEvent.change(input, {
      target: { value: "https://github.com/facebook/react/pull/28758" },
    });

    const button = screen.getByText("Analyze PR").closest("button")!;
    fireEvent.click(button);

    expect(screen.getByText("Analyzing Pull Request")).toBeTruthy();
    expect(screen.getByText(/Generating simulated analysis/)).toBeTruthy();
  });

  it("shows loading steps immediately after clicking analyze", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    fireEvent.change(input, {
      target: { value: "https://github.com/facebook/react/pull/28758" },
    });

    fireEvent.click(screen.getByText("Analyze PR").closest("button")!);

    expect(screen.getByText("Parsing PR URL...")).toBeTruthy();
    expect(screen.getByText("Analyzing code structure...")).toBeTruthy();
    expect(screen.getByText("Running security scan...")).toBeTruthy();
  });

  it("shows error when Enter is pressed on invalid URL", () => {
    const input = screen.getByPlaceholderText(
      "https://github.com/owner/repo/pull/123"
    );
    fireEvent.change(input, { target: { value: "not-a-url" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(
      screen.getByText(/Please enter a valid GitHub PR URL/)
    ).toBeTruthy();
  });
});
