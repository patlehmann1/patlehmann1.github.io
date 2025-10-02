# Architecture & System Design

This document provides detailed information about the system architecture, design patterns, and technical implementation of the portfolio website.

## Component System

### Design System Architecture
- Uses a shadcn/ui-inspired design system with custom Tailwind colors
- Components are built with composition in mind using React forwardRef patterns
- CSS variables for theming with HSL color values for better dark mode support
- Consistent component hierarchy organized by domain (ui/, sections/, layout/, blog/)

### Component Patterns
- **Props interface**: Clear, well-typed props interfaces for all components
- **Forwarded refs**: React.forwardRef for components that need DOM access
- **Composition patterns**: Prefer composition over prop drilling for complex components
- **Single responsibility**: Each component focuses on one clear purpose

## Styling Approach

### Tailwind CSS Implementation
- Custom design tokens defined in CSS variables
- Uses `cn()` utility function (clsx + tailwind-merge) for conditional classes
- Responsive design with mobile-first approach
- Design system follows established color variables and tokens

### Theming System
- CSS variables with HSL color values for better dark mode support
- next-themes integration with system preference detection
- Consistent color tokens across components using primary/secondary/accent patterns

## Type Safety Architecture

### TypeScript Configuration
- Comprehensive TypeScript types in `src/lib/types.ts`
- Interfaces for Project, BlogPost, and ContactForm entities
- Strict TypeScript configuration with no `any` types
- Branded types for better type safety (e.g., `BlogSlug`)

### Type Patterns
- **Interface definitions**: Clear, well-documented interfaces
- **Utility types**: TypeScript utility types for common patterns
- **Type guards**: Runtime type checking where needed
- **Generic types**: Reusable, type-safe functions

## Blog System Architecture

### Content Management
- **JSON-based content management**: Articles stored in `src/content/blog/articles.json` for easy editing
- **Dynamic routing**: Blog posts use `[slug]` dynamic routing pattern
- **Rich metadata**: Each post includes title, description, tags, publication date, and featured status

### Content Processing
- **React Markdown rendering**: GitHub Flavored Markdown support with remark-gfm
- **Content utilities**: Post filtering, sorting, tag management, and reading time calculation
- **SEO-optimized**: Structured data, metadata generation, and RSS feed integration

### Blog Features
- **Filtering system**: Tag-based filtering with search functionality
- **Reading progress**: Smooth animated progress bar for blog posts
- **Navigation**: Enhanced navigation with active link styling
- **Featured posts**: Support for featured post highlighting

## RSS & Sitemap Generation

### Build Process Integration
- Automated RSS feed generation for blog posts via Node.js scripts in `scripts/` directory
- Sitemap generation for SEO optimization
- Environment-aware URL generation (development vs production)
- Build process integration via npm scripts

### Feed Management
- RSS feeds include proper metadata, categories, and XML escaping
- Dynamic feed generation based on blog post content
- Proper content formatting and date handling

## SEO & Performance Architecture

### Metadata Generation
- Structured data with JSON-LD for blog posts
- Dynamic metadata generation for all pages using Next.js Metadata API
- RSS feed linked in HTML head for feed discovery
- Sitemap includes proper lastmod dates and priority values

### Performance Optimizations
- Theme provider with system preference detection
- Static generation where possible for better performance
- Next.js built-in optimizations (Image, Link components)
- Proper loading states and error boundaries

## Reading Progress System

### Implementation Details
- **Performance optimized**: Uses `requestAnimationFrame` for smooth 60fps updates
- **Accessibility compliant**: ARIA progressbar with screen reader support and reduced motion support
- **Configurable thresholds**: Shows at 1% progress, hides at 95% completion
- **Automatic content detection**: Works with any CSS selector (defaults to `article`)

### Animation System
- **Smooth animations**: Framer Motion spring physics for natural feel
- **Visibility controls**: Smart show/hide logic based on scroll progress
- **Responsive design**: Adapts to different screen sizes and content lengths

## Data Flow Architecture

### State Management
- Local state management with React hooks
- Custom hooks for reusable stateful logic (useScrollToSection, useBlogFiltering, useReadingProgress)
- State optimization with useMemo and useCallback for expensive operations

### Content Management
- Static project data stored in `src/content/projects/`
- JSON-based blog content with utility functions for processing
- Utility functions for date formatting and reading time calculation

## Navigation & Routing

### Next.js App Router
- App Router pattern with proper server/client component separation
- Dynamic routing for blog posts with `[slug]` pattern
- Smooth scrolling implementation for hash-based navigation
- SEO-friendly routing with proper metadata

### Navigation Features
- **Smooth scrolling**: Custom hook for hash-based navigation
- **Active states**: Visual feedback for active navigation items
- **Mobile navigation**: Responsive navigation patterns
- **Accessibility**: Keyboard navigation support

## Newsletter System Architecture

### Kit.com Integration
- React Hook Form + Zod validation for form handling
- API integration with ConvertKit V4 endpoints
- Proper error handling and loading states
- Form validation with user-friendly error messages

### Form Management
- Type-safe form validation with Zod schemas
- Async form submission with proper loading indicators
- Success and error state management
- Accessibility-compliant form structure

## Static Site Generation

### Build Process
- Next.js static export functionality
- RSS and sitemap generation during build
- Optimized asset generation and bundling
- Environment-specific configuration

### Deployment Architecture
- Static site hosting compatibility
- CDN-friendly asset structure
- Proper caching headers and optimization
- Build-time content processing