import React from 'react'
import { render, screen } from '@testing-library/react'
import { ReadingProgressBar } from '../reading-progress-bar'

// Mock framer-motion
interface MotionDivProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: unknown
}

jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv(props: MotionDivProps) {
      const { children, className, style } = props
      // Extract all aria-* attributes
      const ariaProps: Record<string, unknown> = {}
      Object.keys(props).forEach(key => {
        if (key.startsWith('aria-') || key === 'role') {
          ariaProps[key] = props[key]
        }
      })

      return <div className={className} style={style} {...ariaProps}>{children}</div>
    }
  },
  AnimatePresence: function AnimatePresence({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
}))

// Mock the useReadingProgress hook
jest.mock('@/hooks/useReadingProgress')

import { useReadingProgress } from '@/hooks/useReadingProgress'
const mockUseReadingProgress = useReadingProgress as jest.MockedFunction<typeof useReadingProgress>

// Mock window.matchMedia
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia
})

describe('ReadingProgressBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock values
    mockUseReadingProgress.mockReturnValue({
      progress: 50,
      isVisible: true,
      contentFound: true
    })

    // Default matchMedia mock (no reduced motion preference)
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    })
  })

  it('should render progress bar when visible', () => {
    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 50% complete')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  it('should not render when not visible', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 25,
      isVisible: false,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('should use default props correctly', () => {
    render(<ReadingProgressBar />)

    expect(mockUseReadingProgress).toHaveBeenCalledWith({
      contentSelector: 'article',
      showThreshold: 0.01,
      hideThreshold: 0.95
    })

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '3px' })
  })

  it('should use custom contentSelector prop', () => {
    render(<ReadingProgressBar contentSelector="main" />)

    expect(mockUseReadingProgress).toHaveBeenCalledWith({
      contentSelector: 'main',
      showThreshold: 0.01,
      hideThreshold: 0.95
    })
  })

  it('should use custom height prop', () => {
    render(<ReadingProgressBar height={5} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '5px' })
  })

  it('should apply custom className', () => {
    render(<ReadingProgressBar className="custom-class" />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('custom-class')
  })

  it('should have correct CSS classes for positioning', () => {
    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
  })

  it('should render background and progress fill elements', () => {
    const { container } = render(<ReadingProgressBar />)

    const backgroundElement = container.querySelector('.bg-border\\/30')
    expect(backgroundElement).toBeInTheDocument()

    const progressFillElement = container.querySelector('.bg-gradient-to-r')
    expect(progressFillElement).toBeInTheDocument()

    const glowElement = container.querySelector('.bg-primary\\/20')
    expect(glowElement).toBeInTheDocument()
  })

  it('should update aria-label with current progress', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 75.7,
      isVisible: true,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 76% complete')
    expect(progressBar).toHaveAttribute('aria-valuenow', '76')
  })

  it('should handle zero progress', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 0,
      isVisible: true,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 0% complete')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('should handle 100% progress', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 100,
      isVisible: true,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 100% complete')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')
  })

  it('should handle decimal progress values correctly', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 33.33,
      isVisible: true,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 33% complete')
    expect(progressBar).toHaveAttribute('aria-valuenow', '33')
  })

  it('should respect prefers-reduced-motion setting', () => {
    // Mock reduced motion preference
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    })

    render(<ReadingProgressBar />)

    // Component should still render but with different animation settings
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('should handle server-side rendering (window undefined)', () => {
    // Mock window as undefined (SSR scenario)
    const originalWindow = global.window
    // @ts-expect-error - Testing SSR scenario
    delete global.window

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()

    // Restore window
    global.window = originalWindow
  })

  it('should handle matchMedia not available', () => {
    // Mock matchMedia as undefined
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error - Testing fallback scenario
    delete window.matchMedia

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()

    // Restore matchMedia
    window.matchMedia = originalMatchMedia
  })

  it('should combine custom className with default classes', () => {
    render(<ReadingProgressBar className="border-2 shadow-lg" />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
    expect(progressBar).toHaveClass('border-2', 'shadow-lg')
  })

  it('should work with custom height values', () => {
    render(<ReadingProgressBar height={10} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '10px' })
  })

  it('should handle edge case height values', () => {
    render(<ReadingProgressBar height={0} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '0px' })
  })

  it('should maintain accessibility attributes correctly', () => {
    mockUseReadingProgress.mockReturnValue({
      progress: 42.8,
      isVisible: true,
      contentFound: true
    })

    render(<ReadingProgressBar />)

    const progressBar = screen.getByRole('progressbar')

    // Should have proper ARIA attributes
    expect(progressBar).toHaveAttribute('role', 'progressbar')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-valuenow', '43')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress: 43% complete')
  })

  it('should handle rapid progress changes', () => {
    const { rerender } = render(<ReadingProgressBar />)

    // Initial state
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')

    // Update progress
    mockUseReadingProgress.mockReturnValue({
      progress: 80,
      isVisible: true,
      contentFound: true
    })

    rerender(<ReadingProgressBar />)

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80')
  })

  it('should handle visibility state changes', () => {
    const { rerender } = render(<ReadingProgressBar />)

    // Initially visible
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    // Becomes hidden
    mockUseReadingProgress.mockReturnValue({
      progress: 50,
      isVisible: false,
      contentFound: true
    })

    rerender(<ReadingProgressBar />)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

    // Becomes visible again
    mockUseReadingProgress.mockReturnValue({
      progress: 50,
      isVisible: true,
      contentFound: true
    })

    rerender(<ReadingProgressBar />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should handle different content selectors', () => {
    render(<ReadingProgressBar contentSelector=".blog-content" />)

    expect(mockUseReadingProgress).toHaveBeenCalledWith({
      contentSelector: '.blog-content',
      showThreshold: 0.01,
      hideThreshold: 0.95
    })
  })

  it('should render gradient background correctly', () => {
    const { container } = render(<ReadingProgressBar />)

    const progressElement = container.querySelector('.bg-gradient-to-r.from-primary.to-primary\\/80')
    expect(progressElement).toBeInTheDocument()
  })

  it('should handle props updates correctly', () => {
    const { rerender } = render(<ReadingProgressBar height={3} className="initial" />)

    let progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '3px' })
    expect(progressBar).toHaveClass('initial')

    rerender(<ReadingProgressBar height={5} className="updated" />)

    progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveStyle({ height: '5px' })
    expect(progressBar).toHaveClass('updated')
  })
})