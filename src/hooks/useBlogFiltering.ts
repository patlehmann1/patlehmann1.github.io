import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/types";

interface UseBlogFilteringOptions {
  posts: BlogPost[];
}

interface UseBlogFilteringReturn {
  filteredPosts: BlogPost[];
  selectedTag: string;
  searchQuery: string;
  setSelectedTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

/**
 * Custom hook for filtering blog posts by search query and tags
 *
 * @param options - Configuration object containing the posts to filter
 * @returns Object containing filtered posts and filter controls
 */
export function useBlogFiltering({ posts }: UseBlogFilteringOptions): UseBlogFilteringReturn {
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSelectedTag("");
    setSearchQuery("");
  };

  return {
    filteredPosts,
    selectedTag,
    searchQuery,
    setSelectedTag,
    setSearchQuery,
    clearFilters,
  };
}