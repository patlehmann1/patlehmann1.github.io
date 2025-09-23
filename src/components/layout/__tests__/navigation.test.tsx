import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Navigation } from '../navigation'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    header: function MotionHeader(props: any) {
      const { children, className } = props
      return <header className={className}>{children}</header>
    }
  },
  AnimatePresence: function AnimatePresence({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Menu: ({ className }: { className?: string }) => (
    <div data-testid="menu-icon" className={className}>Menu</div>
  ),
  X: ({ className }: { className?: string }) => (
    <div data-testid="x-icon" className={className}>X</div>
  )
}))

// Mock Next.js hooks
const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname()
}))

// Mock custom hooks
const mockScrollToSection = jest.fn()
jest.mock('@/hooks/useScrollToSection', () => ({
  useScrollToSection: () => mockScrollToSection
}))

// Mock UI constants
jest.mock('@/lib/constants', () => ({
  UI: {
    scrollThreshold: 20
  }
}))

// Mock UI utils
jest.mock('@/lib/ui-utils', () => ({
  navigationHeaderClasses: jest.fn((scrolled: boolean) =>
    scrolled ? 'scrolled-header' : 'default-header'
  )
}))

// Mock child components
jest.mock('../navigation-logo', () => ({
  NavigationLogo: ({ onLogoClick }: { onLogoClick: () => void }) => (
    <div data-testid="navigation-logo" onClick={onLogoClick}>Logo</div>
  )
}))

jest.mock('../desktop-navigation', () => ({
  DesktopNavigation: ({ onNavClick, isActiveItem }: { onNavClick: (href: string) => void; isActiveItem: (href: string) => boolean }) => (
    <div data-testid="desktop-navigation">
      <button onClick={() => onNavClick('#about')}>About</button>
      <button onClick={() => onNavClick('/blog')}>Blog</button>
      <span data-testid="active-about">{isActiveItem('#about') ? 'active' : 'inactive'}</span>
      <span data-testid="active-blog">{isActiveItem('/blog') ? 'active' : 'inactive'}</span>
    </div>
  )
}))

jest.mock('../mobile-navigation', () => ({
  MobileNavigation: ({ isMenuOpen, onNavClick, isActiveItem }: {
    isMenuOpen: boolean;
    onNavClick: (href: string) => void;
    isActiveItem: (href: string) => boolean;
  }) => (
    <div data-testid="mobile-navigation" data-open={isMenuOpen}>
      <button onClick={() => onNavClick('#contact')}>Contact</button>
      <span data-testid="mobile-active-contact">{isActiveItem('#contact') ? 'active' : 'inactive'}</span>
    </div>
  )
}))

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, variant, size, ...props }: any) => (
    <button
      onClick={onClick}
      className={`button ${variant || ''} ${size || ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}))

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')

    // Mock scroll behavior
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })

    // Mock window.addEventListener and removeEventListener
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render all navigation components', () => {
    render(<Navigation />)

    expect(screen.getByTestId('navigation-logo')).toBeInTheDocument()
    expect(screen.getByTestId('desktop-navigation')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument()
  })

  it('should render mobile menu toggle button', () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('md:hidden')
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('should toggle mobile menu when button is clicked', () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })

    // Initially closed
    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'false')

    // Click to open
    fireEvent.click(menuButton)
    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'true')
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    expect(screen.getByTestId('x-icon')).toBeInTheDocument()

    // Click to close
    fireEvent.click(menuButton)
    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'false')
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('should handle scroll events and update header styling', () => {
    const { navigationHeaderClasses } = require('@/lib/ui-utils')

    render(<Navigation />)

    // Verify event listener is added
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))

    // Initially not scrolled
    expect(navigationHeaderClasses).toHaveBeenCalledWith(false)

    // Simulate scroll past threshold
    Object.defineProperty(window, 'scrollY', { value: 30 })

    act(() => {
      const scrollHandler = (window.addEventListener as jest.Mock).mock.calls
        .find(call => call[0] === 'scroll')[1]
      scrollHandler()
    })

    expect(navigationHeaderClasses).toHaveBeenCalledWith(true)
  })

  it('should handle scroll events below threshold', () => {
    const { navigationHeaderClasses } = require('@/lib/ui-utils')

    render(<Navigation />)

    // Simulate scroll below threshold
    Object.defineProperty(window, 'scrollY', { value: 10 })

    act(() => {
      const scrollHandler = (window.addEventListener as jest.Mock).mock.calls
        .find(call => call[0] === 'scroll')[1]
      scrollHandler()
    })

    expect(navigationHeaderClasses).toHaveBeenCalledWith(false)
  })

  it('should remove scroll listener on unmount', () => {
    const { unmount } = render(<Navigation />)

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should handle logo click', () => {
    render(<Navigation />)

    const logo = screen.getByTestId('navigation-logo')
    fireEvent.click(logo)

    expect(mockScrollToSection).toHaveBeenCalledWith('#')
  })

  it('should handle desktop navigation clicks', () => {
    render(<Navigation />)

    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)

    expect(mockScrollToSection).toHaveBeenCalledWith('#about')
  })

  it('should handle mobile navigation clicks and close menu', () => {
    render(<Navigation />)

    // Open mobile menu first
    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(menuButton)
    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'true')

    // Click mobile nav item
    const contactButton = screen.getByText('Contact')
    fireEvent.click(contactButton)

    expect(mockScrollToSection).toHaveBeenCalledWith('#contact')
    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'false')
  })

  it('should determine active items correctly for path-based navigation', () => {
    mockUsePathname.mockReturnValue('/blog')

    render(<Navigation />)

    expect(screen.getByTestId('active-blog')).toHaveTextContent('active')
    expect(screen.getByTestId('active-about')).toHaveTextContent('inactive')
  })

  it('should determine active items correctly for hash-based navigation', () => {
    mockUsePathname.mockReturnValue('/')

    render(<Navigation />)

    // Hash links should not be active based on pathname
    expect(screen.getByTestId('active-about')).toHaveTextContent('inactive')
    expect(screen.getByTestId('mobile-active-contact')).toHaveTextContent('inactive')
  })

  it('should handle nested blog paths correctly', () => {
    mockUsePathname.mockReturnValue('/blog/some-post')

    render(<Navigation />)

    expect(screen.getByTestId('active-blog')).toHaveTextContent('active')
  })

  it('should apply correct header classes based on scroll state', () => {
    render(<Navigation />)

    const header = screen.getByRole('banner')

    // Should start with default header class
    expect(header).toHaveClass('default-header')

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 30 })

    act(() => {
      const scrollHandler = (window.addEventListener as jest.Mock).mock.calls
        .find(call => call[0] === 'scroll')[1]
      scrollHandler()
    })

    // Should now have scrolled header class
    expect(header).toHaveClass('scrolled-header')
  })

  it('should have correct navigation structure', () => {
    render(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('max-w-6xl', 'mx-auto', 'px-3', 'sm:px-4', 'lg:px-6', 'py-4')

    const flexContainer = nav.querySelector('.flex.items-center.justify-between')
    expect(flexContainer).toBeInTheDocument()
  })

  it('should handle rapid menu toggle clicks', () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })

    // Rapid clicks
    fireEvent.click(menuButton)
    fireEvent.click(menuButton)
    fireEvent.click(menuButton)

    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'true')
  })

  it('should maintain menu state during re-renders', () => {
    const { rerender } = render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(menuButton)

    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'true')

    rerender(<Navigation />)

    expect(screen.getByTestId('mobile-navigation')).toHaveAttribute('data-open', 'true')
  })

  it('should handle scroll events during navigation clicks', () => {
    render(<Navigation />)

    // Simulate scroll while navigating
    Object.defineProperty(window, 'scrollY', { value: 30 })

    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)

    expect(mockScrollToSection).toHaveBeenCalledWith('#about')
  })

  it('should handle multiple navigation clicks correctly', () => {
    render(<Navigation />)

    const aboutButton = screen.getByText('About')
    const blogButton = screen.getByText('Blog')

    fireEvent.click(aboutButton)
    fireEvent.click(blogButton)

    expect(mockScrollToSection).toHaveBeenCalledWith('#about')
    expect(mockScrollToSection).toHaveBeenCalledWith('/blog')
    expect(mockScrollToSection).toHaveBeenCalledTimes(2)
  })

  it('should handle edge case pathname values', () => {
    mockUsePathname.mockReturnValue('')

    render(<Navigation />)

    expect(screen.getByTestId('active-blog')).toHaveTextContent('inactive')
  })

  it('should handle logo click from different scroll positions', () => {
    render(<Navigation />)

    // Scroll first
    Object.defineProperty(window, 'scrollY', { value: 50 })

    act(() => {
      const scrollHandler = (window.addEventListener as jest.Mock).mock.calls
        .find(call => call[0] === 'scroll')[1]
      scrollHandler()
    })

    // Then click logo
    const logo = screen.getByTestId('navigation-logo')
    fireEvent.click(logo)

    expect(mockScrollToSection).toHaveBeenCalledWith('#')
  })

  it('should handle accessibility attributes correctly', () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    expect(menuButton).toHaveAttribute('aria-label', 'Open menu')

    fireEvent.click(menuButton)

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-label', 'Close menu')
  })
})