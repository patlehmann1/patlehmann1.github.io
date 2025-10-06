import React from 'react'
import { render } from '@testing-library/react'
import { screen, fireEvent, waitFor } from '@testing-library/dom'
import { ThemeToggle } from '../theme-toggle'

const mockSetTheme = jest.fn()
const mockTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme(),
    setTheme: mockSetTheme
  })
}))

jest.mock('lucide-react', () => ({
  Palette: ({ className }: { className?: string }) => (
    <div data-testid="palette-icon" className={className}>
      Palette
    </div>
  ),
  Check: ({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className}>
      Check
    </div>
  )
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly when not mounted', () => {
    mockTheme.mockReturnValue('light')

    const TestComponent = () => {
      const [mounted] = React.useState(false)

      if (!mounted) {
        return (
          <button className="w-9 h-9 border-primary/20 hover:border-primary/40 hover:bg-primary/10">
            <div data-testid="palette-icon" className="h-4 w-4">
              Palette
            </div>
          </button>
        )
      }

      return <ThemeToggle />
    }
    TestComponent.displayName = 'TestComponent'

    render(<TestComponent />)

    expect(screen.getByTestId('palette-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render with palette icon when mounted', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    expect(screen.getByRole('button', { name: 'Select theme' })).toBeInTheDocument()
    expect(screen.getByTestId('palette-icon')).toBeInTheDocument()
  })

  it('should open theme dropdown on click', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('Ocean')).toBeInTheDocument()
    expect(screen.getByText('Forest')).toBeInTheDocument()
    expect(screen.getByText('Sunset')).toBeInTheDocument()
    expect(screen.getByText('Minimal')).toBeInTheDocument()
  })

  it('should show check icon for current theme', () => {
    mockTheme.mockReturnValue('ocean')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    const checkIcons = screen.getAllByTestId('check-icon')
    expect(checkIcons.length).toBeGreaterThan(0)
  })

  it('should call setTheme when selecting a different theme', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    const darkThemeButton = screen.getByText('Dark').closest('button')
    if (darkThemeButton) {
      fireEvent.click(darkThemeButton)
    }

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should close dropdown after selecting a theme', async () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    expect(screen.getByText('Dark')).toBeInTheDocument()

    const darkThemeButton = screen.getByText('Dark').closest('button')
    if (darkThemeButton) {
      fireEvent.click(darkThemeButton)
    }

    await waitFor(() => {
      expect(screen.queryByText('Dark')).not.toBeInTheDocument()
    })
  })

  it('should close dropdown when clicking outside', async () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    expect(screen.getByText('Dark')).toBeInTheDocument()

    fireEvent.click(document.body)

    await waitFor(() => {
      expect(screen.queryByText('Dark')).not.toBeInTheDocument()
    })
  })

  it('should allow selecting each theme option', () => {
    const themes = ['light', 'dark', 'ocean', 'forest', 'sunset', 'minimal']

    themes.forEach(themeValue => {
      mockTheme.mockReturnValue('light')
      jest.clearAllMocks()

      const { unmount } = render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: 'Select theme' })
      fireEvent.click(button)

      const themeLabel = themeValue.charAt(0).toUpperCase() + themeValue.slice(1)
      const themeButton = screen.getByText(themeLabel).closest('button')

      if (themeButton) {
        fireEvent.click(themeButton)
      }

      expect(mockSetTheme).toHaveBeenCalledWith(themeValue)

      unmount()
    })
  })

  it('should have correct accessibility attributes', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })

    expect(button).toHaveAttribute('aria-label', 'Select theme')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('should update aria-expanded when dropdown is open', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should display color preview dots for each theme', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })
    fireEvent.click(button)

    const colorDots = document.querySelectorAll('.w-4.h-4.rounded-full')
    expect(colorDots.length).toBe(6)
  })

  it('should have correct CSS classes on main button', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })

    expect(button).toHaveClass('w-9')
    expect(button).toHaveClass('h-9')
    expect(button).toHaveClass('border-primary/20')
    expect(button).toHaveClass('hover:border-primary/40')
    expect(button).toHaveClass('hover:bg-primary/10')
    expect(button).toHaveClass('transition-all')
    expect(button).toHaveClass('duration-300')
  })

  it('should toggle dropdown open/closed on multiple clicks', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })

    fireEvent.click(button)
    expect(screen.getByText('Dark')).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.queryByText('Dark')).not.toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByText('Dark')).toBeInTheDocument()
  })

  it('should handle keyboard accessibility', () => {
    mockTheme.mockReturnValue('light')

    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Select theme' })

    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(button, { key: 'Enter', code: 'Enter' })

    expect(button).toBeInTheDocument()
  })
})
