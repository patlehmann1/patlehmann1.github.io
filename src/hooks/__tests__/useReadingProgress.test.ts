import { renderHook, act } from '@testing-library/react'
import { useReadingProgress } from '../useReadingProgress'

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn()
const mockCancelAnimationFrame = jest.fn()

global.requestAnimationFrame = mockRequestAnimationFrame
global.cancelAnimationFrame = mockCancelAnimationFrame

describe('useReadingProgress', () => {
  let mockElement: HTMLElement
  let originalInnerHeight: number

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequestAnimationFrame.mockImplementation((callback) => {
      callback(0)
      return 1
    })

    // Store original window.innerHeight
    originalInnerHeight = window.innerHeight

    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800
    })

    // Create a mock element
    mockElement = document.createElement('article')
    mockElement.style.height = '2000px'

    // Mock getBoundingClientRect
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 0,
      height: 2000,
      bottom: 2000
    })

    document.body.appendChild(mockElement)

    // Mock querySelector to return our mock element
    jest.spyOn(document, 'querySelector').mockReturnValue(mockElement)

    // Mock addEventListener and removeEventListener
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    // Restore original window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: originalInnerHeight
    })

    // Clean up DOM
    document.body.removeChild(mockElement)

    // Restore mocks
    jest.restoreAllMocks()
  })

  it('should initialize with default values when content is found', () => {
    const { result } = renderHook(() => useReadingProgress())

    expect(result.current.progress).toBe(0)
    expect(result.current.contentFound).toBe(true)
    expect(result.current.isVisible).toBe(false) // Below threshold
  })

  it('should handle content not found', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null)

    const { result } = renderHook(() => useReadingProgress())

    expect(result.current.progress).toBe(0)
    expect(result.current.contentFound).toBe(false)
    expect(result.current.isVisible).toBe(false)
  })

  it('should add and remove event listeners correctly', () => {
    const { unmount } = renderHook(() => useReadingProgress())

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should calculate progress correctly when content is visible', () => {
    // Mock element at top of viewport with some scrolled content
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -400, // 400px scrolled past top
      height: 2000,
      bottom: 1600 // 2000 - 400
    })

    const { result } = renderHook(() => useReadingProgress())

    act(() => {
      // Simulate scroll event
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    // Progress = scrolled / (contentHeight - windowHeight) * 100
    // Progress = 400 / (2000 - 800) * 100 = 400 / 1200 * 100 = 33.33%
    expect(result.current.progress).toBeCloseTo(33.33, 1)
  })

  it('should return 100% progress when content is completely scrolled past', () => {
    // Mock element completely above viewport
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -2000,
      height: 2000,
      bottom: 0
    })

    const { result } = renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBe(100)
  })

  it('should return 0% progress when content is below viewport', () => {
    // Mock element completely below viewport
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 1000, // Below viewport
      height: 2000,
      bottom: 3000
    })

    const { result } = renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBe(0)
  })

  it('should handle visibility thresholds correctly', () => {
    const { result } = renderHook(() => useReadingProgress({
      showThreshold: 0.1,
      hideThreshold: 0.9
    }))

    // Mock 15% progress (above show threshold)
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -180, // 180px scrolled
      height: 2000,
      bottom: 1820
    })

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBeCloseTo(15, 0)
    expect(result.current.isVisible).toBe(true)

    // Mock 95% progress (above hide threshold)
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -1140, // 95% scrolled
      height: 2000,
      bottom: 860
    })

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBeCloseTo(95, 0)
    expect(result.current.isVisible).toBe(false)
  })

  it('should use custom content selector', () => {
    const customElement = document.createElement('main')
    document.body.appendChild(customElement)

    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === 'main') return customElement
      return null
    })

    customElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 0,
      height: 1000,
      bottom: 1000
    })

    const { result } = renderHook(() => useReadingProgress({
      contentSelector: 'main'
    }))

    expect(document.querySelector).toHaveBeenCalledWith('main')
    expect(result.current.contentFound).toBe(true)

    document.body.removeChild(customElement)
  })

  it('should handle animation frame cancellation', () => {
    mockRequestAnimationFrame.mockReturnValue(123)

    const { unmount } = renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    unmount()

    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(123)
  })

  it('should throttle scroll events with requestAnimationFrame', () => {
    mockRequestAnimationFrame.mockImplementation((callback) => {
      setTimeout(callback, 0)
      return 1
    })

    renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
      window.dispatchEvent(scrollEvent)
      window.dispatchEvent(scrollEvent)
    })

    // Should cancel previous frame before requesting new one
    expect(mockCancelAnimationFrame).toHaveBeenCalled()
    expect(mockRequestAnimationFrame).toHaveBeenCalled()
  })

  it('should handle resize events', () => {
    renderHook(() => useReadingProgress())

    act(() => {
      const resizeEvent = new Event('resize')
      window.dispatchEvent(resizeEvent)
    })

    expect(mockRequestAnimationFrame).toHaveBeenCalled()
  })

  it('should handle edge case where content height equals window height', () => {
    // Mock element same height as window
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -400,
      height: 800, // Same as window height
      bottom: 400
    })

    const { result } = renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    // When content height = window height, totalScrollable = max(1, 800 - 800) = 1
    // Progress = 400 / 1 * 100 = 40000%, but clamped to 100%
    expect(result.current.progress).toBe(100)
  })

  it('should handle negative scroll values', () => {
    // Mock element partially above viewport but with positive top
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 100, // Still partially visible
      height: 2000,
      bottom: 2100
    })

    const { result } = renderHook(() => useReadingProgress())

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    // Scrolled should be max(0, -100) = 0
    expect(result.current.progress).toBe(0)
  })

  it('should update progress when element dimensions change', () => {
    const { result } = renderHook(() => useReadingProgress())

    // Initial state
    expect(result.current.progress).toBe(0)

    // Change element dimensions
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -600,
      height: 2000,
      bottom: 1400
    })

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBeCloseTo(50, 0)
  })

  it('should handle window resize affecting calculations', () => {
    const { result } = renderHook(() => useReadingProgress())

    // Change window height
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 600
    })

    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -700,
      height: 2000,
      bottom: 1300
    })

    act(() => {
      const resizeEvent = new Event('resize')
      window.dispatchEvent(resizeEvent)
    })

    // New calculation: 700 / (2000 - 600) * 100 = 700 / 1400 * 100 = 50%
    expect(result.current.progress).toBeCloseTo(50, 0)
  })

  it('should handle custom threshold values at boundaries', () => {
    const { result } = renderHook(() => useReadingProgress({
      showThreshold: 0,
      hideThreshold: 1
    }))

    // Mock 0% progress
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 0,
      height: 2000,
      bottom: 2000
    })

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBe(0)
    expect(result.current.isVisible).toBe(true) // 0 >= 0 and 0 <= 1

    // Mock 100% progress
    mockElement.getBoundingClientRect = jest.fn().mockReturnValue({
      top: -1200,
      height: 2000,
      bottom: 800
    })

    act(() => {
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
    })

    expect(result.current.progress).toBe(100)
    expect(result.current.isVisible).toBe(true) // 1 >= 0 and 1 <= 1
  })
})