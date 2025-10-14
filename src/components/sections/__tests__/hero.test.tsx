import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "../hero";
import "@testing-library/jest-dom";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

jest.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
  createMotionVariants: () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }),
}));

jest.mock("@/components/ui/particle-background", () => ({
  ParticleBackground: () => <div data-testid="particle-background" />,
}));

jest.mock("@/components/ui/typewriter", () => ({
  Typewriter: ({ texts }: { texts: string[] }) => (
    <span data-testid="typewriter">{texts[0]}</span>
  ),
}));

describe("Hero", () => {
  it("renders hero section with main content", () => {
    render(<Hero />);

    expect(screen.getByText("Patrick")).toBeInTheDocument();
    expect(screen.getByText("Lehmann")).toBeInTheDocument();
  });

  it("displays the tagline text", () => {
    render(<Hero />);

    expect(screen.getByText(/Focused on enterprise analytics & international solutions/i)).toBeInTheDocument();
  });

  it("displays the introduction text", () => {
    render(<Hero />);

    expect(screen.getByText(/I've spent 6\+ years helping teams navigate technical changes/i)).toBeInTheDocument();
  });

  it("renders typewriter component with texts", () => {
    render(<Hero />);

    const typewriter = screen.getByTestId("typewriter");
    expect(typewriter).toBeInTheDocument();
    expect(typewriter).toHaveTextContent("Faith Driven Developer");
  });

  it("renders social media links", () => {
    render(<Hero />);

    const githubLink = screen.getByLabelText("GitHub Profile");
    const linkedinLink = screen.getByLabelText("LinkedIn Profile");

    expect(githubLink).toHaveAttribute("href", "https://github.com/patlehmann1");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/patlehmann");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders contact button with email link", () => {
    render(<Hero />);

    const contactButton = screen.getByRole("link", { name: /Let's Connect/i });
    expect(contactButton).toHaveAttribute("href", "mailto:contact@patricklehmann.io");
  });

  it("renders particle background component", () => {
    render(<Hero />);

    expect(screen.getByTestId("particle-background")).toBeInTheDocument();
  });

  it("has proper section structure", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("min-h-screen");
    expect(section).toHaveClass("relative");
    expect(section).toHaveClass("overflow-hidden");
  });
});
