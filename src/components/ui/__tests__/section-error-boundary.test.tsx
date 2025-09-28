import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SectionErrorBoundary } from '../section-error-boundary'

// Mock framer-motion
interface MotionDivProps {
  children?: React.ReactNode
  className?: string
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  transition?: Record<string, unknown>
  [key: string]: unknown
}

jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv(props: MotionDivProps) {
      const { children, className } = props
      return <div className={className}>{children}</div>
    }
  }
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  AlertTriangle: function AlertTriangle({ className }: { className?: string }) {
    return <div className={className} data-testid="alert-triangle-icon">AlertTriangle</div>
  },
  RefreshCw: function RefreshCw({ className }: { className?: string }) {
    return <div className={className} data-testid="refresh-icon">RefreshCw</div>
  }
}))

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

describe('SectionErrorBoundary', () => {
  const originalEnv = process.env.NODE_ENV
  const originalConsoleError = console.error

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn()
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    console.error = originalConsoleError
  })

  it('should render children when no error occurs', () => {
    render(
      <SectionErrorBoundary>
        <div data-testid="child-content">Child content</div>
      </SectionErrorBoundary>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('should render error UI when error occurs', () => {
    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(screen.getByText('Section Unavailable')).toBeInTheDocument()
    expect(screen.getByText(/We're experiencing some technical difficulties/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument()
  })

  it('should render custom section name in error message', () => {
    render(
      <SectionErrorBoundary sectionName="Projects">
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(screen.getByText('Projects Section Unavailable')).toBeInTheDocument()
  })

  it('should render fallback component when provided', () => {
    const CustomFallback = () => <div data-testid="custom-fallback">Custom fallback</div>

    render(
      <SectionErrorBoundary fallback={<CustomFallback />}>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    expect(screen.queryByText('Section Unavailable')).not.toBeInTheDocument()
  })

  it('should handle retry functionality', () => {
    const { rerender } = render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    // Error state should be visible
    expect(screen.getByText('Section Unavailable')).toBeInTheDocument()

    // Click retry button
    const retryButton = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(retryButton)

    // Re-render with no error
    rerender(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={false} />
      </SectionErrorBoundary>
    )

    // Should show normal content
    expect(screen.getByText('No error')).toBeInTheDocument()
    expect(screen.queryByText('Section Unavailable')).not.toBeInTheDocument()
  })

  it('should log error information to console', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <SectionErrorBoundary sectionName="Test Section">
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in Test Section:',
      expect.any(Error),
      expect.any(Object)
    )

    consoleErrorSpy.mockRestore()
  })

  it('should log error with default section name when none provided', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error in section:',
      expect.any(Error),
      expect.any(Object)
    )

    consoleErrorSpy.mockRestore()
  })

  it('should show error details in development mode', () => {
    process.env.NODE_ENV = 'development'

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument()
    // Look for the error message in a more flexible way
    expect(screen.getByText((content, element) => {
      return element?.textContent?.includes('Test error message') || false
    })).toBeInTheDocument()
  })

  it('should not show error details in production mode', () => {
    process.env.NODE_ENV = 'production'

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument()
    expect(screen.queryByText(/Test error message/)).not.toBeInTheDocument()
  })

  it('should have correct CSS classes for styling', () => {
    const { container } = render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    const errorContainer = container.querySelector('.py-16.sm\\:py-20')
    expect(errorContainer).toBeInTheDocument()

    const cardContainer = container.querySelector('.bg-card.border')
    expect(cardContainer).toHaveClass('border-destructive/20', 'rounded-lg', 'p-8', 'shadow-sm')

    const iconContainer = container.querySelector('.p-3.bg-destructive\\/10')
    expect(iconContainer).toHaveClass('rounded-full')
  })

  it('should have proper button styling and icon', () => {
    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /try again/i })
    expect(retryButton).toHaveClass('mx-auto')
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument()
  })

  it('should handle componentDidCatch lifecycle method', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Create a custom error boundary instance to test componentDidCatch
    class TestErrorBoundary extends SectionErrorBoundary {
      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        super.componentDidCatch(error, errorInfo)
      }
    }

    render(
      <TestErrorBoundary sectionName="Test">
        <ThrowError shouldThrow={true} />
      </TestErrorBoundary>
    )

    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should handle getDerivedStateFromError static method', () => {
    const error = new Error('Test error')
    const newState = SectionErrorBoundary.getDerivedStateFromError(error)

    expect(newState).toEqual({ hasError: true, error })
  })

  it('should reset error state when retry is clicked', () => {
    const { rerender } = render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    // Error state should be active
    expect(screen.getByText('Section Unavailable')).toBeInTheDocument()

    // Click retry
    const retryButton = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(retryButton)

    // Re-render with a component that doesn't throw
    rerender(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={false} />
      </SectionErrorBoundary>
    )

    // Should show normal content now
    expect(screen.getByText('No error')).toBeInTheDocument()
    expect(screen.queryByText('Section Unavailable')).not.toBeInTheDocument()
  })

  it('should handle error details summary interaction', () => {
    process.env.NODE_ENV = 'development'

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    const summary = screen.getByText('Error Details (Development Only)')
    expect(summary).toBeInTheDocument()

    // Should be clickable (cursor-pointer class)
    expect(summary.closest('summary')).toHaveClass('cursor-pointer')
  })

  it('should handle error message and stack trace display', () => {
    process.env.NODE_ENV = 'development'

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    const preElement = screen.getByText(/Test error message/).closest('pre')
    expect(preElement).toHaveClass('mt-2', 'p-4', 'bg-muted', 'rounded', 'text-xs', 'overflow-auto', 'max-h-32')
  })

  it('should maintain accessibility with proper ARIA attributes', () => {
    render(
      <SectionErrorBoundary sectionName="Contact">
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /try again/i })
    expect(retryButton).toBeInTheDocument()

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('Contact Section Unavailable')
  })

  it('should preserve original component structure when no error', () => {
    const ComplexChild = () => (
      <div>
        <h1>Complex Child</h1>
        <p>With multiple elements</p>
        <button>And interactions</button>
      </div>
    )

    render(
      <SectionErrorBoundary>
        <ComplexChild />
      </SectionErrorBoundary>
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('With multiple elements')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'And interactions' })).toBeInTheDocument()
  })
})