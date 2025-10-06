import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Contact } from "../contact";
import "@testing-library/jest-dom";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

jest.mock("@/components/ui/toast", () => ({
  Toast: ({ message, isVisible }: { message: string; isVisible: boolean }) =>
    isVisible ? <div data-testid="toast">{message}</div> : null,
}));

describe("Contact", () => {
  it("renders the contact section with proper id", () => {
    const { container } = render(<Contact />);
    const section = container.querySelector("section#contact");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: "Get In Touch" })).toBeInTheDocument();
  });

  it("displays introduction text", () => {
    render(<Contact />);
    expect(screen.getByText(/I enjoy connecting with fellow developers, discussing technical challenges/i)).toBeInTheDocument();
  });

  it("displays 'Let's Talk Code' section", () => {
    render(<Contact />);
    expect(screen.getByText("Let's Talk Code")).toBeInTheDocument();
    expect(screen.getByText(/Got a tricky legacy system that needs untangling/i)).toBeInTheDocument();
  });

  it("displays all contact links", () => {
    render(<Contact />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("contact@patricklehmann.io")).toBeInTheDocument();

    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("linkedin.com/in/patlehmann")).toBeInTheDocument();

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("github.com/patlehmann1")).toBeInTheDocument();
  });

  it("renders email link with mailto href", () => {
    render(<Contact />);

    const emailLink = screen.getByRole("link", { name: /Email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:contact@patricklehmann.io");
  });

  it("renders LinkedIn link with correct href", () => {
    render(<Contact />);

    const linkedInLink = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedInLink).toHaveAttribute("href", "https://linkedin.com/in/patlehmann");
    expect(linkedInLink).toHaveAttribute("target", "_blank");
    expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders GitHub link with correct href", () => {
    render(<Contact />);

    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/patlehmann1");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays location information", () => {
    render(<Contact />);

    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Palm Bay, FL")).toBeInTheDocument();
  });

  it("displays timezone information", () => {
    render(<Contact />);

    expect(screen.getByText("Time Zone")).toBeInTheDocument();
    expect(screen.getByText("EST (UTC-5)")).toBeInTheDocument();
  });

  it("renders 'Get In Touch' button with email link", () => {
    render(<Contact />);

    const getInTouchButton = screen.getByRole("link", { name: /Get In Touch/i });
    expect(getInTouchButton).toHaveAttribute("href", "mailto:contact@patricklehmann.io");
  });

  it("displays footer text about tech stack", () => {
    render(<Contact />);

    expect(screen.getByText(/Built with Next.js, TypeScript, and Tailwind CSS/i)).toBeInTheDocument();
    expect(screen.getByText(/Demonstrating modern development practices/i)).toBeInTheDocument();
  });

  it("copies email to clipboard when copy button clicked", async () => {
    render(<Contact />);

    const copyButton = screen.getByLabelText("Copy Email");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("contact@patricklehmann.io");
    });
  });

  it("shows toast message when copy succeeds", async () => {
    render(<Contact />);

    const copyButton = screen.getByLabelText("Copy Email");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByTestId("toast")).toBeInTheDocument();
      expect(screen.getByText("Email copied!")).toBeInTheDocument();
    });
  });

  it("shows check icon after successful copy", async () => {
    const { container } = render(<Contact />);

    const copyButton = screen.getByLabelText("Copy Email");
    fireEvent.click(copyButton);

    await waitFor(() => {
      const checkIcons = container.querySelectorAll('.text-green-600');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  it("has proper grid layout structure", () => {
    const { container } = render(<Contact />);
    const gridContainer = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
  });
});
