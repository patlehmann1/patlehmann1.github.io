# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal software developer portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a modern design with animations, dark mode support, and optimized performance for showcasing projects and technical expertise.

## Tech Stack

- **Next.js 14** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **MDX** for content management (blog posts)
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons
- **next-themes** for dark/light mode (when implemented)

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Tailwind CSS
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components (Button, etc.)
│   └── sections/          # Page sections (Hero, About, Projects)
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions (cn helper, formatters)
├── content/
│   ├── projects/          # Project data and content
│   └── blog/              # Blog posts in MDX format
public/                    # Static assets
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

### Content Management
- MDX for blog posts with frontmatter support
- Static project data can be stored in `src/content/projects/`
- Utility functions for date formatting and reading time calculation

## Key Features to Implement

1. **Hero Section** - Animated introduction with social links
2. **Projects Showcase** - Interactive grid with filtering
3. **Blog Section** - MDX-powered articles
4. **Contact Form** - React Hook Form with Zod validation
5. **Dark Mode** - next-themes implementation
6. **SEO Optimization** - Metadata API and structured data

## Development Guidelines

- Follow the established component patterns in `src/components/ui/`
- Use the `cn()` utility for className merging
- Implement animations with Framer Motion for enhanced UX
- Maintain type safety with proper TypeScript interfaces
- Use semantic HTML and accessibility best practices