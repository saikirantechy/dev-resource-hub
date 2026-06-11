import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockData = vi.hoisted(() => [{ id: "1", name: "Test", description: "A test item", category: "Test", tags: [] }]);

vi.mock("@/data/agents.json", () => ({ default: mockData }));
vi.mock("@/data/tools.json", () => ({ default: mockData }));
vi.mock("@/data/prompts.json", () => ({ default: mockData }));

import { render, screen, fireEvent } from "@testing-library/react";
import CommandPalette from "@/components/CommandPalette";

describe("CommandPalette", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<CommandPalette />);
    expect(container.innerHTML).toBe("");
  });

  it("opens on Cmd+K", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { metaKey: true, key: "k" });
    expect(screen.getByPlaceholderText(/search/i)).toBeTruthy();
  });

  it("closes on Escape", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { metaKey: true, key: "k" });
    expect(screen.getByPlaceholderText(/search/i)).toBeTruthy();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByPlaceholderText(/search/i)).toBeNull();
  });

  it("shows action items", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { metaKey: true, key: "k" });
    expect(screen.getByText("Latest Blog Posts")).toBeTruthy();
    expect(screen.getByText("AI Resource Finder")).toBeTruthy();
    expect(screen.getByText("Prompt Library")).toBeTruthy();
  });

  it("filters on search", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { metaKey: true, key: "k" });
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Agent" } });
    expect(screen.getByText("AI Agent Explorer")).toBeTruthy();
  });
});
