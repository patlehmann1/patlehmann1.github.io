"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/lib/blog";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";

export function Blog() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <section id="blog" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Articles & Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} isHomePage={true} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}