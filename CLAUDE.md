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
│   ├── layout/            # Layout components (Navigation)
│   └── blog/              # Blog-specific components
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions (cn helper, formatters)
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

### Content Management
- Static project data can be stored in `src/content/projects/`
- Utility functions for date formatting and reading time calculation

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

### 🚀 Potential Future Enhancements
- Blog post comments system
- Newsletter subscription
- Advanced blog filtering (by date range, multiple tags)
- Blog post series/categories
- Reading progress indicator
- Related posts suggestions

## Development Guidelines

- Follow the established component patterns in `src/components/ui/`
- Use the `cn()` utility for className merging
- Implement animations with Framer Motion for enhanced UX
- Maintain type safety with proper TypeScript interfaces
- Use semantic HTML and accessibility best practices