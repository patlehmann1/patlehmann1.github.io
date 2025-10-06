import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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

jest.mock("@/components/ui/skeleton", () => ({
  BlogCardSkeleton: () => <div data-testid="blog-card-skeleton">Loading...</div>,
}));

describe("Blog", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

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
    expect(screen.getByText(/Exploring AI collaboration, work-life balance, faith-driven development/i)).toBeInTheDocument();
  });

  it("shows loading skeletons initially", () => {
    render(<Blog />);

    const skeletons = screen.getAllByTestId("blog-card-skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("loads and displays featured blog posts after delay", async () => {
    render(<Blog />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post 2")).toBeInTheDocument();
      expect(screen.getByText("Test Post 3")).toBeInTheDocument();
    });
  });

  it("renders exactly 3 blog cards after loading", async () => {
    render(<Blog />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByTestId("blog-card-test-post-1")).toBeInTheDocument();
      expect(screen.getByTestId("blog-card-test-post-2")).toBeInTheDocument();
      expect(screen.getByTestId("blog-card-test-post-3")).toBeInTheDocument();
    });
  });

  it("renders 'View All Articles' button with correct link", () => {
    render(<Blog />);

    const viewAllButton = screen.getByRole("link", { name: /View All Articles/i });
    expect(viewAllButton).toHaveAttribute("href", "/blog");
  });

  it("has proper grid layout structure", () => {
    const { container } = render(<Blog />);
    const gridContainer = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3");
    expect(gridContainer).toBeInTheDocument();
  });

  it("removes skeletons after posts load", async () => {
    render(<Blog />);

    expect(screen.getAllByTestId("blog-card-skeleton")).toHaveLength(3);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByTestId("blog-card-skeleton")).not.toBeInTheDocument();
    });
  });
});
