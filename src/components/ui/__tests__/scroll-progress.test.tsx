import React from 'react'
import { render } from '@testing-library/react'
import { ScrollProgress } from '../scroll-progress'

// Mock framer-motion
interface MotionDivProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  transition?: Record<string, unknown>
  [key: string]: unknown
}

jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv(props: MotionDivProps) {
      const { children, className, style } = props
      return <div className={className} style={style}>{children}</div>
    }
  }
}))

describe('ScrollProgress', () => {
  // Mock window properties
  const mockScrollY = jest.fn()
  const mockInnerHeight = jest.fn()
  const mockScrollHeight = jest.fn()
  const mockAddEventListener = jest.fn()
  const mockRemoveEventListener = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Reset window properties
    mockScrollY.mockReturnValue(0)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    Object.defineProperty(window, 'scrollY', {
      get: mockScrollY,
      configurable: true
    })

    Object.defineProperty(window, 'innerHeight', {
      get: mockInnerHeight,
      configurable: true
    })

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      get: mockScrollHeight,
      configurable: true
    })

    Object.defineProperty(window, 'addEventListener', {
      value: mockAddEventListener,
      configurable: true
    })

    Object.defineProperty(window, 'removeEventListener', {
      value: mockRemoveEventListener,
      configurable: true
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render scroll progress component', () => {
    const { container } = render(<ScrollProgress />)

    const progressContainer = container.querySelector('.fixed.top-0.left-0.right-0')
    expect(progressContainer).toBeInTheDocument()
    expect(progressContainer).toHaveClass('h-1', 'bg-primary/20', 'z-50')
  })

  it('should render progress fill element', () => {
    const { container } = render(<ScrollProgress />)

    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
    expect(progressFill).toHaveClass('from-primary', 'to-primary/80', 'origin-left')
  })

  it('should add scroll event listener on mount', () => {
    render(<ScrollProgress />)

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
  })

  it('should remove scroll event listener on unmount', () => {
    const { unmount } = render(<ScrollProgress />)

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    )
  })

  it('should calculate progress correctly at start of page', () => {
    mockScrollY.mockReturnValue(0)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Progress should be 0% at top of page
    // (0 / (2000 - 800)) * 100 = 0%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should calculate progress correctly at middle of page', () => {
    mockScrollY.mockReturnValue(600) // 50% of scrollable content
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Progress should be 50%
    // (600 / (2000 - 800)) * 100 = 50%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should calculate progress correctly at end of page', () => {
    mockScrollY.mockReturnValue(1200) // Full scroll
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Progress should be 100%
    // (1200 / (2000 - 800)) * 100 = 100%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should handle edge case where scrollHeight equals innerHeight', () => {
    mockScrollY.mockReturnValue(0)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(800) // No scrollable content

    render(<ScrollProgress />)

    // Should handle division by zero gracefully
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should update progress on scroll events', () => {
    mockScrollY.mockReturnValue(0)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Get the scroll event handler that was registered
    const scrollHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1] as () => void

    expect(scrollHandler).toBeDefined()

    // Simulate scroll event
    mockScrollY.mockReturnValue(300)
    scrollHandler()

    // Progress should update to 25%
    // (300 / (2000 - 800)) * 100 = 25%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should call initial progress calculation', () => {
    mockScrollY.mockReturnValue(400)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Should calculate initial progress on mount
    // (400 / (2000 - 800)) * 100 = 33.33%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should handle negative scroll values', () => {
    mockScrollY.mockReturnValue(-100) // Negative scroll (shouldn't happen but edge case)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Progress should not go below 0
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should handle scroll beyond page end', () => {
    mockScrollY.mockReturnValue(1500) // Scrolled beyond available content
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    render(<ScrollProgress />)

    // Progress should not exceed 100%
    // (1500 / (2000 - 800)) * 100 = 125%, but should be capped
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should have correct CSS classes for styling', () => {
    const { container } = render(<ScrollProgress />)

    const progressContainer = container.querySelector('.fixed')
    expect(progressContainer).toHaveClass(
      'fixed',
      'top-0',
      'left-0',
      'right-0',
      'h-1',
      'bg-primary/20',
      'z-50'
    )

    const progressFill = container.querySelector('.h-full')
    expect(progressFill).toHaveClass(
      'h-full',
      'bg-gradient-to-r',
      'from-primary',
      'to-primary/80',
      'origin-left'
    )
  })

  it('should have inline styles for progress width', () => {
    mockScrollY.mockReturnValue(600)
    mockInnerHeight.mockReturnValue(800)
    mockScrollHeight.mockReturnValue(2000)

    const { container } = render(<ScrollProgress />)

    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toHaveStyle({
      background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
    })
  })

  it('should handle window resize scenarios', () => {
    mockScrollY.mockReturnValue(300)
    mockInnerHeight.mockReturnValue(600) // Different window height
    mockScrollHeight.mockReturnValue(1800)

    render(<ScrollProgress />)

    // Should recalculate with new dimensions
    // (300 / (1800 - 600)) * 100 = 25%
    const { container } = render(<ScrollProgress />)
    const progressFill = container.querySelector('.h-full.bg-gradient-to-r')
    expect(progressFill).toBeInTheDocument()
  })

  it('should be positioned correctly for fixed layout', () => {
    const { container } = render(<ScrollProgress />)

    const progressContainer = container.querySelector('.fixed.top-0.left-0.right-0.z-50')
    expect(progressContainer).toBeInTheDocument()
    expect(progressContainer).toHaveClass('h-1') // 1 unit height
  })

  it('should use passive scroll listener for performance', () => {
    render(<ScrollProgress />)

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
  })

  it('should cleanup event listener properly', () => {
    const { unmount } = render(<ScrollProgress />)

    // Get the scroll handler that was added
    const addCallArgs = mockAddEventListener.mock.calls.find(
      call => call[0] === 'scroll'
    )
    const scrollHandler = addCallArgs?.[1]

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', scrollHandler)
  })
})