import { renderHook } from '@testing-library/react'
import { useScrollToSection } from '../useScrollToSection'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock DOM methods
const mockScrollTo = jest.fn()
const mockScrollIntoView = jest.fn()
const mockQuerySelector = jest.fn()

Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
})

// Create a simple mock for window.location that jsdom won't interfere with
const originalLocation = window.location
beforeAll(() => {
  // @ts-ignore
  delete window.location
  window.location = { pathname: '/' } as Location
})

afterAll(() => {
  window.location = originalLocation
})

describe('useScrollToSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.location.pathname = '/'
  })

  describe('Route navigation', () => {
    it('should navigate to different pages using router.push', () => {
      const { result } = renderHook(() => useScrollToSection())

      result.current('/about')

      expect(mockPush).toHaveBeenCalledWith('/about')
      expect(mockPush).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple route navigation calls', () => {
      const { result } = renderHook(() => useScrollToSection())

      result.current('/about')
      result.current('/contact')
      result.current('/projects')

      expect(mockPush).toHaveBeenNthCalledWith(1, '/about')
      expect(mockPush).toHaveBeenNthCalledWith(2, '/contact')
      expect(mockPush).toHaveBeenNthCalledWith(3, '/projects')
      expect(mockPush).toHaveBeenCalledTimes(3)
    })
  })

  describe('Home navigation (#)', () => {
    it('should scroll to top when on home page and href is #', () => {
      window.location.pathname =('/')
      const { result } = renderHook(() => useScrollToSection())

      result.current('#')

      expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should navigate to home when not on home page and href is #', () => {
      window.location.pathname =('/about')
      const { result } = renderHook(() => useScrollToSection())

      result.current('#')

      expect(mockPush).toHaveBeenCalledWith('/')
      expect(mockScrollTo).not.toHaveBeenCalled()
    })
  })

  describe('Hash link navigation', () => {
    it('should scroll to section when on home page and element exists', () => {
      window.location.pathname =('/')
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockQuerySelector.mockReturnValue(mockElement)

      const { result } = renderHook(() => useScrollToSection())

      result.current('#about')

      expect(mockQuerySelector).toHaveBeenCalledWith('#about')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should not scroll when on home page but element does not exist', () => {
      window.location.pathname =('/')
      mockQuerySelector.mockReturnValue(null)

      const { result } = renderHook(() => useScrollToSection())

      result.current('#nonexistent')

      expect(mockQuerySelector).toHaveBeenCalledWith('#nonexistent')
      expect(mockScrollIntoView).not.toHaveBeenCalled()
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should navigate to home with hash when not on home page', () => {
      window.location.pathname =('/about')
      const { result } = renderHook(() => useScrollToSection())

      result.current('#contact')

      expect(mockPush).toHaveBeenCalledWith('/#contact')
      expect(mockQuerySelector).not.toHaveBeenCalled()
      expect(mockScrollIntoView).not.toHaveBeenCalled()
    })
  })

  describe('Hook stability', () => {
    it('should return the same function reference on re-renders', () => {
      const { result, rerender } = renderHook(() => useScrollToSection())

      const firstFunction = result.current
      rerender()
      const secondFunction = result.current

      expect(firstFunction).toBe(secondFunction)
    })

    it('should maintain functionality after re-renders', () => {
      const { result, rerender } = renderHook(() => useScrollToSection())

      rerender()
      result.current('/projects')

      expect(mockPush).toHaveBeenCalledWith('/projects')
    })
  })

  describe('Different href patterns', () => {
    beforeEach(() => {
      window.location.pathname =('/')
    })

    it('should handle hash links with various formats', () => {
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockQuerySelector.mockReturnValue(mockElement)

      const { result } = renderHook(() => useScrollToSection())

      result.current('#section-1')
      result.current('#skills')
      result.current('#contact-form')

      expect(mockQuerySelector).toHaveBeenNthCalledWith(1, '#section-1')
      expect(mockQuerySelector).toHaveBeenNthCalledWith(2, '#skills')
      expect(mockQuerySelector).toHaveBeenNthCalledWith(3, '#contact-form')
      expect(mockScrollIntoView).toHaveBeenCalledTimes(3)
    })

    it('should handle different route patterns', () => {
      const { result } = renderHook(() => useScrollToSection())

      result.current('/blog')
      result.current('/blog/post-1')
      result.current('/contact')

      expect(mockPush).toHaveBeenNthCalledWith(1, '/blog')
      expect(mockPush).toHaveBeenNthCalledWith(2, '/blog/post-1')
      expect(mockPush).toHaveBeenNthCalledWith(3, '/contact')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string href', () => {
      const { result } = renderHook(() => useScrollToSection())

      // Empty string doesn't start with '/' or '#', so it should try querySelector
      mockQuerySelector.mockReturnValue(null)
      result.current('')

      expect(mockQuerySelector).toHaveBeenCalledWith('')
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should handle special characters in hash', () => {
      window.location.pathname =('/')
      const mockElement = { scrollIntoView: mockScrollIntoView }
      mockQuerySelector.mockReturnValue(mockElement)

      const { result } = renderHook(() => useScrollToSection())

      result.current('#section-with-special-chars_123')

      expect(mockQuerySelector).toHaveBeenCalledWith('#section-with-special-chars_123')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should handle relative paths', () => {
      const { result } = renderHook(() => useScrollToSection())

      result.current('./relative')

      // Should try querySelector since it doesn't start with '/'
      expect(mockQuerySelector).toHaveBeenCalledWith('./relative')
      expect(mockPush).not.toHaveBeenCalled()
    })
  })
})