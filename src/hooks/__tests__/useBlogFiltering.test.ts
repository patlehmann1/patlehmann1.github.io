import { renderHook, act } from '@testing-library/react'
import { useBlogFiltering } from '../useBlogFiltering'
import { BlogPost } from '@/lib/types'

const mockPosts: BlogPost[] = [
  {
    slug: 'react-advanced' as BlogPost['slug'],
    title: 'Advanced React Patterns',
    description: 'Learn advanced React patterns for better code organization',
    content: 'Content about React patterns...',
    publishedAt: '2024-01-15',
    tags: ['react', 'typescript', 'frontend'],
    readingTime: 8,
    featured: true
  },
  {
    slug: 'javascript-fundamentals' as BlogPost['slug'],
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming',
    content: 'Content about JavaScript...',
    publishedAt: '2024-01-10',
    tags: ['javascript', 'programming'],
    readingTime: 5,
    featured: false
  },
  {
    slug: 'testing-strategies' as BlogPost['slug'],
    title: 'Testing Strategies',
    description: 'Effective testing strategies for modern web applications',
    content: 'Content about testing...',
    publishedAt: '2024-01-20',
    tags: ['testing', 'javascript', 'quality'],
    readingTime: 12,
    featured: true
  },
  {
    slug: 'css-grid-guide' as BlogPost['slug'],
    title: 'CSS Grid Complete Guide',
    description: 'A comprehensive guide to CSS Grid layout',
    content: 'Content about CSS Grid...',
    publishedAt: '2024-01-05',
    tags: ['css', 'frontend', 'design'],
    readingTime: 6,
    featured: false
  }
]

describe('useBlogFiltering', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    expect(result.current.selectedTag).toBe('')
    expect(result.current.searchQuery).toBe('')
    expect(result.current.filteredPosts).toEqual(mockPosts)
  })

  it('should filter posts by selected tag', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('react')
    })

    expect(result.current.selectedTag).toBe('react')
    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('react-advanced')
  })

  it('should filter posts by search query in title', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('JavaScript')
    })

    expect(result.current.searchQuery).toBe('JavaScript')
    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('javascript-fundamentals')
  })

  it('should filter posts by search query in description', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('testing strategies')
    })

    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('testing-strategies')
  })

  it('should be case insensitive for search queries', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('REACT')
    })

    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('react-advanced')
  })

  it('should filter by both tag and search query', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('javascript')
      result.current.setSearchQuery('testing')
    })

    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('testing-strategies')
  })

  it('should return empty array when both filters exclude all posts', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('react')
      result.current.setSearchQuery('css')
    })

    expect(result.current.filteredPosts).toHaveLength(0)
  })

  it('should clear all filters', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    // Set some filters
    act(() => {
      result.current.setSelectedTag('react')
      result.current.setSearchQuery('advanced')
    })

    expect(result.current.filteredPosts).toHaveLength(1)

    // Clear filters
    act(() => {
      result.current.clearFilters()
    })

    expect(result.current.selectedTag).toBe('')
    expect(result.current.searchQuery).toBe('')
    expect(result.current.filteredPosts).toEqual(mockPosts)
  })

  it('should handle empty posts array', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: [] }))

    expect(result.current.filteredPosts).toEqual([])

    act(() => {
      result.current.setSelectedTag('react')
      result.current.setSearchQuery('test')
    })

    expect(result.current.filteredPosts).toEqual([])
  })

  it('should handle empty tag filter correctly', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('')
    })

    expect(result.current.filteredPosts).toEqual(mockPosts)
  })

  it('should handle empty search query correctly', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('')
    })

    expect(result.current.filteredPosts).toEqual(mockPosts)
  })

  it('should handle non-existent tag', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('non-existent-tag')
    })

    expect(result.current.filteredPosts).toHaveLength(0)
  })

  it('should handle search query with no matches', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('xyznomatch')
    })

    expect(result.current.filteredPosts).toHaveLength(0)
  })

  it('should handle whitespace in search query', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('   ')
    })

    // The current implementation treats whitespace as a search query, so no posts match
    expect(result.current.filteredPosts).toHaveLength(0)
  })

  it('should memoize filtered results with same dependencies', () => {
    const { result, rerender } = renderHook(
      ({ posts }) => useBlogFiltering({ posts }),
      { initialProps: { posts: mockPosts } }
    )

    const initialFiltered = result.current.filteredPosts

    // Rerender with same props - should maintain reference equality
    rerender({ posts: mockPosts })

    expect(result.current.filteredPosts).toBe(initialFiltered)
  })

  it('should update filtered results when posts change', () => {
    const { result, rerender } = renderHook(
      ({ posts }) => useBlogFiltering({ posts }),
      { initialProps: { posts: mockPosts } }
    )

    expect(result.current.filteredPosts).toHaveLength(4)

    const newPosts = mockPosts.slice(0, 2)
    rerender({ posts: newPosts })

    expect(result.current.filteredPosts).toHaveLength(2)
  })

  it('should maintain filter state when posts change', () => {
    const { result, rerender } = renderHook(
      ({ posts }) => useBlogFiltering({ posts }),
      { initialProps: { posts: mockPosts } }
    )

    act(() => {
      result.current.setSelectedTag('javascript')
    })

    expect(result.current.selectedTag).toBe('javascript')

    const newPosts = [...mockPosts, {
      slug: 'new-js-post' as BlogPost['slug'],
      title: 'New JavaScript Post',
      description: 'A new post about JavaScript',
      content: 'Content...',
      publishedAt: '2024-02-01',
      tags: ['javascript', 'new'],
      readingTime: 4,
      featured: false
    }]

    rerender({ posts: newPosts })

    expect(result.current.selectedTag).toBe('javascript')
    expect(result.current.filteredPosts).toHaveLength(3) // Original 2 + new 1
  })

  it('should handle partial matches in title and description', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('guide')
    })

    expect(result.current.filteredPosts).toHaveLength(1)
    expect(result.current.filteredPosts[0].slug).toBe('css-grid-guide')
  })

  it('should handle special characters in search query', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSearchQuery('C++')
    })

    expect(result.current.filteredPosts).toHaveLength(0)
  })

  it('should reset filters when clearFilters is called multiple times', () => {
    const { result } = renderHook(() => useBlogFiltering({ posts: mockPosts }))

    act(() => {
      result.current.setSelectedTag('react')
      result.current.setSearchQuery('advanced')
    })

    act(() => {
      result.current.clearFilters()
    })

    act(() => {
      result.current.clearFilters()
    })

    expect(result.current.selectedTag).toBe('')
    expect(result.current.searchQuery).toBe('')
    expect(result.current.filteredPosts).toEqual(mockPosts)
  })
})