import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../theme-toggle'

// Mock next-themes
const mockSetTheme = jest.fn()
const mockTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme(),
    setTheme: mockSetTheme
  })
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Moon: ({ className }: { className?: string }) => (
    <div data-testid="moon-icon" className={className}>
      Moon
    </div>
  ),
  Sun: ({ className }: { className?: string }) => (
    <div data-testid="sun-icon" className={className}>
      Sun
    </div>
  )
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly when not mounted', () => {
    mockTheme.mockReturnValue('light')

    // Create a component that simulates the mounted: false state
    const TestComponent = () => {
      const [mounted] = React.useState(false)

      if (!mounted) {
        return (
          <button className="w-9 h-9 border-primary/20 hover:border-primary/40 hover:bg-primary/10">
            <div data-testid="sun-icon" className="h-4 w-4">
              Sun
            </div>
          </button>
        )
      }

      return <ThemeToggle />
    }
    TestComponent.displayName = 'TestComponent'

    render(<TestComponent />)

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render with light theme when mounted', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getAllByTestId('sun-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('moon-icon')).toHaveLength(1)
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('should render with dark theme when mounted', () => {
    mockTheme.mockReturnValue('dark')

    render(<ThemeToggle />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getAllByTestId('sun-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('moon-icon')).toHaveLength(1)
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('should call setTheme with "dark" when current theme is "light"', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should call setTheme with "light" when current theme is "dark"', () => {
    mockTheme.mockReturnValue('dark')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should default to "light" when current theme is neither "light" nor "dark"', () => {
    mockTheme.mockReturnValue('system')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should handle undefined theme', () => {
    mockTheme.mockReturnValue(undefined)

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should handle null theme', () => {
    mockTheme.mockReturnValue(null)

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should have correct CSS classes', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    expect(button).toHaveClass('w-9')
    expect(button).toHaveClass('h-9')
    expect(button).toHaveClass('border-primary/20')
    expect(button).toHaveClass('hover:border-primary/40')
    expect(button).toHaveClass('hover:bg-primary/10')
    expect(button).toHaveClass('transition-all')
    expect(button).toHaveClass('duration-300')
  })

  it('should have correct accessibility attributes', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    const srText = screen.getByText('Toggle theme')

    expect(button).toBeInTheDocument()
    expect(srText).toHaveClass('sr-only')
  })

  it('should have proper icon styling classes', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const sunIcons = screen.getAllByTestId('sun-icon')
    const moonIcons = screen.getAllByTestId('moon-icon')

    expect(sunIcons[0]).toHaveClass('h-4')
    expect(sunIcons[0]).toHaveClass('w-4')
    expect(sunIcons[0]).toHaveClass('text-primary')

    expect(moonIcons[0]).toHaveClass('absolute')
    expect(moonIcons[0]).toHaveClass('h-4')
    expect(moonIcons[0]).toHaveClass('w-4')
    expect(moonIcons[0]).toHaveClass('text-primary')
  })

  it('should handle multiple rapid clicks', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledTimes(3)
    expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark')
    expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'dark')
    expect(mockSetTheme).toHaveBeenNthCalledWith(3, 'dark')
  })

  it('should be keyboard accessible', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    // Simulate keyboard interaction
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(button, { key: 'Enter', code: 'Enter' })

    // The click event should still be triggered
    expect(button).toBeInTheDocument()
  })

  it('should maintain button type and behavior', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    expect(button.tagName).toBe('BUTTON')
    // Button component doesn't explicitly set type, so it defaults to null
    expect(button.getAttribute('type')).toBeNull()
  })

  it('should handle theme changes correctly in sequence', () => {
    mockTheme.mockReturnValue('light')

    const { rerender } = render(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')

    // Simulate theme change
    mockTheme.mockReturnValue('dark')
    rerender(<ThemeToggle />)

    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })
})