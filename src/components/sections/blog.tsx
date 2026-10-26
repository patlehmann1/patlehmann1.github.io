"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons/pixel";
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Articles & Insights</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            Exploring SI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-3 -mx-3 px-3 pb-4 mb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:mb-12">
          {featuredPosts.map((post, index) => (
            <div key={post.slug} className="snap-start shrink-0 w-[85%] md:w-auto">
              <BlogCard post={post} index={index} isHomePage={true} />
            </div>
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