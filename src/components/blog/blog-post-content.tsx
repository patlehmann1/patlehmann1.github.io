"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": "Patrick Lehmann",
      "url": "https://patricklehmann.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Patrick Lehmann"
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "keywords": post.tags.join(", "),
    "articleSection": "Technology",
    "inLanguage": "en-US",
    "wordCount": post.content.split(" ").length,
    "timeRequired": `PT${post.readingTime}M`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://patricklehmann.com/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-none"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 className="text-2xl font-bold mb-4 mt-8 text-foreground leading-tight">{children}</h1>,
              h2: ({children}) => <h2 className="text-xl font-bold mb-4 mt-8 text-foreground leading-tight">{children}</h2>,
              h3: ({children}) => <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground leading-tight">{children}</h3>,
              p: ({children}) => <p className="mb-4 leading-6 text-foreground">{children}</p>,
              ul: ({children}) => <ul className="mb-4 pl-6 space-y-1 list-disc">{children}</ul>,
              ol: ({children}) => <ol className="mb-4 pl-6 space-y-1 list-decimal">{children}</ol>,
              li: ({children}) => <li className="text-foreground leading-6">{children}</li>,
              strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
              em: ({children}) => <em className="italic text-foreground">{children}</em>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12"
        >
          <NewsletterSignup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Thanks for reading!</h3>
              <p className="text-muted-foreground">
                Questions or feedback? Feel free to reach out.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/#contact">
                  Get in Touch
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">
                  More Articles
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}