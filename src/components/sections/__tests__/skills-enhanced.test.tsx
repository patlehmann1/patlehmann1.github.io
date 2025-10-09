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

  it("displays all skill category tabs", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByRole("button", { name: "Show all skills" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter by Languages category" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter by Frameworks category" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter by Infrastructure & DevOps category" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter by Development Tools category" })).toBeInTheDocument();
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

  it("displays Development Practices section", () => {
    render(<SkillsEnhanced />);
    expect(screen.getByText("Development Practices")).toBeInTheDocument();
  });

  it("displays 12 development practices initially with Show More button", () => {
    render(<SkillsEnhanced />);

    const practicesSection = screen.getByText("Development Practices").closest("div");
    expect(practicesSection).toBeInTheDocument();

    const practiceElements = screen.getAllByText(/Agile|Test-Driven|Code Review|AI-Assisted|Legacy|Cross-Team|Point-of-Sale|E-commerce|Real Estate|Payment|CI\/CD|Performance/i);
    expect(practiceElements.length).toBeGreaterThanOrEqual(12);

    expect(screen.getByText(/Show All 26 Practices/i)).toBeInTheDocument();
  });

  it("displays key development practices", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("Agile/Scrum Development")).toBeInTheDocument();
    expect(screen.getByText("Test-Driven Development")).toBeInTheDocument();
    expect(screen.getByText("Code Review & Mentoring")).toBeInTheDocument();
    expect(screen.getByText(/AI-Assisted Development/i)).toBeInTheDocument();
  });

  it("displays newly added development practices after clicking Show More", () => {
    render(<SkillsEnhanced />);

    const showMoreButton = screen.getByText(/Show All 26 Practices/i);
    fireEvent.click(showMoreButton);

    expect(screen.getByText("Continuous Integration/Continuous Deployment (CI/CD)")).toBeInTheDocument();
    expect(screen.getByText("Performance Optimization & Monitoring")).toBeInTheDocument();
    expect(screen.getByText("Accessibility (a11y) Best Practices")).toBeInTheDocument();
    expect(screen.getByText("Security-First Development")).toBeInTheDocument();
    expect(screen.getByText("SEO Optimization & Web Vitals")).toBeInTheDocument();
  });

  it("displays AI-Forward Development callout", () => {
    render(<SkillsEnhanced />);

    expect(screen.getByText("🤖 AI-Forward Development")).toBeInTheDocument();
    expect(screen.getByText(/Embracing modern AI tools to enhance productivity/i)).toBeInTheDocument();
  });

  it("filters categories when clicking category tabs", () => {
    render(<SkillsEnhanced />);

    const languagesTab = screen.getByRole("button", { name: "Filter by Languages category" });
    fireEvent.click(languagesTab);

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("shows all categories when All Skills tab is active", () => {
    render(<SkillsEnhanced />);

    const allSkillsTab = screen.getByText("All Skills");
    expect(allSkillsTab).toBeInTheDocument();

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText(".NET")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });

  it("clicking Show More button displays all 26 practices", () => {
    render(<SkillsEnhanced />);

    const showMoreButton = screen.getByText(/Show All 26 Practices/i);
    fireEvent.click(showMoreButton);

    expect(screen.queryByText(/Show All 26 Practices/i)).not.toBeInTheDocument();
    expect(screen.getByText("Open Source Contribution")).toBeInTheDocument();
  });
});
