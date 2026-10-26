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
    expect(screen.getByRole("heading", { name: "Side Projects" })).toBeInTheDocument();
  });

  it("renders all 4 project cards", () => {
    const { container } = render(<Projects />);
    expect(container.querySelectorAll(".project-card")).toHaveLength(4);
  });

  it("links Hearth to its GitHub repository", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "Hearth" })).toBeInTheDocument();
    expect(screen.getByText(/dashboard for our future home NAS/i)).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /View Source/i });
    expect(links[0]).toHaveAttribute("href", "https://github.com/patlehmann1/homelab");
  });

  it("links fl-launches to its GitHub repository", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "fl-launches" })).toBeInTheDocument();
    expect(screen.getByText(/next rocket launches from Cape Canaveral/i)).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /View Source/i });
    expect(links[1]).toHaveAttribute("href", "https://github.com/patlehmann1/space_coast_fl_launches");
  });

  it("links daily-verse to its GitHub repository", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "daily-verse" })).toBeInTheDocument();
    expect(screen.getByText(/Prints a Bible verse/i)).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /View Source/i });
    expect(links[2]).toHaveAttribute("href", "https://github.com/patlehmann1/daily-verse");
  });

  it("links this site to its GitHub repository", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "This Site" })).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /View Source/i });
    expect(links[3]).toHaveAttribute("href", "https://github.com/patlehmann1/patlehmann1.github.io");
  });

  it("opens project links in a new tab safely", () => {
    render(<Projects />);

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders technology badges for each project", () => {
    const { container } = render(<Projects />);

    expect(container.querySelectorAll(".tech-badge").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Go")).toHaveLength(3);
    expect(screen.getAllByText("Homebrew")).toHaveLength(2);
  });
});
