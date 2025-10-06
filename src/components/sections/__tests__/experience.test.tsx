import React from "react";
import { render, screen } from "@testing-library/react";
import { Experience } from "../experience";
import "@testing-library/jest-dom";

describe("Experience", () => {
  it("renders the experience section with proper id", () => {
    const { container } = render(<Experience />);
    const section = container.querySelector("section#experience");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { name: "Professional Experience" })).toBeInTheDocument();
  });

  it("displays subtitle text", () => {
    render(<Experience />);
    expect(screen.getByText(/6\+ years of adaptability across multiple teams, technologies, and business domains/i)).toBeInTheDocument();
  });

  it("displays 'Currently Working On' section", () => {
    render(<Experience />);

    expect(screen.getByText("🚀 Currently Working On")).toBeInTheDocument();
    expect(screen.getByText(/Pendo Analytics integration/i)).toBeInTheDocument();
    expect(screen.getByText(/International expansion readiness for UK\/Ireland markets/i)).toBeInTheDocument();
    expect(screen.getByText(/Championing AI-assisted development practices/i)).toBeInTheDocument();
  });

  it("displays Global Payments Inc. experience", () => {
    render(<Experience />);

    expect(screen.getByText("Global Payments Inc.")).toBeInTheDocument();
    const developers = screen.getAllByText("Software Developer");
    expect(developers.length).toBeGreaterThan(0);
    expect(screen.getByText("April 2022 - Present")).toBeInTheDocument();
  });

  it("displays Homes.com experience", () => {
    render(<Experience />);

    expect(screen.getByText("Homes.com")).toBeInTheDocument();
    const softwareDeveloperTexts = screen.getAllByText("Software Developer");
    expect(softwareDeveloperTexts.length).toBeGreaterThanOrEqual(2);
    const periods = screen.getAllByText("January 2019 - April 2022");
    expect(periods.length).toBeGreaterThan(0);
  });

  it("displays Genius Retail POS team details", () => {
    render(<Experience />);

    expect(screen.getByText("Genius Retail POS")).toBeInTheDocument();
    expect(screen.getByText("January 2025 - Present")).toBeInTheDocument();
    expect(screen.getByText(/Lead implementation of Pendo Analytics and OneTrust Cookie Consent/i)).toBeInTheDocument();
    expect(screen.getByText(/Integrated analytics into Angular microfrontends/i)).toBeInTheDocument();
  });

  it("displays Heartland Retail POS team details", () => {
    render(<Experience />);

    expect(screen.getByText("Heartland Retail POS")).toBeInTheDocument();
    expect(screen.getByText("January 2024 - January 2025")).toBeInTheDocument();
    expect(screen.getByText(/Maintained complex legacy codebase/i)).toBeInTheDocument();
  });

  it("displays Heartland Retail Online team details", () => {
    render(<Experience />);

    expect(screen.getByText("Heartland Retail Online")).toBeInTheDocument();
    expect(screen.getByText("April 2022 - January 2024")).toBeInTheDocument();
    expect(screen.getByText(/Developed features integrating e-commerce with POS/i)).toBeInTheDocument();
  });

  it("displays Homes.com Full-Stack Development team details", () => {
    render(<Experience />);

    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    expect(screen.getByText(/Transitioned from Node.js microservices to C#\/.NET/i)).toBeInTheDocument();
    expect(screen.getByText(/Built RESTful APIs and led migration from monolithic ColdFusion/i)).toBeInTheDocument();
  });

  it("displays adaptability summary at the bottom", () => {
    render(<Experience />);

    expect(screen.getByText("Adaptability in Action")).toBeInTheDocument();
    expect(screen.getByText(/Successfully navigated 3 different teams and tech stacks at Global Payments/i)).toBeInTheDocument();
  });

  it("renders timeline visual elements on desktop", () => {
    const { container } = render(<Experience />);
    const timeline = container.querySelector(".absolute.left-8.top-0.bottom-0");
    expect(timeline).toBeInTheDocument();
  });

  it("has proper responsive structure", () => {
    const { container } = render(<Experience />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-16");
    expect(section).toHaveClass("sm:py-20");
  });
});
