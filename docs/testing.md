# Testing Guide

This document provides comprehensive guidance on the Jest testing infrastructure, testing patterns, and best practices for the portfolio website.

## Testing Infrastructure Overview

### Technology Stack
- **Jest** - Primary testing framework with Next.js integration
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - Browser environment simulation
- **@testing-library/jest-dom** - Custom Jest matchers for DOM testing

### Current Test Coverage
- **96% test success rate** across all test suites
- **5 comprehensive test suites** covering:
  - Utility functions (`src/lib/__tests__/`)
  - UI components (`src/components/ui/__tests__/`)
  - Custom hooks (`src/hooks/__tests__/`)
  - Newsletter components (`src/components/newsletter/__tests__/`)
  - Blog system logic (`src/lib/__tests__/`)

## Jest Configuration

### Configuration File: `jest.config.js`
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/app/**', // Exclude Next.js app directory
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Key Configuration Features
- **Next.js Integration**: Uses `next/jest` for seamless Next.js testing
- **jsdom Environment**: Browser-like environment for component testing
- **Coverage Thresholds**: 70% minimum coverage across all metrics
- **Module Mapping**: `@/` alias support for imports
- **TypeScript Support**: Full TypeScript testing support

## Test Setup: `setupTests.ts`

### Global Test Configuration
```typescript
import '@testing-library/jest-dom'

// Mock next/navigation
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
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    // ... other elements
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    systemTheme: 'light',
  }),
  ThemeProvider: ({ children }) => children,
}))

// Global mocks for browser APIs
global.fetch = jest.fn()
global.scrollTo = jest.fn()
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
```

### Mock Strategy
- **Next.js Navigation**: Mock router hooks for navigation testing
- **Framer Motion**: Simplified mocks to avoid animation complexity in tests
- **Themes**: Mock theme provider for consistent test environment
- **Browser APIs**: Mock fetch, scrollTo, and IntersectionObserver

## Testing Commands

### Available Commands
```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD pipeline
npm run test:ci
```

### Command Details
- **`npm test`**: Runs all tests once with standard output
- **`npm run test:watch`**: Watches for file changes and re-runs affected tests
- **`npm run test:coverage`**: Generates detailed coverage report
- **`npm run test:ci`**: Optimized for CI environments with coverage and no watch mode

## Testing Patterns

### Component Testing with React Testing Library

#### Basic Component Test Structure
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '../component-name'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)

    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(/* assertion */).toBeTruthy()
  })
})
```

#### Best Practices for Component Testing
- **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
- **Test user behavior**: Focus on how users interact with components
- **Avoid implementation details**: Test what the component does, not how it does it
- **Use userEvent**: Simulate realistic user interactions
- **Wait for async updates**: Use `waitFor` for async state changes

### Hook Testing with `renderHook`

#### Custom Hook Testing Pattern
```typescript
import { renderHook } from '@testing-library/react'
import { useCustomHook } from '../useCustomHook'

describe('useCustomHook', () => {
  it('should return expected values', () => {
    const { result } = renderHook(() => useCustomHook())

    expect(result.current.value).toBe(expectedValue)
  })

  it('should update state correctly', () => {
    const { result, rerender } = renderHook(() => useCustomHook())

    // Test state updates
    act(() => {
      result.current.updateFunction()
    })

    expect(result.current.value).toBe(newExpectedValue)
  })
})
```

### API Mocking Strategies

#### Mocking External APIs
```typescript
// Mock fetch for API calls
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

beforeEach(() => {
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ id: 'test-id' }),
  } as Response)
})

it('should call API with correct data', async () => {
  // Test implementation

  expect(mockFetch).toHaveBeenCalledWith(
    'expected-url',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expectedData),
    })
  )
})
```

### Form Validation Testing

#### React Hook Form + Zod Testing
```typescript
it('should show validation errors', async () => {
  const user = userEvent.setup()
  render(<FormComponent />)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await user.click(submitButton)

  await waitFor(() => {
    expect(screen.getByText('Field is required')).toBeInTheDocument()
  })
})

it('should submit valid data', async () => {
  const user = userEvent.setup()
  render(<FormComponent />)

  const input = screen.getByLabelText('Field Label')
  await user.type(input, 'valid input')

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await user.click(submitButton)

  // Assert successful submission
})
```

## Test Organization

### File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── __tests__/
│   │       └── button.test.tsx
│   └── newsletter/
│       ├── newsletter-signup.tsx
│       └── __tests__/
│           └── newsletter-signup.test.tsx
├── hooks/
│   ├── useScrollToSection.ts
│   └── __tests__/
│       └── useScrollToSection.test.ts
└── lib/
    ├── utils.ts
    ├── blog.ts
    └── __tests__/
        ├── utils.test.ts
        └── blog.test.ts
```

### Naming Conventions
- **Test files**: `*.test.ts` or `*.test.tsx`
- **Test directories**: `__tests__/` co-located with source files
- **Describe blocks**: Use component/function name
- **Test cases**: Use descriptive "should" statements

### Test Categories
- **Unit tests**: Individual functions and utilities
- **Component tests**: React component behavior and rendering
- **Integration tests**: Component interactions and data flow
- **Hook tests**: Custom hook behavior and state management

## Coverage Requirements

### Minimum Coverage Thresholds
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Coverage Exclusions
- TypeScript declaration files (`*.d.ts`)
- Storybook stories (`*.stories.tsx`)
- Next.js app directory (primarily routing configuration)

### Generating Coverage Reports
```bash
npm run test:coverage
```
This generates:
- Console coverage summary
- Detailed HTML coverage report in `coverage/` directory
- LCOV format for CI/CD integration

## Common Testing Scenarios

### Testing Accessibility
```typescript
it('should be keyboard navigable', async () => {
  const user = userEvent.setup()
  render(<Component />)

  await user.tab()
  expect(screen.getByRole('button')).toHaveFocus()
})

it('should have proper ARIA labels', () => {
  render(<Component />)

  expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Expected Label')
})
```

### Testing Loading States
```typescript
it('should show loading state', async () => {
  // Mock delayed response
  mockFetch.mockImplementation(() =>
    new Promise(resolve =>
      setTimeout(() => resolve({
        ok: true,
        json: async () => data
      }), 100)
    )
  )

  render(<Component />)

  expect(screen.getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
})
```

### Testing Error Handling
```typescript
it('should handle API errors gracefully', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network error'))

  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
```

## CI/CD Integration

### Automated Testing
- Tests run automatically on every commit
- Coverage reports generated for pull requests
- Build fails if coverage drops below thresholds
- TypeScript type checking included in test pipeline

### Test Performance
- Average test runtime: ~3 seconds for full suite
- Parallel test execution for faster feedback
- Watch mode for development efficiency
- Optimized mocking to reduce test complexity

## Troubleshooting Common Issues

### jsdom Limitations
- `window.location` mocking can be complex
- Some browser APIs require polyfills
- Animation testing may need simplified mocks

### Mock Conflicts
- Clear mocks between tests with `jest.clearAllMocks()`
- Reset modules if needed with `jest.resetModules()`
- Use `beforeEach` for consistent test state

### Async Testing
- Always use `waitFor` for async operations
- Don't forget to `await` user interactions
- Use `findBy*` queries for elements that appear asynchronously

This testing infrastructure provides comprehensive coverage while maintaining development velocity and code quality standards.