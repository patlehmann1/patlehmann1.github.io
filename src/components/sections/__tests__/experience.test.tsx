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
    expect(screen.getByText(/7\+ years building fintech and enterprise systems across payments, real estate, and e-commerce/i)).toBeInTheDocument();
  });

  it("displays 'Next Chapter' section for upcoming OPM role", () => {
    render(<Experience />);

    expect(screen.getByText("🚀 Next Chapter")).toBeInTheDocument();
    expect(screen.getByText(/Joining OPM as a Software Engineer through US Tech Force/i)).toBeInTheDocument();
    expect(screen.getByText(/Two-year federal initiative modernizing legacy IT systems/i)).toBeInTheDocument();
    expect(screen.getByText(/Bringing private-sector engineering practices into government/i)).toBeInTheDocument();
  });

  it("displays US Office of Personnel Management as upcoming", () => {
    render(<Experience />);

    expect(screen.getByText("US Office of Personnel Management")).toBeInTheDocument();
    expect(screen.getByText("Starting September 2026")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("US Tech Force")).toBeInTheDocument();
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
    expect(screen.getByText(/Implemented Pendo Analytics and OneTrust Cookie Consent across a portal serving 22,000\+ merchants/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Built RESTful APIs, contributed to migration from monolithic ColdFusion/i)).toBeInTheDocument();
  });

  it("displays impact summary at the bottom", () => {
    render(<Experience />);

    expect(screen.getByText("Consistent Impact Across Teams")).toBeInTheDocument();
    expect(screen.getByText(/7\+ years shipping production systems at Global Payments and Homes\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/joining OPM's US Tech Force to modernize federal systems/i)).toBeInTheDocument();
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
