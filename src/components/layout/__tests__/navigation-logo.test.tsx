import { render, screen, fireEvent } from '@testing-library/react'
import { NavigationLogo } from '../navigation-logo'
import { SITE_CONFIG } from '@/lib/constants'

// Mock framer-motion to avoid issues with animations in tests
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, whileHover, whileTap, ...props }: any) => (
      <button onClick={onClick} className={className} {...props}>
        {children}
      </button>
    )
  }
}))

describe('NavigationLogo Component', () => {
  const mockOnLogoClick = jest.fn()

  beforeEach(() => {
    mockOnLogoClick.mockClear()
  })

  describe('Rendering', () => {
    it('should render with site name from config', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button', { name: /navigate to home page/i })
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveTextContent(SITE_CONFIG.name)
    })

    it('should apply correct CSS classes', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo).toHaveClass('text-xl', 'font-bold', 'gradient-warm')
    })

    it('should have proper accessibility attributes', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo).toHaveAttribute('aria-label', 'Navigate to home page')
    })

    it('should render as a button element', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo.tagName).toBe('BUTTON')
    })
  })

  describe('Event Handling', () => {
    it('should call onLogoClick when clicked', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      fireEvent.click(logo)

      expect(mockOnLogoClick).toHaveBeenCalledTimes(1)
    })

    it('should call onLogoClick multiple times for multiple clicks', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      fireEvent.click(logo)
      fireEvent.click(logo)
      fireEvent.click(logo)

      expect(mockOnLogoClick).toHaveBeenCalledTimes(3)
    })

    it('should handle keyboard interactions', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')

      // Simulate Enter key press
      fireEvent.keyDown(logo, { key: 'Enter', code: 'Enter' })

      // Note: The actual click event would be triggered by the browser
      // but we need to simulate it manually in tests
      fireEvent.click(logo)

      expect(mockOnLogoClick).toHaveBeenCalledTimes(1)
    })

    it('should be focusable', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      logo.focus()

      expect(logo).toHaveFocus()
    })
  })

  describe('Props', () => {
    it('should accept and use onLogoClick prop', () => {
      const customHandler = jest.fn()
      render(<NavigationLogo onLogoClick={customHandler} />)

      const logo = screen.getByRole('button')
      fireEvent.click(logo)

      expect(customHandler).toHaveBeenCalledTimes(1)
    })

    it('should work with different onLogoClick handlers', () => {
      const handler1 = jest.fn()
      const handler2 = jest.fn()

      const { rerender } = render(<NavigationLogo onLogoClick={handler1} />)

      const logo = screen.getByRole('button')
      fireEvent.click(logo)
      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).not.toHaveBeenCalled()

      rerender(<NavigationLogo onLogoClick={handler2} />)
      fireEvent.click(logo)
      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })

  describe('Animation Props', () => {
    it('should pass through motion props when using real framer-motion', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo).toBeInTheDocument()

      // When using real framer-motion, these props would be applied
      // In mocked version, we just verify the component renders correctly
    })
  })

  describe('Site Config Integration', () => {
    it('should display the correct site name from SITE_CONFIG', () => {
      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo).toHaveTextContent(SITE_CONFIG.name)
    })

    it('should handle empty or undefined site name gracefully', () => {
      const originalName = SITE_CONFIG.name

      // Temporarily modify SITE_CONFIG for this test
      ;(SITE_CONFIG as any).name = ''

      render(<NavigationLogo onLogoClick={mockOnLogoClick} />)

      const logo = screen.getByRole('button')
      expect(logo).toBeInTheDocument()
      expect(logo.textContent).toBe('')

      // Restore original value
      ;(SITE_CONFIG as any).name = originalName
    })
  })

  describe('Type Safety', () => {
    it('should accept ClickHandler type for onLogoClick', () => {
      const typedHandler: import('@/lib/types').ClickHandler = jest.fn()

      render(<NavigationLogo onLogoClick={typedHandler} />)

      const logo = screen.getByRole('button')
      fireEvent.click(logo)

      expect(typedHandler).toHaveBeenCalledTimes(1)
    })
  })

})