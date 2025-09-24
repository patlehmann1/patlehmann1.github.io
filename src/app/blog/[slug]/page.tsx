import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Patrick Lehmann",
      description: "The requested blog post could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://patricklehmann.io";
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = `${siteUrl}/og-image.jpg`; // You can add a default OG image later

  return {
    title: `${post.title} | Patrick Lehmann`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: "Patrick Lehmann" }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Patrick Lehmann - Software Developer",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: "@lehmann_dev2",
    },
    alternates: {
      canonical: postUrl,
    },
    other: {
      "article:author": "Patrick Lehmann",
      "article:published_time": post.publishedAt,
      "article:section": "Technology",
      "article:tag": post.tags.join(","),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}