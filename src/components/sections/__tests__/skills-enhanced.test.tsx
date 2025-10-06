import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SkillsEnhanced } from "../skills-enhanced";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

describe("SkillsEnhanced", () => {
  it("renders the skills section with proper id", () => {
    const { container } = render(<SkillsEnhanced />);
    const section = container.querySelector("section#skills");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<SkillsEnhanced />);
    expect(screen.getByRole("heading", { name: /Technical Skills/i })).toBeInTheDocument();
  });

  it("displays all skill categories", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Development Tools")).toBeInTheDocument();
  });

  it("displays search input", () => {
    render(<SkillsEnhanced />);
    const searchInput = screen.getByPlaceholderText(/Search skills/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("filters skills by search query", () => {
    render(<SkillsEnhanced />);

    const searchInput = screen.getByPlaceholderText(/Search skills/i);
    fireEvent.change(searchInput, { target: { value: "TypeScript" } });

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("displays skill level filter buttons", () => {
    const { container } = render(<SkillsEnhanced />);

    expect(screen.getByText("All Levels")).toBeInTheDocument();

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it("filters skills by level when clicking filter button", () => {
    render(<SkillsEnhanced />);

    const buttons = screen.getAllByRole("button");
    const expertButton = buttons.find(btn => btn.textContent?.includes("Expert"));

    if (expertButton) {
      fireEvent.click(expertButton);
    }

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("displays key programming languages", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("SQL")).toBeInTheDocument();
  });

  it("displays framework skills", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText(".NET")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("displays infrastructure and DevOps skills", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("CI/CD")).toBeInTheDocument();
    expect(screen.getByText("GitHub Actions")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
  });

  it("displays development tools", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(screen.getByText("VS Code")).toBeInTheDocument();
    expect(screen.getByText("Jest")).toBeInTheDocument();
  });

  it("displays skill level indicators", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("clears search when clicking clear button", () => {
    render(<SkillsEnhanced />);

    const searchInput = screen.getByPlaceholderText(/Search skills/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "TypeScript" } });

    expect(searchInput.value).toBe("TypeScript");

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearButton);

    expect(searchInput.value).toBe("");
  });

  it("shows skill details on hover", () => {
    render(<SkillsEnhanced />);

    const csharpSkill = screen.getByText("C#");
    fireEvent.mouseEnter(csharpSkill.closest('.group') || csharpSkill);

    expect(screen.getByText(/Primary backend language for enterprise applications/i)).toBeInTheDocument();
  });

  it("has proper responsive grid layout", () => {
    const { container } = render(<SkillsEnhanced />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });
});
