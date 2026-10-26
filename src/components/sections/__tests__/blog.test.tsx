import React from "react";
import { render, screen } from "@testing-library/react";
import { Blog } from "../blog";
import "@testing-library/jest-dom";

jest.mock("@/lib/blog", () => ({
  getFeaturedPosts: jest.fn(() => [
    {
      slug: "test-post-1",
      title: "Test Post 1",
      excerpt: "Test excerpt 1",
      date: "2025-01-01",
      readingTime: 5,
      tags: ["TypeScript", "Testing"],
      featured: true,
    },
    {
      slug: "test-post-2",
      title: "Test Post 2",
      excerpt: "Test excerpt 2",
      date: "2025-01-02",
      readingTime: 3,
      tags: ["React"],
      featured: true,
    },
    {
      slug: "test-post-3",
      title: "Test Post 3",
      excerpt: "Test excerpt 3",
      date: "2025-01-03",
      readingTime: 7,
      tags: ["Node.js"],
      featured: true,
    },
  ]),
}));

jest.mock("@/components/blog/blog-card", () => ({
  BlogCard: ({ post }: { post: { slug: string; title: string; excerpt: string } }) => (
    <div data-testid={`blog-card-${post.slug}`}>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  ),
}));

describe("Blog", () => {
  it("renders the blog section with proper id", () => {
    const { container } = render(<Blog />);
    const section = container.querySelector("section#blog");
    expect(section).toBeInTheDocument();
  });

  it("displays section heading", () => {
    render(<Blog />);
    expect(screen.getByRole("heading", { name: "Articles & Insights" })).toBeInTheDocument();
  });

  it("displays subtitle text", () => {
    render(<Blog />);
    expect(screen.getByText(/Exploring SI collaboration, work-life balance, faith-driven development/i)).toBeInTheDocument();
  });

  it("renders the featured blog posts immediately", () => {
    render(<Blog />);

    expect(screen.getByTestId("blog-card-test-post-1")).toBeInTheDocument();
    expect(screen.getByTestId("blog-card-test-post-2")).toBeInTheDocument();
    expect(screen.getByTestId("blog-card-test-post-3")).toBeInTheDocument();
  });

  it("renders 'View All Articles' button with correct link", () => {
    render(<Blog />);

    const viewAllButton = screen.getByRole("link", { name: /View All Articles/i });
    expect(viewAllButton).toHaveAttribute("href", "/blog");
  });

  it("swipes horizontally on mobile and switches to a grid on larger screens", () => {
    const { container } = render(<Blog />);
    const row = container.querySelector(".overflow-x-auto.snap-x");
    expect(row).toHaveClass("md:grid", "md:grid-cols-2", "lg:grid-cols-3");
  });
});
