import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    expect(screen.getByText(/From real estate and payments to federal retirement systems/i)).toBeInTheDocument();
  });

  it("displays US Office of Personnel Management as current role", () => {
    render(<Experience />);

    expect(screen.getByText("US Office of Personnel Management")).toBeInTheDocument();
    expect(screen.getAllByText("September 2026 - Present").length).toBeGreaterThan(0);
    expect(screen.getByText("Janus Team, Retirement Services Division")).toBeInTheDocument();
  });

  it("displays Global Payments Inc. experience", () => {
    render(<Experience />);

    expect(screen.getByText("Global Payments Inc.")).toBeInTheDocument();
    const developers = screen.getAllByText("Software Developer");
    expect(developers.length).toBeGreaterThan(0);
    expect(screen.getByText("April 2022 - August 2026")).toBeInTheDocument();
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
    expect(screen.getByText("January 2025 - August 2026")).toBeInTheDocument();
    expect(screen.getByText(/Implemented Pendo Analytics and OneTrust Cookie Consent across a portal serving 22,000\+ merchants/i)).toBeInTheDocument();
    expect(screen.getByText(/Served as team GitHub Copilot SME/i)).toBeInTheDocument();
  });

  it("displays Heartland Retail POS team details", () => {
    render(<Experience />);

    expect(screen.getByText("Heartland Retail POS")).toBeInTheDocument();
    expect(screen.getByText("January 2024 - January 2025")).toBeInTheDocument();
    expect(screen.getByText(/Maintained a complex legacy codebase/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Built RESTful APIs and contributed to the migration from a monolithic ColdFusion/i)).toBeInTheDocument();
  });

  it("hides earlier roles on small screens until expanded", () => {
    render(<Experience />);

    const homes = screen.getByText("Homes.com").closest(".relative");
    const heartland = screen.getByText("Heartland Retail POS").closest(".bg-card");
    const genius = screen.getByText("Genius Retail POS").closest(".bg-card");
    expect(homes).toHaveClass("hidden", "md:block");
    expect(heartland).toHaveClass("hidden", "md:block");
    expect(genius).not.toHaveClass("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Show Earlier Roles" }));

    expect(homes).not.toHaveClass("hidden");
    expect(heartland).not.toHaveClass("hidden");
    expect(screen.queryByRole("button", { name: "Show Earlier Roles" })).not.toBeInTheDocument();
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
