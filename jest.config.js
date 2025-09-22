const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
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
    '!src/app/**', // Exclude Next.js app directory from coverage
    // Exclude large UI components that don't have tests yet
    '!src/components/sections/**',
    '!src/components/layout/**',
    '!src/components/blog/**',
    '!src/components/ui/theme-toggle.tsx',
    '!src/hooks/useBlogFiltering.ts',
    '!src/hooks/useReadingProgress.ts',
    '!src/lib/rss.ts',
    '!src/lib/ui-utils.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 25, // Temporarily lower for current codebase state
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)