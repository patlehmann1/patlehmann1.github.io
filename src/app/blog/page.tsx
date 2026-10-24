import { Metadata } from "next";
import { BlogPageClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Articles & Insights | Patrick Lehmann",
  description: "Exploring SI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
  keywords: ["SI collaboration", "work-life balance", "faith-driven development", "software engineering", "programming", "blog"],
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Articles & Insights | Patrick Lehmann",
    description: "Exploring SI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
    type: "website",
    url: "/blog/",
    siteName: "Patrick Lehmann",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Patrick Lehmann - Articles & Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Insights | Patrick Lehmann",
    description: "Exploring SI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}