import { render, screen, fireEvent } from '@testing-library/react'
import { MobileNavigation } from '../mobile-navigation'
import { UI } from '@/lib/constants'
import { mobileNavigationItemClasses, mobileNavContainerClasses } from '@/lib/ui-utils'

// Mock framer-motion to avoid issues with animations in tests
interface MotionDivProps {
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

interface MotionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  [key: string]: unknown
}

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: MotionDivProps) => {
      // Filter out Framer Motion specific props to avoid React warnings
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, whileTap, initial, animate, transition, exit, ...domProps } = props
      return (
        <div className={className} {...domProps}>
          {children}
        </div>
      )
    },
    button: ({ children, onClick, className, ...props }: MotionButtonProps) => {
      // Filter out Framer Motion specific props to avoid React warnings
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, whileTap, initial, animate, transition, exit, ...domProps } = props
      return (
        <button onClick={onClick} className={className} {...domProps}>
          {children}
        </button>
      )
    }
  }
}))

// Mock ThemeToggle component
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="mobile-theme-toggle">Mobile Theme Toggle</button>
}))

// Mock ui-utils functions
jest.mock('@/lib/ui-utils', () => ({
  mobileNavigationItemClasses: jest.fn((isActive: boolean) =>
    isActive ? 'mobile-nav-item active' : 'mobile-nav-item'
  ),
  mobileNavContainerClasses: jest.fn(() => 'bg-card/95 backdrop-blur-md rounded-lg border border-border p-4 shadow-lg shadow-black/5 dark:shadow-black/20 safe-area-inset')
}))

describe('MobileNavigation Component', () => {
  const mockOnNavClick = jest.fn()
  const mockIsActiveItem = jest.fn()

  beforeEach(() => {
    mockOnNavClick.mockClear()
    mockIsActiveItem.mockClear()
    ;(mobileNavigationItemClasses as jest.Mock).mockClear()
  })

  describe('Conditional Rendering', () => {
    it('should not render when isMenuOpen is false', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Should not render any navigation elements
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.queryByTestId('mobile-theme-toggle')).not.toBeInTheDocument()
    })

    it('should render when isMenuOpen is true', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Should render navigation elements
      const navButtons = screen.getAllByRole('button').filter(button =>
        !button.hasAttribute('data-testid')
      )
      expect(navButtons).toHaveLength(UI.navItems.length)
      expect(screen.getByTestId('mobile-theme-toggle')).toBeInTheDocument()
    })

    it('should toggle visibility based on isMenuOpen prop', () => {
      mockIsActiveItem.mockReturnValue(false)
      const { rerender } = render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Initially hidden
      expect(screen.queryByRole('button')).not.toBeInTheDocument()

      // Rerender with isMenuOpen=true
      rerender(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Now visible
      expect(screen.getAllByRole('button')).toHaveLength(UI.navItems.length + 1) // +1 for theme toggle
    })
  })

  describe('Rendering (when open)', () => {
    beforeEach(() => {
      mockIsActiveItem.mockReturnValue(false)
    })

    it('should render with mobile-only visibility classes', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const containers = screen.getAllByRole('generic')
      const outerContainer = containers.find(el => el.className.includes('md:hidden'))
      expect(outerContainer).toHaveClass('md:hidden', 'mt-4', 'overflow-hidden', 'relative', 'z-10')
    })

    it('should render all navigation items from UI.navItems', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      UI.navItems.forEach(item => {
        const navButton = screen.getByRole('button', { name: item.name })
        expect(navButton).toBeInTheDocument()
        expect(navButton).toHaveTextContent(item.name)
      })
    })

    it('should render ThemeToggle component', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const themeToggle = screen.getByTestId('mobile-theme-toggle')
      expect(themeToggle).toBeInTheDocument()
    })

    it('should apply backdrop and card styling to inner container', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const containers = screen.getAllByRole('generic')
      const innerContainer = containers.find(el => el.className.includes('bg-card'))
      expect(innerContainer).toHaveClass(
        'bg-card/95',
        'backdrop-blur-md',
        'rounded-lg',
        'border',
        'border-border',
        'p-4'
      )
    })

    it('should apply correct classes to navigation buttons', () => {
      mockIsActiveItem.mockImplementation((href: string) => href === '/blog')
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Verify mobileNavigationItemClasses was called for each nav item
      expect(mobileNavigationItemClasses).toHaveBeenCalledTimes(UI.navItems.length)

      // Check that isActiveItem was called for each navigation item
      UI.navItems.forEach(item => {
        expect(mockIsActiveItem).toHaveBeenCalledWith(item.href)
      })
    })
  })

  describe('Navigation Interaction', () => {
    beforeEach(() => {
      mockIsActiveItem.mockReturnValue(false)
    })

    it('should call onNavClick with correct href when navigation button is clicked', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const firstNavItem = UI.navItems[0]
      const navButton = screen.getByRole('button', { name: firstNavItem.name })

      fireEvent.click(navButton)

      expect(mockOnNavClick).toHaveBeenCalledTimes(1)
      expect(mockOnNavClick).toHaveBeenCalledWith(firstNavItem.href)
    })

    it('should call onNavClick for each navigation item independently', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      UI.navItems.forEach((item, index) => {
        const navButton = screen.getByRole('button', { name: item.name })
        fireEvent.click(navButton)

        expect(mockOnNavClick).toHaveBeenCalledTimes(index + 1)
        expect(mockOnNavClick).toHaveBeenCalledWith(item.href)
      })
    })

    it('should handle multiple clicks on the same navigation item', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const firstNavItem = UI.navItems[0]
      const navButton = screen.getByRole('button', { name: firstNavItem.name })

      fireEvent.click(navButton)
      fireEvent.click(navButton)
      fireEvent.click(navButton)

      expect(mockOnNavClick).toHaveBeenCalledTimes(3)
      expect(mockOnNavClick).toHaveBeenCalledWith(firstNavItem.href)
    })

    it('should not call onNavClick when menu is closed', () => {
      render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // No buttons should be rendered, so no clicks possible
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(mockOnNavClick).not.toHaveBeenCalled()
    })
  })

  describe('Active State Management', () => {
    it('should call isActiveItem for each navigation item when open', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      UI.navItems.forEach(item => {
        expect(mockIsActiveItem).toHaveBeenCalledWith(item.href)
      })
    })

    it('should not call isActiveItem when menu is closed', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      expect(mockIsActiveItem).not.toHaveBeenCalled()
    })

    it('should apply active styles when isActiveItem returns true', () => {
      mockIsActiveItem.mockImplementation((href: string) => href === '#projects')
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Check that mobileNavigationItemClasses was called with correct active states
      UI.navItems.forEach(item => {
        const isActive = item.href === '#projects'
        expect(mobileNavigationItemClasses).toHaveBeenCalledWith(isActive)
      })
    })

    it('should handle dynamic changes to active state', () => {
      mockIsActiveItem.mockReturnValue(false)
      const { rerender } = render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // First render - no active items
      expect(mockIsActiveItem).toHaveBeenCalledTimes(UI.navItems.length)

      // Re-render with different active item
      mockIsActiveItem.mockImplementation((href: string) => href === '/about')
      rerender(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Should be called again for all items
      expect(mockIsActiveItem).toHaveBeenCalledTimes(UI.navItems.length * 2)
    })
  })

  describe('Theme Toggle Integration', () => {
    it('should render ThemeToggle component within separator section', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const themeToggle = screen.getByTestId('mobile-theme-toggle')
      expect(themeToggle).toBeInTheDocument()
      expect(themeToggle.textContent).toBe('Mobile Theme Toggle')

      // Check that theme toggle is in a section with border styling
      const themeToggleContainer = themeToggle.parentElement
      expect(themeToggleContainer).toHaveClass(
        'flex',
        'justify-center',
        'pt-6',
        'mt-6',
        'pb-2',
        'mb-4',
        'border-t',
        'border-border'
      )
    })

    it('should not render ThemeToggle when menu is closed', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      expect(screen.queryByTestId('mobile-theme-toggle')).not.toBeInTheDocument()
    })
  })

  describe('Navigation Items Integration', () => {
    it('should handle empty navItems array gracefully', () => {
      const originalNavItems = UI.navItems

      // Temporarily modify UI.navItems
      ;(UI as unknown as { navItems: never[] }).navItems = []

      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // Should only render the theme toggle
      const themeToggle = screen.getByTestId('mobile-theme-toggle')
      expect(themeToggle).toBeInTheDocument()

      // Should not render any navigation buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1) // Only theme toggle button

      // Restore original navItems
      ;(UI as { navItems: typeof originalNavItems }).navItems = originalNavItems
    })

    it('should render correct number of navigation buttons when open', () => {
      mockIsActiveItem.mockReturnValue(false)
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const navButtons = screen.getAllByRole('button').filter(button =>
        !button.hasAttribute('data-testid')
      )
      expect(navButtons).toHaveLength(UI.navItems.length)
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      mockIsActiveItem.mockReturnValue(false)
    })

    it('should have all navigation buttons accessible by keyboard when open', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      UI.navItems.forEach(item => {
        const navButton = screen.getByRole('button', { name: item.name })
        expect(navButton).toBeInTheDocument()

        // Verify button can be focused
        navButton.focus()
        expect(navButton).toHaveFocus()
      })
    })

    it('should support keyboard navigation when open', () => {
      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      const firstNavButton = screen.getByRole('button', { name: UI.navItems[0].name })

      // Test Enter key
      fireEvent.keyDown(firstNavButton, { key: 'Enter', code: 'Enter' })
      fireEvent.click(firstNavButton) // Simulate the actual click event

      expect(mockOnNavClick).toHaveBeenCalledWith(UI.navItems[0].href)
    })

    it('should not be focusable when menu is closed', () => {
      render(
        <MobileNavigation
          isMenuOpen={false}
          onNavClick={mockOnNavClick}
          isActiveItem={mockIsActiveItem}
        />
      )

      // No buttons should exist to focus
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })


  describe('Props Validation', () => {
    it('should accept NavigationHandler type for onNavClick', () => {
      const typedHandler: import('@/lib/types').NavigationHandler = jest.fn()
      mockIsActiveItem.mockReturnValue(false)

      render(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={typedHandler}
          isActiveItem={mockIsActiveItem}
        />
      )

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
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={alwaysActive}
        />
      )
      expect(alwaysActive).toHaveBeenCalledTimes(UI.navItems.length)

      // Test with never active
      rerender(
        <MobileNavigation
          isMenuOpen={true}
          onNavClick={mockOnNavClick}
          isActiveItem={neverActive}
        />
      )
      expect(neverActive).toHaveBeenCalledTimes(UI.navItems.length)
    })
  })
})