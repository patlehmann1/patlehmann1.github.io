import React from "react";
import { render, screen } from "@testing-library/react";
import { About } from "../about";
import "@testing-library/jest-dom";

jest.mock("@/components/ui/music-player", () => ({
  MusicPlayer: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="music-player">
      <span>{title}</span>
      <span>{description}</span>
    </div>
  ),
}));

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
    expect(screen.getByText(/Adaptable full-stack engineer who thrives in dynamic environments/i)).toBeInTheDocument();
  });

  it("renders 'The Art of Adaptation' section", () => {
    render(<About />);
    expect(screen.getByText("The Art of Adaptation")).toBeInTheDocument();
  });

  it("displays experience description", () => {
    render(<About />);
    expect(screen.getByText(/Over 6\+ years, I've learned that the best engineers adapt quickly to change/i)).toBeInTheDocument();
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

  it("displays disc golf connection section", () => {
    render(<About />);
    expect(screen.getByText("The Disc Golf Connection")).toBeInTheDocument();
    expect(screen.getByText(/Disc golf taught me patience and precision/i)).toBeInTheDocument();
  });

  it("displays developer lifestyle section", () => {
    render(<About />);
    expect(screen.getByText("Optimizing the Developer Lifestyle")).toBeInTheDocument();
    expect(screen.getByText(/meal prepping for sustained energy/i)).toBeInTheDocument();
  });

  it("renders music player component", () => {
    render(<About />);
    const musicPlayer = screen.getByTestId("music-player");
    expect(musicPlayer).toBeInTheDocument();
    expect(musicPlayer).toHaveTextContent("Lehmann Dev Mix");
  });

  it("displays 'What Drives Me' section with all items", () => {
    render(<About />);

    expect(screen.getByText("What Drives Me")).toBeInTheDocument();
    expect(screen.getByText(/Living out my Christian faith through work and service/i)).toBeInTheDocument();
    expect(screen.getByText(/Solving complex problems with elegant solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Mentoring teams through technological transitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Building systems that scale and adapt/i)).toBeInTheDocument();
    expect(screen.getByText(/Championing modern development practices/i)).toBeInTheDocument();
  });

  it("displays quick stats section", () => {
    render(<About />);

    expect(screen.getByText("Quick Stats")).toBeInTheDocument();
    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Team Transitions")).toBeInTheDocument();
    expect(screen.getByText("∞")).toBeInTheDocument();
    expect(screen.getByText("Disc Golf Rounds")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Remote Ready")).toBeInTheDocument();
  });

  it("has proper grid layout structure", () => {
    const { container } = render(<About />);
    const gridContainer = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-3");
    expect(gridContainer).toBeInTheDocument();
  });
});
