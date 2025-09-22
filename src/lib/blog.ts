import { BlogPost, BlogSlug } from './types';
import articlesData from '@/content/blog/articles.json';

export function getAllPosts(): BlogPost[] {
  return articlesData.map(article => ({
    ...article,
    slug: article.slug as BlogSlug,
    content: article.content || ""
  })).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getAllPosts()
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = getAllPosts().find(post => post.slug === slug);
  return post || null;
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const allTags = getAllPosts().flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
}

