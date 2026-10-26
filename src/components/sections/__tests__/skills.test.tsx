import React from "react";
import { render, screen } from "@testing-library/react";
import { Skills } from "../skills";
import "@testing-library/jest-dom";

describe("Skills", () => {
  it("renders the skills section with proper id", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("section#skills")).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<Skills />);
    expect(screen.getByRole("heading", { name: "Technical Skills" })).toBeInTheDocument();
  });

  it("displays every skill group", () => {
    render(<Skills />);

    for (const group of ["Languages", "Frameworks", "Data & APIs", "Infrastructure", "Tools", "Practices"]) {
      expect(screen.getByText(group)).toBeInTheDocument();
    }
  });

  it("lists the core skills as chips", () => {
    const { container } = render(<Skills />);

    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText(".NET")).toBeInTheDocument();
    expect(screen.getByText("SI-assisted development")).toBeInTheDocument();
    expect(container.querySelectorAll(".tech-badge").length).toBeGreaterThan(40);
  });

  it("pairs each group label with its skills in a description list", () => {
    const { container } = render(<Skills />);

    expect(container.querySelectorAll("dl dt")).toHaveLength(6);
    expect(container.querySelectorAll("dl dd")).toHaveLength(6);
  });
});
