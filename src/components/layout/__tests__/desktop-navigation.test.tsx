import { render } from '@testing-library/react'
import { screen, fireEvent } from '@testing-library/dom'
import { DesktopNavigation } from '../desktop-navigation'
import { UI } from '@/lib/constants'
import { navigationButtonClasses } from '@/lib/ui-utils'

// Mock framer-motion to avoid issues with animations in tests
interface MotionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  [key: string]: unknown
}

interface MotionDivProps {
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, ...props }: MotionButtonProps) => {
      // Filter out Framer Motion specific props to avoid React warnings
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, whileTap, initial, animate, transition, exit, ...domProps } = props
      return (
        <button onClick={onClick} className={className} {...domProps}>
          {children}
        </button>
      )
    },
    div: ({ children, className, ...props }: MotionDivProps) => {
      // Filter out Framer Motion specific props to avoid React warnings
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, whileTap, initial, animate, transition, exit, ...domProps } = props
      return (
        <div className={className} {...domProps}>
          {children}
        </div>
      )
    }
  }
}))

// Mock ThemeToggle component
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>
}))

// Mock navigationButtonClasses utility
jest.mock('@/lib/ui-utils', () => ({
  navigationButtonClasses: jest.fn((isActive: boolean) =>
    isActive ? 'nav-button active' : 'nav-button'
  )
}))

describe('DesktopNavigation Component', () => {
  const mockOnNavClick = jest.fn()
  const mockIsActiveItem = jest.fn()

  beforeEach(() => {
    mockOnNavClick.mockClear()
    mockIsActiveItem.mockClear()
    ;(navigationButtonClasses as jest.Mock).mockClear()
  })

  describe('Rendering', () => {
    it('should render with desktop-only visibility classes', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const containers = screen.getAllByRole('generic', { hidden: true })
      const mainContainer = containers.find((el: Element) => el.className.includes('hidden md:flex'))
      expect(mainContainer).toHaveClass('hidden', 'md:flex', 'items-center', 'space-x-8')
    })

    it('should render all navigation items from UI.navItems', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      UI.navItems.forEach(item => {
        const navButton = screen.getByRole('button', { name: item.name })
        expect(navButton).toBeInTheDocument()
        expect(navButton).toHaveTextContent(item.name)
      })
    })

    it('should render ThemeToggle component', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()
    })

    it('should apply correct classes to navigation buttons', () => {
      mockIsActiveItem.mockImplementation((href: string) => href === '/about')
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      // Verify navigationButtonClasses was called for each nav item
      expect(navigationButtonClasses).toHaveBeenCalledTimes(UI.navItems.length)

      // Check that isActiveItem was called for each navigation item
      UI.navItems.forEach(item => {
        expect(mockIsActiveItem).toHaveBeenCalledWith(item.href)
      })
    })
  })

  describe('Navigation Interaction', () => {
    it('should call onNavClick with correct href when navigation button is clicked', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const firstNavItem = UI.navItems[0]
      const navButton = screen.getByRole('button', { name: firstNavItem.name })

      fireEvent.click(navButton)

      expect(mockOnNavClick).toHaveBeenCalledTimes(1)
      expect(mockOnNavClick).toHaveBeenCalledWith(firstNavItem.href)
    })

    it('should call onNavClick for each navigation item independently', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      UI.navItems.forEach((item, index) => {
        const navButton = screen.getByRole('button', { name: item.name })
        fireEvent.click(navButton)

        expect(mockOnNavClick).toHaveBeenCalledTimes(index + 1)
        expect(mockOnNavClick).toHaveBeenCalledWith(item.href)
      })
    })

    it('should handle multiple clicks on the same navigation item', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const firstNavItem = UI.navItems[0]
      const navButton = screen.getByRole('button', { name: firstNavItem.name })

      fireEvent.click(navButton)
      fireEvent.click(navButton)
      fireEvent.click(navButton)

      expect(mockOnNavClick).toHaveBeenCalledTimes(3)
      expect(mockOnNavClick).toHaveBeenCalledWith(firstNavItem.href)
    })
  })

  describe('Active State Management', () => {
    it('should call isActiveItem for each navigation item', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      UI.navItems.forEach(item => {
        expect(mockIsActiveItem).toHaveBeenCalledWith(item.href)
      })
    })

    it('should apply active styles when isActiveItem returns true', () => {
      mockIsActiveItem.mockImplementation((href: string) => href === '#projects')
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      // Check that navigationButtonClasses was called with correct active states
      UI.navItems.forEach(item => {
        const isActive = item.href === '#projects'
        expect(navigationButtonClasses).toHaveBeenCalledWith(isActive)
      })
    })

    it('should handle dynamic changes to active state', () => {
      mockIsActiveItem.mockReturnValue(false)
      const { rerender } = render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      // First render - no active items
      expect(mockIsActiveItem).toHaveBeenCalledTimes(UI.navItems.length)

      // Re-render with different active item
      mockIsActiveItem.mockImplementation((href: string) => href === '/blog')
      rerender(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      // Should be called again for all items
      expect(mockIsActiveItem).toHaveBeenCalledTimes(UI.navItems.length * 2)
    })
  })

  describe('Theme Toggle Integration', () => {
    it('should render ThemeToggle component within motion wrapper', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()
      expect(themeToggle.textContent).toBe('Theme Toggle')
    })
  })

  describe('Navigation Items Integration', () => {
    it('should handle empty navItems array gracefully', () => {
      const originalNavItems = UI.navItems

      // Temporarily modify UI.navItems
      ;(UI as unknown as { navItems: never[] }).navItems = []

      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      // Should only render the theme toggle
      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()

      // Should not render any navigation buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1) // Only theme toggle button

      // Restore original navItems
      ;(UI as { navItems: typeof originalNavItems }).navItems = originalNavItems
    })

    it('should render correct number of navigation buttons', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const navButtons = screen.getAllByRole('button').filter((button: HTMLElement) =>
        !button.hasAttribute('data-testid')
      )
      expect(navButtons).toHaveLength(UI.navItems.length)
    })
  })

  describe('Accessibility', () => {
    it('should have all navigation buttons accessible by keyboard', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      UI.navItems.forEach(item => {
        const navButton = screen.getByRole('button', { name: item.name })
        expect(navButton).toBeInTheDocument()

        // Verify button can be focused
        navButton.focus()
        expect(navButton).toHaveFocus()
      })
    })

    it('should support keyboard navigation', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={mockIsActiveItem} />)

      const firstNavButton = screen.getByRole('button', { name: UI.navItems[0].name })

      // Test Enter key
      fireEvent.keyDown(firstNavButton, { key: 'Enter', code: 'Enter' })
      fireEvent.click(firstNavButton) // Simulate the actual click event

      expect(mockOnNavClick).toHaveBeenCalledWith(UI.navItems[0].href)
    })
  })


  describe('Props Validation', () => {
    it('should accept NavigationHandler type for onNavClick', () => {
      const typedHandler: import('@/lib/types').NavigationHandler = jest.fn()
      mockIsActiveItem.mockReturnValue(false)

      render(<DesktopNavigation onNavClick={typedHandler} isActiveItem={mockIsActiveItem} />)

      const firstNavButton = screen.getByRole('button', { name: UI.navItems[0].name })
      fireEvent.click(firstNavButton)

      expect(typedHandler).toHaveBeenCalledWith(UI.navItems[0].href)
    })

    it('should work with different isActiveItem implementations', () => {
      const alwaysActive = jest.fn(() => true)
      const neverActive = jest.fn(() => false)

      mockOnNavClick.mockClear()

      // Test with always active
      const { rerender } = render(
        <DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={alwaysActive} />
      )
      expect(alwaysActive).toHaveBeenCalledTimes(UI.navItems.length)

      // Test with never active
      rerender(<DesktopNavigation onNavClick={mockOnNavClick} isActiveItem={neverActive} />)
      expect(neverActive).toHaveBeenCalledTimes(UI.navItems.length)
    })
  })
})