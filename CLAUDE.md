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

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production (includes RSS & sitemap generation)
npm run build

# Export for static hosting (includes RSS & sitemap generation)
npm run export

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Generate RSS feed
npm run generate-rss

# Generate sitemap
npm run generate-sitemap

# Generate both RSS and sitemap
npm run generate-seo
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
│   └── blog/              # Blog-specific components (BlogCard, BlogContent, ReadingProgressBar)
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
public/                    # Static assets (includes generated RSS & sitemap)
```

## Architecture Notes

### Component System
- Uses a shadcn/ui-inspired design system with custom Tailwind colors
- Components are built with composition in mind using React forwardRef patterns
- CSS variables for theming with HSL color values for better dark mode support

### Styling Approach
- Tailwind CSS with custom design tokens defined in CSS variables
- Uses `cn()` utility function (clsx + tailwind-merge) for conditional classes
- Responsive design with mobile-first approach

### Type Safety
- Comprehensive TypeScript types in `src/lib/types.ts`
- Interfaces for Project, BlogPost, and ContactForm entities
- Strict TypeScript configuration

### Blog System
- **JSON-based content management**: Articles stored in `src/content/blog/articles.json` for easy editing
- **React Markdown rendering**: GitHub Flavored Markdown support with remark-gfm
- **Dynamic routing**: Blog posts use `[slug]` dynamic routing pattern
- **Rich metadata**: Each post includes title, description, tags, publication date, and featured status
- **Content utilities**: Post filtering, sorting, tag management, and reading time calculation
- **SEO-optimized**: Structured data, metadata generation, and RSS feed integration

### RSS & Sitemap Generation
- Automated RSS feed generation for blog posts
- Sitemap generation for SEO optimization
- Build process integration via Node.js scripts in `scripts/` directory
- Environment-aware URL generation (development vs production)
- RSS feeds include proper metadata, categories, and XML escaping

### SEO & Performance
- Structured data with JSON-LD for blog posts
- Dynamic metadata generation for all pages
- RSS feed linked in HTML head for feed discovery
- Sitemap includes proper lastmod dates and priority values
- Theme provider with system preference detection

### Reading Progress System
- **Performance optimized**: Uses `requestAnimationFrame` for smooth 60fps updates
- **Accessibility compliant**: ARIA progressbar with screen reader support and reduced motion support
- **Configurable thresholds**: Shows at 1% progress, hides at 95% completion
- **Automatic content detection**: Works with any CSS selector (defaults to `article`)
- **Smooth animations**: Framer Motion spring physics for natural feel
- **Visibility controls**: Smart show/hide logic based on scroll progress

### Content Management
- Static project data can be stored in `src/content/projects/`
- Utility functions for date formatting and reading time calculation

## Code Quality Standards

This project prioritizes **readability**, **maintainability**, **YAGNI compliance**, and adherence to **React/Next.js/TypeScript best practices**.

### 📚 Readability Principles
- **Clear naming**: Use descriptive variable and function names that explain intent
- **Consistent formatting**: Follow established patterns for imports, exports, and structure
- **Logical organization**: Group related functionality together
- **Minimal cognitive load**: Keep functions and components focused on a single responsibility
- **Self-documenting code**: Write code that explains itself; add JSDoc for complex logic

### 🔧 Maintainability Focus
- **Small, focused components**: Keep components under 100 lines when possible
- **Single responsibility**: Each component/function should have one clear purpose
- **DRY principles**: Extract reusable logic into custom hooks or utility functions
- **Clear separation of concerns**: UI logic separate from business logic
- **Consistent patterns**: Follow established architectural patterns throughout the codebase
- **Proper abstraction**: Create reusable components and utilities, but avoid over-abstraction

### 🎯 YAGNI Compliance (You Aren't Gonna Need It)
- **Implement only what's needed**: Don't build features "just in case"
- **Avoid premature optimization**: Optimize when performance issues are identified
- **Simple solutions first**: Choose the simplest approach that meets current requirements
- **Resist over-engineering**: Don't add complexity for hypothetical future needs
- **Delete unused code**: Remove commented code, unused imports, and dead code paths

### ⚛️ React Best Practices
- **Composition over inheritance**: Use component composition for flexibility
- **Custom hooks**: Extract stateful logic into reusable custom hooks
- **Performance optimization**: Use `useCallback`, `useMemo`, and `React.memo` judiciously
- **Component size**: Break large components into smaller, focused sub-components
- **State management**: Keep state as local as possible, lift up only when necessary
- **Error boundaries**: Implement error boundaries for robust error handling

### 🚀 Next.js Best Practices
- **App Router patterns**: Use proper server/client component separation
- **SEO optimization**: Implement metadata API and structured data
- **Performance**: Leverage `next/image`, `next/link`, and built-in optimizations
- **Static generation**: Use static generation where possible for better performance
- **API routes**: Keep API routes focused and well-structured
- **Environment configuration**: Use environment variables for configuration

### 🔷 TypeScript Best Practices
- **Strict typing**: Enable strict mode and avoid `any` type
- **Interface definitions**: Create clear, well-documented interfaces
- **Utility types**: Use TypeScript utility types for common patterns
- **Branded types**: Use branded types for better type safety (e.g., `BlogSlug`)
- **Type guards**: Implement type guards for runtime type checking
- **Generic types**: Use generics for reusable, type-safe functions

## Key Features

### ✅ Implemented Features
1. **Hero Section** - Animated introduction with social links
2. **Projects Showcase** - Interactive grid with filtering
3. **Blog Section** - JSON-powered articles with full blog layout
4. **Contact Form** - React Hook Form with Zod validation
5. **Dark Mode** - next-themes implementation with system preference
6. **SEO Optimization** - Metadata API, structured data, RSS feeds, and sitemap
7. **RSS Feed Generation** - Automated feed generation for blog posts
8. **Sitemap Generation** - SEO-optimized sitemap with proper metadata
9. **Blog Navigation** - Enhanced navigation with active link styling
10. **Content Management** - JSON-based blog system with filtering and search
11. **Reading Progress Indicator** - Smooth animated progress bar for blog posts

### 🚀 Potential Future Enhancements
- Blog post comments system
- Newsletter subscription
- Advanced blog filtering (by date range, multiple tags)
- Blog post series/categories
- Related posts suggestions

## Development Guidelines

### 🏗️ Component Architecture
- **Follow established patterns**: Use existing component patterns in `src/components/ui/`
- **Component hierarchy**: Organize components by domain (ui/, sections/, layout/, blog/)
- **Props interface**: Define clear, well-typed props interfaces for all components
- **Forwarded refs**: Use `React.forwardRef` for components that need DOM access
- **Composition patterns**: Prefer composition over prop drilling for complex components

### 🎨 Styling & UI
- **Tailwind utilities**: Use Tailwind CSS classes for styling
- **Conditional classes**: Use `cn()` utility for className merging and conditional styles
- **Design system**: Follow the established design tokens and color variables
- **Responsive design**: Implement mobile-first responsive design patterns
- **Animations**: Use Framer Motion for smooth, meaningful animations
- **Accessibility**: Ensure WCAG compliance with semantic HTML and ARIA labels

### 🔗 Navigation & Routing
- **Next.js Link**: Use `next/link` for internal navigation
- **Smooth scrolling**: Implement smooth scrolling for hash-based navigation
- **Active states**: Provide clear visual feedback for active navigation items
- **SEO-friendly**: Ensure all routes are accessible and properly indexed

### 📊 Data Management
- **Type safety**: Use strict TypeScript types for all data structures
- **Custom hooks**: Extract data logic into reusable custom hooks
- **State optimization**: Use `useMemo` and `useCallback` for expensive operations
- **Error handling**: Implement proper error boundaries and loading states

### 🧪 Testing & Quality
- **Type checking**: Run `npx tsc --noEmit` before committing
- **Linting**: Run `npm run lint` to ensure code quality
- **Performance**: Monitor component re-renders and optimize when necessary
- **Accessibility**: Test with screen readers and keyboard navigation

## Code Review Checklist

Before submitting code, ensure:

### ✅ Component Quality
- [ ] Component is under 100 lines (if larger, consider splitting)
- [ ] Single responsibility principle is followed
- [ ] Props are properly typed with interfaces
- [ ] No unused imports or variables
- [ ] Consistent naming conventions

### ✅ Performance
- [ ] `useCallback` used for functions passed to children
- [ ] `useMemo` used for expensive calculations
- [ ] No unnecessary re-renders
- [ ] Proper dependency arrays in hooks

### ✅ Type Safety
- [ ] No `any` types used
- [ ] All props and state properly typed
- [ ] Event handlers have correct types
- [ ] No TypeScript errors or warnings

### ✅ Code Organization
- [ ] Related code is grouped together
- [ ] Imports are organized (React, libraries, local)
- [ ] Files are in appropriate directories
- [ ] JSDoc comments for complex functions

### ✅ Accessibility & UX
- [ ] Semantic HTML elements used
- [ ] ARIA labels where necessary
- [ ] Keyboard navigation support
- [ ] Color contrast meets standards
- [ ] Loading and error states handled

## Anti-Patterns to Avoid

### ❌ Component Anti-Patterns
- **Monolithic components**: Components over 150 lines
- **Prop drilling**: Passing props through multiple levels
- **Mixed concerns**: Mixing UI logic with business logic
- **Inline styles**: Using style props instead of Tailwind classes
- **Direct DOM manipulation**: Using refs to manipulate DOM directly

### ❌ React Anti-Patterns
- **Missing dependency arrays**: useEffect without proper dependencies
- **Mutating state**: Directly modifying state objects
- **Using array indices as keys**: Using unstable keys in lists
- **Unnecessary state**: Creating state for derived values
- **Class component patterns**: Using legacy patterns in functional components

### ❌ TypeScript Anti-Patterns
- **Using `any`**: Avoiding proper typing
- **Type assertions**: Using `as` without proper validation
- **Optional everything**: Making all props optional
- **Interface pollution**: Adding unrelated properties to interfaces
- **Ignoring strict mode**: Disabling TypeScript strict checks

### ❌ Performance Anti-Patterns
- **Premature optimization**: Optimizing without measuring
- **Missing memoization**: Not memoizing expensive calculations
- **Excessive memoization**: Memoizing everything unnecessarily
- **Large bundle sizes**: Including unused libraries
- **Synchronous operations**: Blocking the main thread unnecessarily