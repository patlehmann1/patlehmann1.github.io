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
    // Exclude remaining large UI components that don't have tests yet
    '!src/components/sections/**',
    '!src/components/layout/**',
    '!src/components/blog/blog-post-content.tsx', // Complex content renderer
    '!src/components/blog/reading-progress-bar.tsx', // UI component with simple logic
    '!src/lib/rss.ts', // RSS generation utility
  ],
  coverageThreshold: {
    global: {
      branches: 90, // Aggressive but achievable
      functions: 90, // High standard for tested functions
      lines: 90,     // Comprehensive line coverage
      statements: 90, // Strong statement coverage
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)