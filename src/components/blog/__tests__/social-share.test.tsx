import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SocialShare } from '../social-share'
import { BlogPost } from '@/lib/types'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv(props: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
      const { children, className } = props
      return <div className={className}>{children}</div>
    }
  }
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Share2: ({ className }: { className?: string }) => (
    <div data-testid="share2-icon" className={className}>
      Share2
    </div>
  )
}))

// Mock custom icons
jest.mock('@/components/ui/icons/facebook-icon', () => ({
  FacebookIcon: ({ className }: { className?: string }) => (
    <div data-testid="facebook-icon" className={className}>
      Facebook
    </div>
  )
}))

jest.mock('@/components/ui/icons/x-icon', () => ({
  XIcon: ({ className }: { className?: string }) => (
    <div data-testid="x-icon" className={className}>
      X
    </div>
  )
}))

jest.mock('@/components/ui/icons/linkedin-icon', () => ({
  LinkedInIcon: ({ className }: { className?: string }) => (
    <div data-testid="linkedin-icon" className={className}>
      LinkedIn
    </div>
  )
}))

const mockPost: BlogPost = {
  slug: 'test-blog-post' as BlogPost['slug'],
  title: 'Test Blog Post Title',
  description: 'This is a test blog post description for social sharing.',
  content: 'Full content of the blog post...',
  publishedAt: '2024-01-15',
  tags: ['react', 'typescript', 'testing'],
  readingTime: 5,
  featured: true
}

// Mock window.open
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true
})

describe('SocialShare', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear()
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('should render social share component with all elements', () => {
    render(<SocialShare post={mockPost} />)

    expect(screen.getByText('Share This Article')).toBeInTheDocument()
    expect(screen.getByText('Found this helpful? Share it with your network to help others discover it too.')).toBeInTheDocument()
    expect(screen.getByTestId('share2-icon')).toBeInTheDocument()

    // Check all social media buttons
    expect(screen.getByRole('button', { name: /facebook/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument()
  })

  it('should render all social media icons', () => {
    render(<SocialShare post={mockPost} />)

    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument()
    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
  })

  it('should open Facebook share URL when Facebook button is clicked', () => {
    render(<SocialShare post={mockPost} />)

    const facebookButton = screen.getByRole('button', { name: /facebook/i })
    fireEvent.click(facebookButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpatricklehmann.io%2Fblog%2Ftest-blog-post',
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should open X share URL when X button is clicked', () => {
    render(<SocialShare post={mockPost} />)

    const xButton = screen.getByRole('button', { name: /x/i })
    fireEvent.click(xButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fpatricklehmann.io%2Fblog%2Ftest-blog-post&text=Test%20Blog%20Post%20Title&via=lehmann_dev2',
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should open LinkedIn share URL when LinkedIn button is clicked', () => {
    render(<SocialShare post={mockPost} />)

    const linkedinButton = screen.getByRole('button', { name: /linkedin/i })
    fireEvent.click(linkedinButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fpatricklehmann.io%2Fblog%2Ftest-blog-post',
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should use environment site URL when available', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    render(<SocialShare post={mockPost} />)

    const facebookButton = screen.getByRole('button', { name: /facebook/i })
    fireEvent.click(facebookButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fblog%2Ftest-blog-post',
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should properly encode URL components', () => {
    const postWithSpecialChars = {
      ...mockPost,
      title: 'Test & Title with "Quotes" and #Hashtags',
      description: 'Description with special chars: <>&"\''
    }

    render(<SocialShare post={postWithSpecialChars} />)

    const xButton = screen.getByRole('button', { name: /x/i })
    fireEvent.click(xButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('text=Test%20%26%20Title%20with%20%22Quotes%22%20and%20%23Hashtags'),
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should handle different post slugs correctly', () => {
    const postWithDifferentSlug = {
      ...mockPost,
      slug: 'my-awesome-post-123' as BlogPost['slug']
    }

    render(<SocialShare post={postWithDifferentSlug} />)

    const facebookButton = screen.getByRole('button', { name: /facebook/i })
    fireEvent.click(facebookButton)

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpatricklehmann.io%2Fblog%2Fmy-awesome-post-123',
      '_blank',
      'noopener,noreferrer,width=600,height=600'
    )
  })

  it('should apply custom className when provided', () => {
    const { container } = render(<SocialShare post={mockPost} className="custom-social-share" />)

    const socialShareDiv = container.firstChild
    expect(socialShareDiv).toHaveClass('custom-social-share')
  })

  it('should have proper CSS classes for styling', () => {
    const { container } = render(<SocialShare post={mockPost} />)

    const socialShareDiv = container.firstChild
    expect(socialShareDiv).toHaveClass('bg-primary/5', 'border', 'border-primary/20', 'rounded-lg', 'p-6')
  })

  it('should have hover effects on buttons', () => {
    render(<SocialShare post={mockPost} />)

    const facebookButton = screen.getByRole('button', { name: /facebook/i })
    const xButton = screen.getByRole('button', { name: /x/i })
    const linkedinButton = screen.getByRole('button', { name: /linkedin/i })

    expect(facebookButton).toHaveClass('hover:bg-blue-50', 'hover:border-blue-200', 'hover:text-blue-700')
    expect(xButton).toHaveClass('hover:bg-gray-50', 'hover:border-gray-300', 'hover:text-gray-900')
    expect(linkedinButton).toHaveClass('hover:bg-blue-50', 'hover:border-blue-200', 'hover:text-blue-700')
  })

  it('should handle posts with long titles and descriptions', () => {
    const postWithLongContent = {
      ...mockPost,
      title: 'This is a very long blog post title that contains many words and should be properly encoded when shared on social media platforms',
      description: 'This is an extremely long description that goes on and on with many details about the blog post content and should also be properly encoded for social media sharing purposes'
    }

    render(<SocialShare post={postWithLongContent} />)

    const xButton = screen.getByRole('button', { name: /x/i })
    fireEvent.click(xButton)

    expect(mockWindowOpen).toHaveBeenCalledTimes(1)
    expect(mockWindowOpen.mock.calls[0][0]).toContain('twitter.com/intent/tweet')
  })

  it('should maintain accessibility with proper button labels', () => {
    render(<SocialShare post={mockPost} />)

    const facebookButton = screen.getByRole('button', { name: /facebook/i })
    const xButton = screen.getByRole('button', { name: /x/i })
    const linkedinButton = screen.getByRole('button', { name: /linkedin/i })

    expect(facebookButton).toBeInTheDocument()
    expect(xButton).toBeInTheDocument()
    expect(linkedinButton).toBeInTheDocument()
  })
})