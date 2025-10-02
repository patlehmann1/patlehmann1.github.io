import { Metadata } from "next";
import { BlogPageClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Articles & Insights | Patrick Lehmann",
  description: "Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
  keywords: ["AI collaboration", "work-life balance", "faith-driven development", "software engineering", "programming", "blog"],
  openGraph: {
    title: "Articles & Insights | Patrick Lehmann",
    description: "Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Insights | Patrick Lehmann",
    description: "Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}