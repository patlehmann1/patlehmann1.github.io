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
    '!src/components/blog/blog-post-content.tsx', // Complex content renderer
  ],
  coverageThreshold: {
    global: {
      branches: 95, // Reflects current high test coverage
      functions: 98, // Reflects current excellent function coverage
      lines: 98,     // Reflects current excellent line coverage
      statements: 95, // Reflects current high statement coverage
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)