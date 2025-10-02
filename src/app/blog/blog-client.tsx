"use client";

import { motion } from "framer-motion";
import { Search, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { useBlogFiltering } from "@/hooks/useBlogFiltering";
import { tagFilterButtonClasses } from "@/lib/ui-utils";

export function BlogPageClient() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const {
    filteredPosts,
    selectedTag,
    searchQuery,
    setSelectedTag,
    setSearchQuery,
  } = useBlogFiltering({ posts: allPosts });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles & Insights</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
              <Rss className="mr-2 h-4 w-4" />
              Subscribe to RSS
            </a>
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={tagFilterButtonClasses(!selectedTag)}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={tagFilterButtonClasses(selectedTag === tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No articles found matching your search criteria.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}