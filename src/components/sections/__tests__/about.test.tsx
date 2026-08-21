import React from "react";
import { render, screen } from "@testing-library/react";
import { About } from "../about";
import "@testing-library/jest-dom";

describe("About", () => {
  it("renders the about section with proper id", () => {
    const { container } = render(<About />);
    const section = container.querySelector("section#about");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
  });

  it("displays subtitle text", () => {
    render(<About />);
    expect(screen.getByText(/Full-stack engineer with 7\+ years across fintech, enterprise, and federal government systems/i)).toBeInTheDocument();
  });

  it("renders 'Impact at Scale' section", () => {
    render(<About />);
    expect(screen.getByText("Impact at Scale")).toBeInTheDocument();
  });

  it("displays experience description", () => {
    render(<About />);
    expect(screen.getByText(/I build production systems in C#\/.NET and TypeScript/i)).toBeInTheDocument();
  });

  it("mentions work at Global Payments", () => {
    render(<About />);
    expect(screen.getByText(/At Global Payments/i)).toBeInTheDocument();
  });

  it("displays 'Beyond Code' section with activities", () => {
    render(<About />);

    expect(screen.getByText("🎯 Beyond Code")).toBeInTheDocument();
    expect(screen.getByText(/Disc golf strategy & precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Christian study & apologetics/i)).toBeInTheDocument();
    expect(screen.getByText(/Family time with Hillary and Adeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Cross-team mentoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Process optimization/i)).toBeInTheDocument();
  });

  it("displays 'What Drives Me' section with all items", () => {
    render(<About />);

    expect(screen.getByText("What Drives Me")).toBeInTheDocument();
    expect(screen.getByText(/Living out my Christian faith through work and service/i)).toBeInTheDocument();
    expect(screen.getByText(/Solving complex problems with elegant solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Mentoring teams through technological transitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipping production systems that serve real businesses/i)).toBeInTheDocument();
    expect(screen.getByText(/Championing modern development practices/i)).toBeInTheDocument();
  });

  it("displays quick stats section", () => {
    render(<About />);

    expect(screen.getByText("Quick Stats")).toBeInTheDocument();
    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("22K+")).toBeInTheDocument();
    expect(screen.getByText("Merchants Served")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText("Faster PR Cycles")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Remote Ready")).toBeInTheDocument();
  });

  it("has proper grid layout structure", () => {
    const { container } = render(<About />);
    const gridContainer = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-3");
    expect(gridContainer).toBeInTheDocument();
  });
});
