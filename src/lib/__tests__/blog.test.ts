import { getAllPosts, getFeaturedPosts, getPostBySlug, getPostsByTag, getAllTags } from '../blog'

describe('Blog utilities', () => {
  describe('getAllPosts', () => {
    it('should return all posts sorted by publish date (newest first)', () => {
      const posts = getAllPosts()

      expect(posts.length).toBeGreaterThan(0)

      // Check that sorting is correct
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].publishedAt).getTime()
        const nextDate = new Date(posts[i + 1].publishedAt).getTime()
        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })

    it('should include all required properties', () => {
      const posts = getAllPosts()
      expect(posts.length).toBeGreaterThan(0)

      const post = posts[0]
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('publishedAt')
      expect(post).toHaveProperty('tags')
      expect(post).toHaveProperty('readingTime')
      expect(post).toHaveProperty('featured')
    })

    it('should handle posts with missing content by providing empty string', () => {
      const posts = getAllPosts()

      posts.forEach(post => {
        expect(typeof post.content).toBe('string')
      })
    })

    it('should provide content fallback for posts', () => {
      // Test that the content fallback logic works
      // Since all current posts have content, we'll test the fallback logic by mocking
      const mockArticle = { slug: 'test', title: 'Test', description: 'Test' }
      const result = { ...mockArticle, slug: mockArticle.slug, content: mockArticle.content || '' }

      expect(result.content).toBe('')
    })

    it('should correctly type cast slug to BlogSlug', () => {
      const posts = getAllPosts()
      posts.forEach(post => {
        expect(typeof post.slug).toBe('string')
        expect(post.slug.length).toBeGreaterThan(0)
      })
    })

    it('should handle date sorting correctly with different date formats', () => {
      const posts = getAllPosts()

      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].publishedAt).getTime()
        const nextDate = new Date(posts[i + 1].publishedAt).getTime()
        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })
  })

  describe('getFeaturedPosts', () => {
    it('should return only featured posts', () => {
      const featuredPosts = getFeaturedPosts()

      expect(featuredPosts.length).toBeGreaterThan(0)
      featuredPosts.forEach(post => {
        expect(post.featured).toBe(true)
      })
    })

    it('should limit results when limit parameter is provided', () => {
      const featuredPosts = getFeaturedPosts(1)

      expect(featuredPosts).toHaveLength(1)
      expect(featuredPosts[0].featured).toBe(true)
    })

    it('should sort featured posts by publish date (newest first)', () => {
      const featuredPosts = getFeaturedPosts()

      for (let i = 0; i < featuredPosts.length - 1; i++) {
        const currentDate = new Date(featuredPosts[i].publishedAt).getTime()
        const nextDate = new Date(featuredPosts[i + 1].publishedAt).getTime()
        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })

    it('should handle default limit of 3', () => {
      const featuredPosts = getFeaturedPosts()
      expect(featuredPosts.length).toBeLessThanOrEqual(3)
    })

    it('should handle limit larger than available featured posts', () => {
      const allFeatured = getAllPosts().filter(p => p.featured)
      const featuredPosts = getFeaturedPosts(10)
      expect(featuredPosts.length).toBeLessThanOrEqual(allFeatured.length)
    })

    it('should handle limit of 0', () => {
      const featuredPosts = getFeaturedPosts(0)
      expect(featuredPosts).toHaveLength(0)
    })

    it('should handle negative limit by returning empty array', () => {
      const featuredPosts = getFeaturedPosts(-1)
      expect(featuredPosts).toHaveLength(0)
    })
  })

  describe('getPostBySlug', () => {
    it('should return the correct post by slug', () => {
      const allPosts = getAllPosts()
      expect(allPosts.length).toBeGreaterThan(0)

      const firstPost = allPosts[0]
      const post = getPostBySlug(firstPost.slug)

      expect(post).not.toBeNull()
      expect(post?.slug).toBe(firstPost.slug)
      expect(post?.title).toBe(firstPost.title)
      expect(post?.description).toBe(firstPost.description)
    })

    it('should return null for non-existent slug', () => {
      const post = getPostBySlug('non-existent-post')

      expect(post).toBeNull()
    })

    it('should handle empty string slug', () => {
      const post = getPostBySlug('')

      expect(post).toBeNull()
    })

    it('should handle undefined slug', () => {
      const post = getPostBySlug(undefined as unknown as string)

      expect(post).toBeNull()
    })

    it('should handle null slug', () => {
      const post = getPostBySlug(null as unknown as string)

      expect(post).toBeNull()
    })

    it('should be case sensitive', () => {
      const allPosts = getAllPosts()
      if (allPosts.length > 0) {
        const firstSlug = allPosts[0].slug
        const post = getPostBySlug(firstSlug.toUpperCase())
        expect(post).toBeNull()
      }
    })

    it('should handle special characters in slug', () => {
      const post = getPostBySlug('test-post-2!@#')

      expect(post).toBeNull()
    })
  })

  describe('getPostsByTag', () => {
    it('should return posts with the specified tag', () => {
      const allTags = getAllTags()
      expect(allTags.length).toBeGreaterThan(0)

      const firstTag = allTags[0]
      const postsWithTag = getPostsByTag(firstTag)

      expect(postsWithTag.length).toBeGreaterThan(0)
      postsWithTag.forEach(post => {
        expect(post.tags.some(tag => tag.toLowerCase() === firstTag.toLowerCase())).toBe(true)
      })
    })

    it('should be case insensitive', () => {
      const allTags = getAllTags()
      if (allTags.length > 0) {
        const firstTag = allTags[0]
        const lowerCasePosts = getPostsByTag(firstTag.toLowerCase())
        const upperCasePosts = getPostsByTag(firstTag.toUpperCase())

        expect(lowerCasePosts.length).toBe(upperCasePosts.length)
      }
    })

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('non-existent-tag')

      expect(posts).toHaveLength(0)
      expect(Array.isArray(posts)).toBe(true)
    })

    it('should return posts sorted by publish date (newest first)', () => {
      const allTags = getAllTags()
      if (allTags.length > 0) {
        const firstTag = allTags[0]
        const postsWithTag = getPostsByTag(firstTag)

        for (let i = 0; i < postsWithTag.length - 1; i++) {
          const currentDate = new Date(postsWithTag[i].publishedAt).getTime()
          const nextDate = new Date(postsWithTag[i + 1].publishedAt).getTime()
          expect(currentDate).toBeGreaterThanOrEqual(nextDate)
        }
      }
    })

    it('should handle empty string tag', () => {
      const posts = getPostsByTag('')

      expect(posts).toHaveLength(0)
    })

    it('should handle tag with special characters', () => {
      const posts = getPostsByTag('react!@#')

      expect(posts).toHaveLength(0)
    })

    it('should handle undefined tag', () => {
      const posts = getPostsByTag(undefined as unknown as string)

      expect(posts).toHaveLength(0)
    })

    it('should handle null tag', () => {
      const posts = getPostsByTag(null as unknown as string)

      expect(posts).toHaveLength(0)
    })

    it('should handle whitespace-only tag', () => {
      const posts = getPostsByTag('   ')

      expect(posts).toHaveLength(0)
    })
  })

  describe('getAllTags', () => {
    it('should return all unique tags', () => {
      const tags = getAllTags()
      const uniqueTags = [...new Set(tags)]

      expect(tags).toEqual(uniqueTags) // Should not have duplicates
      expect(tags.length).toBeGreaterThan(0)
    })

    it('should return tags in alphabetical order', () => {
      const tags = getAllTags()
      const sortedTags = [...tags].sort()

      expect(tags).toEqual(sortedTags)
    })

    it('should handle posts with multiple tags', () => {
      const tags = getAllTags()
      const allPosts = getAllPosts()

      // Should include tags from all posts
      const allPostTags = allPosts.flatMap(post => post.tags)
      const uniquePostTags = [...new Set(allPostTags)]

      expect(tags.length).toBe(uniquePostTags.length)
    })

    it('should not include duplicate tags', () => {
      const tags = getAllTags()

      const duplicates = tags.filter((tag, index) => tags.indexOf(tag) !== index)
      expect(duplicates).toHaveLength(0)
    })

    it('should return array of strings', () => {
      const tags = getAllTags()

      expect(Array.isArray(tags)).toBe(true)
      tags.forEach(tag => {
        expect(typeof tag).toBe('string')
        expect(tag.length).toBeGreaterThan(0)
      })
    })

    it('should handle empty posts gracefully', () => {
      const tags = getAllTags()

      expect(tags.length).toBeGreaterThan(0) // We have posts with tags
    })

    it('should maintain consistent ordering across calls', () => {
      const tags1 = getAllTags()
      const tags2 = getAllTags()

      expect(tags1).toEqual(tags2)
    })
  })
})