"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/types";
import { useReducedMotion, createMotionVariants } from "@/hooks/useReducedMotion";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  isHomePage?: boolean;
}

export function BlogCard({ post, index = 0, isHomePage = false }: BlogCardProps) {
  const HeadingTag = isHomePage ? "h3" : "h2";
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);

  return (
    <motion.article
      variants={motionVariants}
      initial="hidden"
      whileInView="visible"
      animate="visible"
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card border rounded-lg overflow-hidden shadow-warm hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readingTime} min read
          </div>
        </div>

        <HeadingTag className="text-xl font-semibold mb-3 line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </HeadingTag>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 transition-colors"
          asChild
        >
          <Link href={`/blog/${post.slug}`}>
            Read Article
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}