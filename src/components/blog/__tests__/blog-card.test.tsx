import React from 'react'
import { render, screen } from '@testing-library/react'
import { BlogCard } from '../blog-card'
import { BlogPost } from '@/lib/types'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    article: function MotionArticle(props: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
      // Extract only the props we want for the HTML element
      const { children, className } = props
      return <article className={className}>{children}</article>
    }
  }
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Calendar: ({ className }: { className?: string }) => (
    <div data-testid="calendar-icon" className={className}>
      Calendar
    </div>
  ),
  Clock: ({ className }: { className?: string }) => (
    <div data-testid="clock-icon" className={className}>
      Clock
    </div>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <div data-testid="arrow-right-icon" className={className}>
      ArrowRight
    </div>
  )
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock useReducedMotion hook
jest.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn(() => false),
  createMotionVariants: jest.fn(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }))
}))

const mockPost: BlogPost = {
  slug: 'test-blog-post' as BlogPost['slug'],
  title: 'Test Blog Post Title',
  description: 'This is a test blog post description that should be displayed in the card.',
  content: 'Full content of the blog post...',
  publishedAt: '2024-01-15',
  tags: ['react', 'typescript', 'testing'],
  readingTime: 5,
  featured: true
}

describe('BlogCard', () => {
  it('should render blog post information correctly', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description that should be displayed in the card.')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('should render formatted publish date', () => {
    render(<BlogCard post={mockPost} />)

    // Date should be formatted as "Jan 15, 2024" or similar based on locale
    expect(screen.getByText(/Jan \d{1,2}, 2024/)).toBeInTheDocument()
  })

  it('should render all tags', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('should render icons correctly', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument()
  })

  it('should render correct links to blog post', () => {
    render(<BlogCard post={mockPost} />)

    const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' })
    const readMoreLink = screen.getByRole('link', { name: 'Read Article ArrowRight' })

    expect(titleLink).toHaveAttribute('href', '/blog/test-blog-post')
    expect(readMoreLink).toHaveAttribute('href', '/blog/test-blog-post')
  })

  it('should use h2 heading by default', () => {
    render(<BlogCard post={mockPost} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Blog Post Title')
  })

  it('should use h3 heading when isHomePage is true', () => {
    render(<BlogCard post={mockPost} isHomePage={true} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Blog Post Title')
  })

  it('should handle different date formats', () => {
    const postWithTimestamp = {
      ...mockPost,
      publishedAt: '2024-01-15T10:30:00Z'
    }

    render(<BlogCard post={postWithTimestamp} />)

    expect(screen.getByText(/Jan \d{1,2}, 2024/)).toBeInTheDocument()
  })

  it('should handle post with no tags', () => {
    const postWithNoTags = {
      ...mockPost,
      tags: []
    }

    render(<BlogCard post={postWithNoTags} />)

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description that should be displayed in the card.')).toBeInTheDocument()
  })

  it('should handle post with single tag', () => {
    const postWithSingleTag = {
      ...mockPost,
      tags: ['react']
    }

    render(<BlogCard post={postWithSingleTag} />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.queryByText('typescript')).not.toBeInTheDocument()
  })

  it('should handle very long title', () => {
    const postWithLongTitle = {
      ...mockPost,
      title: 'This is a very long blog post title that might need to be truncated in the UI to fit properly in the card layout'
    }

    render(<BlogCard post={postWithLongTitle} />)

    expect(screen.getByText('This is a very long blog post title that might need to be truncated in the UI to fit properly in the card layout')).toBeInTheDocument()
  })

  it('should handle very long description', () => {
    const postWithLongDescription = {
      ...mockPost,
      description: 'This is a very long description that goes on and on and should be truncated with the line-clamp CSS class to ensure it does not break the card layout and maintains a consistent appearance across all blog cards in the grid.'
    }

    render(<BlogCard post={postWithLongDescription} />)

    expect(screen.getByText('This is a very long description that goes on and on and should be truncated with the line-clamp CSS class to ensure it does not break the card layout and maintains a consistent appearance across all blog cards in the grid.')).toBeInTheDocument()
  })

  it('should handle different reading times', () => {
    const postWithDifferentReadingTime = {
      ...mockPost,
      readingTime: 15
    }

    render(<BlogCard post={postWithDifferentReadingTime} />)

    expect(screen.getByText('15 min read')).toBeInTheDocument()
  })

  it('should handle zero reading time', () => {
    const postWithZeroReadingTime = {
      ...mockPost,
      readingTime: 0
    }

    render(<BlogCard post={postWithZeroReadingTime} />)

    expect(screen.getByText('0 min read')).toBeInTheDocument()
  })

  it('should handle custom index prop', () => {
    render(<BlogCard post={mockPost} index={3} />)

    // The component should render normally with custom index
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(<BlogCard post={mockPost} />)

    const article = container.querySelector('article')
    expect(article).toHaveClass('group')
    expect(article).toHaveClass('bg-card')
    expect(article).toHaveClass('border')
    expect(article).toHaveClass('rounded-lg')
    expect(article).toHaveClass('overflow-hidden')
    expect(article).toHaveClass('shadow-warm')
  })

  it('should handle posts with special characters in slug', () => {
    const postWithSpecialSlug = {
      ...mockPost,
      slug: 'post-with-special-chars-123' as BlogPost['slug']
    }

    render(<BlogCard post={postWithSpecialSlug} />)

    const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' })
    expect(titleLink).toHaveAttribute('href', '/blog/post-with-special-chars-123')
  })

  it('should handle tags with special characters', () => {
    const postWithSpecialTags = {
      ...mockPost,
      tags: ['C++', 'Node.js', 'TypeScript 5.0']
    }

    render(<BlogCard post={postWithSpecialTags} />)

    expect(screen.getByText('C++')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript 5.0')).toBeInTheDocument()
  })

  it('should handle edge case dates', () => {
    const postWithEdgeDate = {
      ...mockPost,
      publishedAt: '2024-12-31'
    }

    render(<BlogCard post={postWithEdgeDate} />)

    expect(screen.getByText(/Dec \d{1,2}, 2024/)).toBeInTheDocument()
  })

  it('should maintain accessibility structure', () => {
    render(<BlogCard post={mockPost} />)

    // Check for semantic article element
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()

    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()

    // Check for proper link structure
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) // Title link and "Read Article" link
  })

  it('should handle empty content gracefully', () => {
    const postWithEmptyContent = {
      ...mockPost,
      content: ''
    }

    render(<BlogCard post={postWithEmptyContent} />)

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description that should be displayed in the card.')).toBeInTheDocument()
  })

  it('should render button with correct variant and size', () => {
    render(<BlogCard post={mockPost} />)

    const button = screen.getByRole('link', { name: /Read Article/ })
    expect(button).toHaveClass('hover:bg-primary/10')
    expect(button).toHaveClass('transition-colors')
  })

  it('should handle featured and non-featured posts consistently', () => {
    const nonFeaturedPost = {
      ...mockPost,
      featured: false
    }

    render(<BlogCard post={nonFeaturedPost} />)

    // Should render the same content regardless of featured status
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description that should be displayed in the card.')).toBeInTheDocument()
  })

  it('should handle reduced motion preference', () => {
    const { useReducedMotion } = require('@/hooks/useReducedMotion')

    // Mock reduced motion preference as true
    useReducedMotion.mockReturnValueOnce(true)

    render(<BlogCard post={mockPost} index={2} />)

    // Should render normally even with reduced motion
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description that should be displayed in the card.')).toBeInTheDocument()
  })

  it('should handle animation index correctly', () => {
    render(<BlogCard post={mockPost} index={3} />)

    // Should render with custom index (used for animation delay)
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
  })
})