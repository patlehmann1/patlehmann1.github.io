import { renderHook, act } from '@testing-library/react'
import { useReducedMotion, createMotionVariants, createScaleVariants } from '../useReducedMotion'

// Type for variants with transition properties
interface VariantWithTransition {
  transition?: {
    duration?: number
    ease?: number[]
  }
}

describe('useReducedMotion', () => {
  const mockMatchMedia = jest.fn()
  const mockAddEventListener = jest.fn()
  const mockRemoveEventListener = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return false when user does not prefer reduced motion', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    })

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(false)
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('should return true when user prefers reduced motion', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    })

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should add event listener for media query changes', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    })

    renderHook(() => useReducedMotion())

    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should remove event listener on cleanup', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener
    })

    const { unmount } = renderHook(() => useReducedMotion())

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should update state when media query changes', () => {
    let eventHandler: ((event: MediaQueryListEvent) => void) | undefined

    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn((event, handler) => {
        eventHandler = handler
      }),
      removeEventListener: mockRemoveEventListener
    })

    const { result } = renderHook(() => useReducedMotion())

    // Initially false
    expect(result.current).toBe(false)

    // Simulate media query change to true
    act(() => {
      if (eventHandler) {
        eventHandler({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(true)
  })

  it('should handle media query change from true to false', () => {
    let eventHandler: ((event: MediaQueryListEvent) => void) | undefined

    mockMatchMedia.mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn((event, handler) => {
        eventHandler = handler
      }),
      removeEventListener: mockRemoveEventListener
    })

    const { result } = renderHook(() => useReducedMotion())

    // Initially true
    expect(result.current).toBe(true)

    // Simulate media query change to false
    act(() => {
      if (eventHandler) {
        eventHandler({ matches: false } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(false)
  })
})

describe('createMotionVariants', () => {
  it('should return reduced motion variants when prefersReducedMotion is true', () => {
    const variants = createMotionVariants(true)

    expect(variants).toEqual({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    })
  })

  it('should return full motion variants when prefersReducedMotion is false', () => {
    const variants = createMotionVariants(false)

    expect(variants).toEqual({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 1, 1]
        }
      }
    })
  })

  it('should have consistent structure between reduced and full variants', () => {
    const reducedVariants = createMotionVariants(true)
    const fullVariants = createMotionVariants(false)

    // Both should have the same keys
    expect(Object.keys(reducedVariants)).toEqual(['hidden', 'visible', 'exit'])
    expect(Object.keys(fullVariants)).toEqual(['hidden', 'visible', 'exit'])

    // Both should have opacity in all states
    expect(reducedVariants.hidden).toHaveProperty('opacity')
    expect(reducedVariants.visible).toHaveProperty('opacity')
    expect(reducedVariants.exit).toHaveProperty('opacity')

    expect(fullVariants.hidden).toHaveProperty('opacity')
    expect(fullVariants.visible).toHaveProperty('opacity')
    expect(fullVariants.exit).toHaveProperty('opacity')
  })
})

describe('createScaleVariants', () => {
  it('should return reduced motion scale variants when prefersReducedMotion is true', () => {
    const variants = createScaleVariants(true)

    expect(variants).toEqual({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      hover: { opacity: 1 }
    })
  })

  it('should return full motion scale variants when prefersReducedMotion is false', () => {
    const variants = createScaleVariants(false)

    expect(variants).toEqual({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }
      },
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    })
  })

  it('should have consistent structure between reduced and full scale variants', () => {
    const reducedVariants = createScaleVariants(true)
    const fullVariants = createScaleVariants(false)

    // Both should have the same keys
    expect(Object.keys(reducedVariants)).toEqual(['hidden', 'visible', 'hover'])
    expect(Object.keys(fullVariants)).toEqual(['hidden', 'visible', 'hover'])

    // Both should have opacity in hidden and visible states
    expect(reducedVariants.hidden).toHaveProperty('opacity')
    expect(reducedVariants.visible).toHaveProperty('opacity')
    expect(fullVariants.hidden).toHaveProperty('opacity')
    expect(fullVariants.visible).toHaveProperty('opacity')
  })

  it('should disable scale animations when reduced motion is preferred', () => {
    const reducedVariants = createScaleVariants(true)

    // Should not have scale properties
    expect(reducedVariants.hidden).not.toHaveProperty('scale')
    expect(reducedVariants.visible).not.toHaveProperty('scale')
    expect(reducedVariants.hover).not.toHaveProperty('scale')
  })

  it('should include scale animations when reduced motion is not preferred', () => {
    const fullVariants = createScaleVariants(false)

    // Should have scale properties where appropriate
    expect(fullVariants.hidden).toHaveProperty('scale', 0.9)
    expect(fullVariants.visible).toHaveProperty('scale', 1)
    expect(fullVariants.hover).toHaveProperty('scale', 1.05)
  })

  it('should use shorter durations for reduced motion variants', () => {
    const reducedVariants = createScaleVariants(true)
    const fullVariants = createScaleVariants(false)

    // Reduced motion should use shorter duration
    expect((reducedVariants.visible as VariantWithTransition).transition?.duration).toBe(0.2)

    // Full motion should use longer duration
    expect((fullVariants.visible as VariantWithTransition).transition?.duration).toBe(0.4)
  })

  it('should use appropriate easing functions', () => {
    const fullVariants = createScaleVariants(false)

    // Should use consistent easing
    expect((fullVariants.visible as VariantWithTransition).transition?.ease).toEqual([0.4, 0, 0.2, 1])
    expect((fullVariants.hover as VariantWithTransition).transition?.ease).toEqual([0.4, 0, 0.2, 1])
  })
})

describe('Integration tests', () => {
  const mockMatchMedia = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia
    })
  })

  it('should work together - hook and variant functions', () => {
    mockMatchMedia.mockReturnValue({
      matches: true, // User prefers reduced motion
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    })

    const { result } = renderHook(() => useReducedMotion())
    const prefersReducedMotion = result.current

    const motionVariants = createMotionVariants(prefersReducedMotion)
    const scaleVariants = createScaleVariants(prefersReducedMotion)

    // Should both be using reduced motion variants
    expect((motionVariants.visible as VariantWithTransition).transition?.duration).toBe(0.2)
    expect((scaleVariants.visible as VariantWithTransition).transition?.duration).toBe(0.2)

    // Should not have complex animations
    expect(motionVariants.hidden).not.toHaveProperty('y')
    expect(scaleVariants.hidden).not.toHaveProperty('scale')
  })

  it('should handle browser without matchMedia support', () => {
    // Remove matchMedia to simulate older browsers
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error - Testing fallback scenario
    delete window.matchMedia

    const { result } = renderHook(() => useReducedMotion())

    // Should use initial state when matchMedia is not available
    // The hook initializes with false, but may update during useEffect
    expect(typeof result.current).toBe('boolean')

    // Restore matchMedia
    window.matchMedia = originalMatchMedia
  })
})