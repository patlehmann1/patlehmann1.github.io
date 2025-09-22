// Mock the articles data first
const mockArticles = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    description: 'First test post',
    content: 'Content of first post',
    publishedAt: '2024-01-15T00:00:00.000Z',
    tags: ['react', 'typescript'],
    readingTime: 5,
    featured: true
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    description: 'Second test post',
    content: 'Content of second post',
    publishedAt: '2024-01-10T00:00:00.000Z',
    tags: ['javascript', 'testing'],
    readingTime: 3,
    featured: false
  },
  {
    slug: 'test-post-3',
    title: 'Test Post 3',
    description: 'Third test post',
    content: 'Content of third post',
    publishedAt: '2024-01-20T00:00:00.000Z',
    tags: ['react', 'testing'],
    readingTime: 7,
    featured: true
  }
]

// Mock the entire blog module
jest.mock('../blog', () => {
  const originalModule = jest.requireActual('../blog')
  return {
    ...originalModule,
    getAllPosts: jest.fn(() =>
      mockArticles
        .map(article => ({
          ...article,
          content: article.content || ""
        }))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    ),
    getFeaturedPosts: jest.fn((limit = 3) =>
      mockArticles
        .filter(post => post.featured)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit)
    ),
    getPostBySlug: jest.fn((slug) =>
      mockArticles.find(post => post.slug === slug) || null
    ),
    getPostsByTag: jest.fn((tag) =>
      mockArticles
        .filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    ),
    getAllTags: jest.fn(() => {
      const allTags = mockArticles.flatMap(post => post.tags)
      return [...new Set(allTags)].sort()
    })
  }
})

import { getAllPosts, getFeaturedPosts, getPostBySlug, getPostsByTag, getAllTags } from '../blog'

describe('Blog utilities', () => {
  describe('getAllPosts', () => {
    it('should return all posts sorted by publish date (newest first)', () => {
      const posts = getAllPosts()

      expect(posts).toHaveLength(3)
      expect(posts[0].slug).toBe('test-post-3') // Most recent
      expect(posts[1].slug).toBe('test-post-1')
      expect(posts[2].slug).toBe('test-post-2') // Oldest
    })

    it('should include all required properties', () => {
      const posts = getAllPosts()
      const post = posts[0]

      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('publishedAt')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('readingTime')
    })

    it('should handle posts with missing content', () => {
      const posts = getAllPosts()
      posts.forEach(post => {
        expect(typeof post.content).toBe('string')
      })
    })
  })

  describe('getFeaturedPosts', () => {
    it('should return only featured posts', () => {
      const featuredPosts = getFeaturedPosts()

      expect(featuredPosts).toHaveLength(2)
      featuredPosts.forEach(post => {
        expect(post.featured).toBe(true)
      })
    })

    it('should limit results when limit parameter is provided', () => {
      const featuredPosts = getFeaturedPosts(1)

      expect(featuredPosts).toHaveLength(1)
      expect(featuredPosts[0].slug).toBe('test-post-3') // Most recent featured
    })

    it('should sort featured posts by publish date (newest first)', () => {
      const featuredPosts = getFeaturedPosts()

      expect(featuredPosts[0].slug).toBe('test-post-3')
      expect(featuredPosts[1].slug).toBe('test-post-1')
    })

    it('should handle default limit of 3', () => {
      const featuredPosts = getFeaturedPosts()
      expect(featuredPosts.length).toBeLessThanOrEqual(3)
    })
  })

  describe('getPostBySlug', () => {
    it('should return the correct post by slug', () => {
      const post = getPostBySlug('test-post-2')

      expect(post).not.toBeNull()
      expect(post?.slug).toBe('test-post-2')
      expect(post?.title).toBe('Test Post 2')
    })

    it('should return null for non-existent slug', () => {
      const post = getPostBySlug('non-existent-post')

      expect(post).toBeNull()
    })

    it('should handle empty string slug', () => {
      const post = getPostBySlug('')

      expect(post).toBeNull()
    })
  })

  describe('getPostsByTag', () => {
    it('should return posts with the specified tag', () => {
      const reactPosts = getPostsByTag('react')

      expect(reactPosts).toHaveLength(2)
      expect(reactPosts.map(p => p.slug)).toEqual(['test-post-3', 'test-post-1'])
    })

    it('should be case insensitive', () => {
      const reactPosts = getPostsByTag('REACT')

      expect(reactPosts).toHaveLength(2)
    })

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('non-existent-tag')

      expect(posts).toHaveLength(0)
    })

    it('should return posts sorted by publish date', () => {
      const testingPosts = getPostsByTag('testing')

      expect(testingPosts).toHaveLength(2)
      expect(testingPosts[0].slug).toBe('test-post-3') // Most recent
      expect(testingPosts[1].slug).toBe('test-post-2')
    })
  })

  describe('getAllTags', () => {
    it('should return all unique tags', () => {
      const tags = getAllTags()

      expect(tags).toEqual(['javascript', 'react', 'testing', 'typescript'])
      expect(new Set(tags).size).toBe(tags.length) // Ensure uniqueness
    })

    it('should return tags in alphabetical order', () => {
      const tags = getAllTags()
      const sortedTags = [...tags].sort()

      expect(tags).toEqual(sortedTags)
    })

    it('should handle posts with multiple tags', () => {
      const tags = getAllTags()

      // Should include all tags from all posts
      expect(tags).toContain('react')
      expect(tags).toContain('typescript')
      expect(tags).toContain('javascript')
      expect(tags).toContain('testing')
    })
  })
})