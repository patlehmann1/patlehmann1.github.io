import '@testing-library/jest-dom'

/**
 * Global Test Setup & Mocking Strategy
 *
 * This file contains global mocks that are used across most/all tests.
 *
 * Mocking Philosophy:
 * - Mock external dependencies that don't add value to component tests (Next.js internals, browser APIs)
 * - Mock heavy animation libraries to improve test performance
 * - Keep mocks minimal - prefer testing real implementations when possible
 * - Document WHY each mock exists
 */

// NOTE: lucide-react icons are NOT mocked globally because:
// 1. Different tests need different icons with different test-ids
// 2. setupTests.ts doesn't support JSX syntax (it's .ts not .tsx)
// 3. Per-test mocking gives better control and clearer test intent
// Each test file mocks only the icons it uses with appropriate test-ids

// Mock next/navigation
// WHY: Next.js router is server-side and not available in Jest's jsdom environment
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock framer-motion
// WHY: Animation library is heavy and animations don't need to run in tests
// NOTE: Tests can override this mock per-file if they need to test animation props
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    button: 'button',
    form: 'form',
    input: 'input',
    article: 'article',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock next-themes
// WHY: Theme provider needs client-side environment, default to 'light' for consistency
// NOTE: Tests can override useTheme mock per-file to test theme-specific behavior
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    systemTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock global fetch for API tests
// WHY: Fetch is not available in Jest's jsdom environment
global.fetch = jest.fn()

// Setup window.matchMedia for responsive tests
// WHY: matchMedia is not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver for components using framer-motion whileInView
// WHY: IntersectionObserver is not implemented in jsdom
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock scrollTo for smooth scroll tests
// WHY: scrollTo is not implemented in jsdom
global.scrollTo = jest.fn()