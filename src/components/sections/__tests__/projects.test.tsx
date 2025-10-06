import React from "react";
import { render, screen } from "@testing-library/react";
import { Projects } from "../projects";
import "@testing-library/jest-dom";

describe("Projects", () => {
  it("renders the projects section with proper id", () => {
    const { container } = render(<Projects />);
    const section = container.querySelector("section#projects");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { name: "Key Projects" })).toBeInTheDocument();
  });

  it("displays subtitle text", () => {
    render(<Projects />);
    expect(screen.getByText(/Professional achievements showcasing technical leadership and business impact/i)).toBeInTheDocument();
  });

  it("renders all 4 project cards", () => {
    const { container } = render(<Projects />);
    const projectCards = container.querySelectorAll(".project-card");
    expect(projectCards).toHaveLength(4);
  });

  it("displays Enterprise Analytics Integration project", () => {
    render(<Projects />);

    expect(screen.getByText("Enterprise Analytics Integration")).toBeInTheDocument();
    expect(screen.getByText(/Led full-stack implementation of Pendo Analytics/i)).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText(/Enhanced user experience tracking across entire platform/i)).toBeInTheDocument();
  });

  it("displays E-commerce POS Integration Platform project", () => {
    render(<Projects />);

    expect(screen.getByText("E-commerce POS Integration Platform")).toBeInTheDocument();
    expect(screen.getByText(/Developed comprehensive features integrating e-commerce systems/i)).toBeInTheDocument();
    expect(screen.getByText("2022-2024")).toBeInTheDocument();
    expect(screen.getByText(/Streamlined retail operations for thousands of merchants/i)).toBeInTheDocument();
  });

  it("displays Legacy System Modernization project", () => {
    render(<Projects />);

    expect(screen.getByText("Legacy System Modernization")).toBeInTheDocument();
    expect(screen.getByText(/Architected and led migration from monolithic ColdFusion system/i)).toBeInTheDocument();
    expect(screen.getByText("2019-2021")).toBeInTheDocument();
    expect(screen.getByText(/Reduced system complexity and improved scalability/i)).toBeInTheDocument();
  });

  it("displays Legacy Codebase Maintenance project", () => {
    render(<Projects />);

    expect(screen.getByText("Legacy Codebase Maintenance")).toBeInTheDocument();
    expect(screen.getByText(/Maintained and enhanced complex legacy system with React.js class components/i)).toBeInTheDocument();
    expect(screen.getByText("2024-2025")).toBeInTheDocument();
    expect(screen.getByText(/Ensured system stability while managing technical debt/i)).toBeInTheDocument();
  });

  it("displays company names with Users icon", () => {
    render(<Projects />);

    const globalPaymentsElements = screen.getAllByText("Global Payments Inc.");
    expect(globalPaymentsElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Homes.com")).toBeInTheDocument();
  });

  it("renders technology badges for each project", () => {
    const { container } = render(<Projects />);

    const techBadges = container.querySelectorAll(".tech-badge");
    expect(techBadges.length).toBeGreaterThan(0);

    const angularBadges = screen.getAllByText("Angular");
    expect(angularBadges.length).toBeGreaterThan(0);
    const typescriptBadges = screen.getAllByText("TypeScript");
    expect(typescriptBadges.length).toBeGreaterThan(0);
    expect(screen.getByText("C#/.NET")).toBeInTheDocument();
    const nodejsBadges = screen.getAllByText("Node.js");
    expect(nodejsBadges.length).toBeGreaterThan(0);
  });

  it("displays key highlights for each project", () => {
    const { container } = render(<Projects />);

    const highlightDots = container.querySelectorAll(".highlight-dot");
    expect(highlightDots.length).toBeGreaterThan(0);

    expect(screen.getByText(/Full-stack implementation from UI to database/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend to full-stack role evolution/i)).toBeInTheDocument();
    expect(screen.getByText(/Monolithic to microservices transformation/i)).toBeInTheDocument();
  });

  it("displays Business Impact sections", () => {
    render(<Projects />);

    const businessImpactLabels = screen.getAllByText("Business Impact");
    expect(businessImpactLabels.length).toBe(4);
  });

  it("renders call-to-action section at the bottom", () => {
    render(<Projects />);

    expect(screen.getByText("Consistent Value Delivery")).toBeInTheDocument();
    expect(screen.getByText(/Each project demonstrates my ability to adapt to new technologies/i)).toBeInTheDocument();
  });

  it("renders contact button with email link", () => {
    render(<Projects />);

    const contactButton = screen.getByRole("link", { name: /Discuss Your Next Project/i });
    expect(contactButton).toHaveAttribute("href", "mailto:contact@patricklehmann.io");
  });

  it("has proper grid layout for projects", () => {
    const { container } = render(<Projects />);
    const gridContainer = container.querySelector(".grid.lg\\:grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
  });
});
