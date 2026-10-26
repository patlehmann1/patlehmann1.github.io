# Patrick Lehmann - Portfolio Website

A modern, performant portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a comprehensive blog system, multi-theme design with synthwave aesthetics, interactive particle effects, and professional contact integration.

🌐 **Live Site:** [patricklehmann.io](https://patricklehmann.io)

## About

This is my personal portfolio website showcasing my work as a Full-Stack Software Engineer with 6+ years of experience in C#/.NET, TypeScript, and modern web frameworks. The site features a blog with advanced accessibility features, project portfolio, and professional contact options.

## Key Features

- ✨ **Modern Design** - Clean, professional interface with smooth animations and particle effects
- 🎨 **Multi-Theme System** - 6 distinct themes including synthwave/retrowave with neon effects (light, dark, ocean, forest, synthwave, minimal)
- 🎵 **Music Integration** - Embedded Apple Music player with curated developer playlist
- 💫 **Interactive Particle Background** - Three.js powered particle system with mouse interaction
- 📝 **Blog System** - JSON-powered blog with markdown support, syntax highlighting, and RSS feed
- 🔊 **Text-to-Speech** - Accessible blog post narration with customizable voice settings
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Performance Optimized** - Built with Next.js 15 and Turbopack for fast development and production builds
- 🧪 **Comprehensive Testing** - 93%+ test coverage with Jest and React Testing Library (814 tests)
- 🔍 **SEO Optimized** - Automated sitemap and RSS feed generation
- 📬 **Newsletter Integration** - Kit.com integration with custom domain

## Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS with custom design system

### UI & Animations
- **Framer Motion** - Smooth, accessible animations
- **Three.js + @react-three/fiber** - 3D particle animations and visual effects
- **@react-three/drei** - Three.js utilities
- **Lucide React** - Modern icon library
- **next-themes** - Multi-theme support (7 themes)
- **Geist & Geist Mono** - Modern font system

### Content & Forms
- **React Markdown** - Blog content rendering
- **React Syntax Highlighter** - Code syntax highlighting
- **React Hook Form + Zod** - Form validation
- **Remark GFM** - GitHub Flavored Markdown support

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/dom** - DOM testing utilities
- Coverage: 93.08% statements, 88.72% branches, 96.13% functions (814 tests)

## Getting Started

### Prerequisites
- Node.js 18+ or Yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/patlehmann1/patlehmann1.github.io.git
cd patlehmann1.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

### Available Scripts

```bash
# Development
npm run dev                 # Start dev server
npm run build               # Production build (includes RSS & sitemap)
npm run export              # Static export for GitHub Pages
npm start                   # Serve the static export in out/

# Code Quality
npm run lint                # Run ESLint
npx tsc --noEmit            # TypeScript type checking

# Testing
npm test                    # Run all tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage report
npm run test:ci             # Run tests for CI/CD

# SEO
npm run generate-rss        # Generate RSS feed
npm run generate-sitemap    # Generate sitemap
npm run generate-seo        # Generate both RSS and sitemap

# Version Management
npm run version:patch       # Bug fixes (1.0.0 → 1.0.1)
npm run version:minor       # New features (1.0.0 → 1.1.0)
npm run version:major       # Breaking changes (1.0.0 → 2.0.0)
```

### Quality Gates

All PRs must pass:
- ✅ ESLint checks (no errors)
- ✅ TypeScript compilation (no errors)
- ✅ All tests passing (814 tests)
- ✅ Coverage thresholds (70%+ minimum, currently 93%+)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── blog/              # Blog pages and layouts
├── components/
│   ├── blog/              # Blog-specific components
│   ├── layout/            # Navigation components
│   ├── newsletter/        # Newsletter signup
│   ├── sections/          # Page sections (Hero, About, Projects, etc.)
│   └── ui/                # Reusable UI components
├── content/
│   ├── blog/              # Blog posts (JSON format)
│   └── projects/          # Project data
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
└── __tests__/            # Test files

public/                    # Static assets
scripts/                   # Build scripts (RSS, sitemap generation)
docs/                      # Detailed documentation
```

## Testing

The project maintains high test coverage with comprehensive unit and integration tests:

```bash
# Run all tests
npm run test

# Run with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

Current coverage: **93.08% statements** | **88.72% branches** | **96.13% functions** | **94.39% lines** (814 tests)

## Deployment

The site is deployed to GitHub Pages with automated CI/CD:

1. Push to `master` branch triggers GitHub Actions
2. Quality gates run (linting, type checking, tests)
3. Production build generates static files
4. Deploys to GitHub Pages

The CI/CD pipeline includes security audits and comprehensive testing to ensure production quality.

## Documentation

For detailed information, see:
- [Architecture & Design](docs/architecture.md)
- [Testing Guide](docs/testing.md)
- [Development Guidelines](docs/development-guidelines.md)
- [Code Review Checklist](docs/code-review-checklist.md)
- [CLAUDE.md](CLAUDE.md) - AI assistant context

## Features Breakdown

### Multi-Theme System
- 6 distinct themes: light, dark, ocean, forest, synthwave, minimal
- Synthwave/retrowave theme with electric neon colors and glow effects
- System preference detection
- Smooth theme transitions
- Theme persistence across sessions

### Visual Effects
- Three.js particle background with 60 animated particles
- Mouse interaction with particle movement
- Connection lines between nearby particles
- Reduced motion support for accessibility
- Optimized rendering with frame-based updates

### Music Integration
- Embedded Apple Music player in About section
- "Lehmann Dev Mix" curated playlist
- 30-second previews for all users
- Full playback for Apple Music subscribers
- Responsive iframe with lazy loading

### Blog
- JSON-based content management
- Markdown rendering with GitHub Flavored Markdown
- Syntax highlighting for code blocks
- Reading time estimation
- Tag-based filtering and search
- RSS feed generation
- Text-to-speech with voice customization
- Reading progress indicator

### Projects
- Interactive project showcase
- Technology filtering
- Direct links to GitHub and live demos

### Contact
- Professional email integration
- Social media links (GitHub, LinkedIn)
- Newsletter subscription via Kit.com

## Performance

- **Lighthouse Score:** 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:** All green
- **Bundle Size:** Optimized with code splitting and lazy loading
- **Testing:** 814 tests with 93%+ coverage
- **Animations:** Hardware-accelerated with Framer Motion and Three.js
- **Accessibility:** Reduced motion support, ARIA labels, keyboard navigation

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Patrick Lehmann
- Website: [patricklehmann.io](https://patricklehmann.io)
- Email: contact@patricklehmann.io
- GitHub: [@patlehmann1](https://github.com/patlehmann1)
- LinkedIn: [patlehmann](https://linkedin.com/in/patlehmann)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
