# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal software developer portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a modern design with animations, dark mode support, and optimized performance for showcasing projects and technical expertise.

## Tech Stack

- **Next.js 14** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons
- **next-themes** for dark/light mode (implemented)
- **React Markdown + Remark GFM** for content rendering
- **JSON-based content management** for blog posts
- **RSS & Sitemap generation** for SEO optimization
- **Jest + React Testing Library** for comprehensive testing

## Development Commands

```bash
# Development
npm run dev                 # Start development server with Turbopack
npm run build              # Build for production (includes RSS & sitemap generation)
npm run export             # Export for static hosting (includes RSS & sitemap generation)
npm start                  # Start production server

# Code Quality
npm run lint               # Run linting
npx tsc --noEmit          # Type checking

# Testing
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:ci            # Run tests for CI/CD pipeline

# SEO Generation
npm run generate-rss       # Generate RSS feed
npm run generate-sitemap   # Generate sitemap
npm run generate-seo       # Generate both RSS and sitemap
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages and layout
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   ├── layout.tsx     # Blog layout component
│   │   ├── page.tsx       # Blog listing page
│   │   └── blog-client.tsx # Client-side blog components
│   ├── globals.css        # Global styles with Tailwind CSS
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components (Button, ThemeToggle)
│   ├── sections/          # Page sections (Hero, About, Projects, Blog)
│   ├── layout/            # Layout components (Navigation, sub-components)
│   ├── blog/              # Blog-specific components (BlogCard, BlogContent, ReadingProgressBar)
│   └── newsletter/        # Newsletter signup components
├── hooks/                 # Custom React hooks
│   ├── useScrollToSection.ts # Navigation with smooth scrolling
│   ├── useBlogFiltering.ts   # Blog filtering logic
│   └── useReadingProgress.ts # Reading progress tracking
├── lib/
│   ├── types.ts           # TypeScript type definitions and utility types
│   ├── utils.ts           # Utility functions (cn helper, formatters)
│   ├── ui-utils.ts        # UI-specific utility functions
│   ├── constants.ts       # Application constants and configuration
│   ├── blog.ts            # Blog data handling and utilities
│   └── rss.ts             # RSS feed generation
├── content/
│   ├── projects/          # Project data and content
│   └── blog/
│       └── articles.json  # Blog posts data (JSON format)
scripts/                   # Build and generation scripts
├── generate-rss.js        # RSS feed generation script
└── generate-sitemap.js    # Sitemap generation script
docs/                       # Detailed documentation
├── architecture.md        # System design and architecture details
├── testing.md             # Comprehensive testing guide
├── development-guidelines.md # Code quality and best practices
└── code-review-checklist.md # Review requirements and checklists
public/                     # Static assets (includes generated RSS & sitemap)
jest.config.js             # Jest testing configuration
setupTests.ts              # Global test setup and mocks
```

## Key Features

### ✅ Implemented Features
1. **Hero Section** - Animated introduction with social links
2. **Projects Showcase** - Interactive grid with filtering
3. **Blog Section** - JSON-powered articles with full blog layout
4. **Contact Form** - React Hook Form with Zod validation
5. **Newsletter Subscription** - Kit.com integration with form validation
6. **Dark Mode** - next-themes implementation with system preference
7. **SEO Optimization** - Metadata API, structured data, RSS feeds, and sitemap
8. **RSS Feed Generation** - Automated feed generation for blog posts
9. **Sitemap Generation** - SEO-optimized sitemap with proper metadata
10. **Blog Navigation** - Enhanced navigation with active link styling
11. **Content Management** - JSON-based blog system with filtering and search
12. **Reading Progress Indicator** - Smooth animated progress bar for blog posts
13. **Comprehensive Jest Testing Suite** - 96% test success rate with full coverage

### 🚀 Potential Future Enhancements
- Blog post comments system
- Advanced blog filtering (by date range, multiple tags)
- Blog post series/categories
- Related posts suggestions

## 📖 Detailed Documentation

For comprehensive information about specific aspects of the project, refer to these detailed guides:

- **[🏗️ Architecture & System Design](docs/architecture.md)** - Component system, styling approach, blog architecture, SEO implementation, and technical details
- **[🧪 Testing Guide](docs/testing.md)** - Jest configuration, testing patterns, coverage requirements, and testing best practices
- **[📝 Development Guidelines](docs/development-guidelines.md)** - Code quality standards, React/Next.js/TypeScript best practices, and anti-patterns to avoid
- **[✅ Code Review Checklist](docs/code-review-checklist.md)** - Comprehensive review requirements, quality checks, and approval criteria

## Quick Reference

### Essential Guidelines
- **Readability**: Write self-documenting code with clear naming and structure
- **Maintainability**: Keep components focused, use composition, follow DRY principles
- **YAGNI Compliance**: Implement only what's needed, avoid over-engineering
- **Type Safety**: Use strict TypeScript, avoid `any`, implement proper interfaces
- **Testing**: Write tests for new features, maintain 70% coverage minimum

### Before Committing
- [ ] Run `npm test` - All tests pass
- [ ] Run `npx tsc --noEmit` - No TypeScript errors
- [ ] Run `npm run lint` - No linting issues
- [ ] Review relevant checklist items in [Code Review Checklist](docs/code-review-checklist.md)

### Architecture Patterns
- **Component Organization**: Domain-based structure (ui/, sections/, layout/, blog/)
- **State Management**: Local state with custom hooks, context for global state
- **Styling**: Tailwind CSS with design system tokens, `cn()` utility for conditional classes
- **Testing**: React Testing Library for components, Jest for utilities, comprehensive mocking

For detailed implementation patterns, architectural decisions, and comprehensive guidelines, please refer to the linked documentation files above.