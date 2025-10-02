# Development Guidelines

This document outlines the coding standards, best practices, and development patterns that should be followed when contributing to the portfolio website.

## Code Quality Standards

This project prioritizes **readability**, **maintainability**, **YAGNI compliance**, and adherence to **React/Next.js/TypeScript best practices**.

### 📚 Readability Principles

#### Clear Naming
- Use descriptive variable and function names that explain intent
- Avoid abbreviations unless they are universally understood
- Use consistent naming conventions across the codebase
- Boolean variables should be prefixed with `is`, `has`, `can`, `should`

#### Consistent Formatting
- Follow established patterns for imports, exports, and structure
- Use consistent indentation and spacing
- Group related code together logically
- Follow the existing code style patterns

#### Logical Organization
- Group related functionality together
- Separate concerns appropriately
- Use clear module boundaries
- Keep related files in proximity

#### Minimal Cognitive Load
- Keep functions and components focused on a single responsibility
- Avoid deeply nested conditional logic
- Use early returns to reduce nesting
- Break complex operations into smaller, named functions

#### Self-Documenting Code
- Write code that explains itself through clear structure and naming
- Add JSDoc comments for complex logic or public APIs
- Use TypeScript types to document expected data structures
- Prefer explicit over implicit behavior

### 🔧 Maintainability Focus

#### Small, Focused Components
- Keep components under 100 lines when possible
- If a component exceeds 150 lines, consider breaking it down
- Each component should have a single, clear purpose
- Use composition to build complex UIs from simple components

#### Single Responsibility Principle
- Each component/function should have one clear purpose
- Avoid mixing UI logic with business logic
- Separate data fetching from presentation logic
- Keep state management focused and localized

#### DRY Principles (Don't Repeat Yourself)
- Extract reusable logic into custom hooks or utility functions
- Create reusable components for common UI patterns
- Use constants for repeated values
- Avoid duplicating business logic across components

#### Clear Separation of Concerns
- Keep UI logic separate from business logic
- Use custom hooks for stateful logic
- Separate data transformation from presentation
- Maintain clear boundaries between different domains

#### Consistent Patterns
- Follow established architectural patterns throughout the codebase
- Use consistent patterns for error handling
- Maintain consistent API design patterns
- Follow established naming and organization conventions

#### Proper Abstraction
- Create reusable components and utilities when beneficial
- Avoid over-abstraction that obscures functionality
- Abstract at the right level of granularity
- Prefer composition over complex inheritance patterns

### 🎯 YAGNI Compliance (You Aren't Gonna Need It)

#### Implement Only What's Needed
- Don't build features "just in case"
- Focus on current requirements, not hypothetical future needs
- Avoid adding complexity for edge cases that may never occur
- Build the simplest solution that meets current requirements

#### Avoid Premature Optimization
- Optimize when performance issues are identified, not before
- Measure before optimizing
- Focus on algorithmic improvements over micro-optimizations
- Consider maintainability cost of optimizations

#### Simple Solutions First
- Choose the simplest approach that meets current requirements
- Prefer standard solutions over custom implementations
- Use existing libraries rather than reinventing solutions
- Start with simple implementations and evolve as needed

#### Resist Over-Engineering
- Don't add complexity for hypothetical future needs
- Avoid creating elaborate frameworks for simple problems
- Keep solutions proportional to the problem size
- Focus on solving the problem at hand

#### Delete Unused Code
- Remove commented code, unused imports, and dead code paths
- Clean up temporary implementations and debugging code
- Remove unused dependencies and utilities
- Regularly audit and clean up the codebase

## Framework-Specific Best Practices

### ⚛️ React Best Practices

#### Composition Over Inheritance
- Use component composition for flexibility
- Prefer passing components as props over inheritance
- Use render props or children patterns for reusability
- Build complex UIs from simple, composable components

#### Custom Hooks
- Extract stateful logic into reusable custom hooks
- Use custom hooks for data fetching logic
- Create hooks for complex state management
- Test custom hooks independently

#### Performance Optimization
- Use `useCallback` and `useMemo` judiciously, not by default
- Only optimize when performance issues are identified
- Prefer proper dependency arrays over empty arrays
- Use `React.memo` for expensive components that re-render frequently

#### Component Design
- Keep components focused on a single responsibility
- Break large components into smaller, focused sub-components
- Use proper prop types and interfaces
- Implement proper error boundaries for robust error handling

#### State Management
- Keep state as local as possible
- Lift state up only when necessary for sharing
- Use context sparingly for truly global state
- Prefer multiple smaller contexts over one large context

### 🚀 Next.js Best Practices

#### App Router Patterns
- Use proper server/client component separation
- Leverage server components for data fetching when possible
- Use client components only when necessary (interactivity, browser APIs)
- Implement proper loading and error states

#### SEO Optimization
- Implement metadata API for dynamic meta tags
- Use structured data (JSON-LD) where appropriate
- Ensure proper heading hierarchy
- Implement canonical URLs and Open Graph tags

#### Performance
- Leverage `next/image` for optimized image loading
- Use `next/link` for client-side navigation
- Implement proper caching strategies
- Optimize bundle sizes with dynamic imports when necessary

#### Static Generation
- Use static generation where possible for better performance
- Implement ISR (Incremental Static Regeneration) for dynamic content
- Pre-generate critical pages at build time
- Use proper data fetching patterns for static content

#### Static Site Configuration
- Avoid .env files and environment variables for this static site
- GitHub Pages does not support runtime environment variables
- Use hardcoded constants in `src/lib/constants.ts` for configuration values
- Maintain single source of truth for site URL and other configuration
- Document configuration values in constants file with clear comments

### 🔷 TypeScript Best Practices

#### Strict Typing
- Enable strict mode and avoid `any` type
- Use proper type annotations for function parameters and return types
- Implement type guards for runtime type checking
- Use branded types for better type safety (e.g., `BlogSlug`)

#### Interface Definitions
- Create clear, well-documented interfaces
- Use composition for building complex types
- Prefer interfaces over type aliases for object shapes
- Document complex types with JSDoc comments

#### Utility Types
- Use TypeScript utility types for common patterns (`Pick`, `Omit`, `Partial`)
- Create custom utility types for domain-specific patterns
- Use mapped types for transforming type structures
- Leverage conditional types for advanced type logic

#### Generic Types
- Use generics for reusable, type-safe functions
- Constrain generics with appropriate bounds
- Provide default type parameters where appropriate
- Document generic parameters clearly

#### Type Safety Patterns
- Use exhaustive type checking with `never` type
- Implement proper error types for error handling
- Use discriminated unions for complex state management
- Validate external data with runtime type checking

## Development Workflow

### 🏗️ Component Architecture

#### Component Organization
- Follow established patterns in `src/components/ui/`
- Organize components by domain (ui/, sections/, layout/, blog/)
- Co-locate related components and their tests
- Use index files for clean imports

#### Props and Interfaces
- Define clear, well-typed props interfaces for all components
- Use composition patterns for flexible component APIs
- Implement proper default props and prop validation
- Document complex prop structures

#### Component Patterns
- Use `React.forwardRef` for components that need DOM access
- Implement proper error boundaries where appropriate
- Use render props or compound components for complex interactions
- Prefer controlled components over uncontrolled ones

### 🎨 Styling & UI Guidelines

#### Tailwind CSS Usage
- Use Tailwind CSS classes for styling
- Follow the established design tokens and color variables
- Implement responsive design with mobile-first approach
- Use consistent spacing and sizing patterns

#### Conditional Styling
- Use `cn()` utility for className merging and conditional styles
- Avoid inline styles except for dynamic values
- Use CSS variables for theme-dependent values
- Implement proper dark mode support

#### Design System
- Follow the established design tokens and color variables
- Use consistent component patterns across the application
- Implement proper accessibility standards (WCAG compliance)
- Use semantic HTML elements and ARIA labels where necessary

#### Animations
- Use Framer Motion for smooth, meaningful animations
- Respect user preferences for reduced motion
- Keep animations purposeful and not distracting
- Test animations across different devices and browsers

### 🔗 Navigation & Routing

#### Next.js Routing
- Use `next/link` for internal navigation
- Implement proper SEO-friendly URLs
- Use dynamic routes appropriately
- Handle 404 and error states properly

#### Navigation Patterns
- Implement smooth scrolling for hash-based navigation
- Provide clear visual feedback for active navigation items
- Ensure keyboard navigation support
- Test navigation patterns across different devices

### 📊 Data Management

#### Type Safety
- Use strict TypeScript types for all data structures
- Implement proper validation for external data
- Use branded types for domain-specific identifiers
- Document data flow and transformations

#### State Management
- Extract data logic into reusable custom hooks
- Use proper error handling for async operations
- Implement loading states for better user experience
- Cache expensive computations with `useMemo`

#### API Integration
- Use proper error handling for API calls
- Implement retry logic where appropriate
- Use proper loading and error states
- Validate API responses at runtime

## Anti-Patterns to Avoid

### ❌ Component Anti-Patterns

#### Monolithic Components
- **Problem**: Components over 150 lines become hard to maintain
- **Solution**: Break into smaller, focused sub-components
- **Example**: Split complex forms into field groups and validation logic

#### Prop Drilling
- **Problem**: Passing props through multiple levels unnecessarily
- **Solution**: Use context, composition, or state management
- **Example**: Use context for theme data instead of passing through every component

#### Mixed Concerns
- **Problem**: Mixing UI logic with business logic in components
- **Solution**: Extract business logic to custom hooks or utilities
- **Example**: Move API calls to custom hooks, keep components focused on rendering

#### Inline Styles
- **Problem**: Using style props instead of Tailwind classes
- **Solution**: Use Tailwind utility classes or CSS variables
- **Example**: Use `className="bg-primary"` instead of `style={{ backgroundColor: 'blue' }}`

#### Direct DOM Manipulation
- **Problem**: Using refs to manipulate DOM directly
- **Solution**: Use React state and props for UI updates
- **Example**: Use state to control visibility instead of `ref.current.style.display`

### ❌ React Anti-Patterns

#### Missing Dependency Arrays
- **Problem**: useEffect without proper dependencies causing bugs
- **Solution**: Always include all dependencies or use ESLint rules
- **Example**: Include state variables that the effect uses

#### Mutating State
- **Problem**: Directly modifying state objects
- **Solution**: Use immutable update patterns
- **Example**: Use spread operator or immutability helpers

#### Array Indices as Keys
- **Problem**: Using unstable keys in lists causing render issues
- **Solution**: Use stable, unique identifiers as keys
- **Example**: Use item.id instead of array index

#### Unnecessary State
- **Problem**: Creating state for values that can be derived
- **Solution**: Use computed values or `useMemo`
- **Example**: Calculate filtered lists instead of storing them in state

### ❌ TypeScript Anti-Patterns

#### Using `any` Type
- **Problem**: Avoiding proper typing defeats TypeScript benefits
- **Solution**: Use proper types, `unknown` for truly unknown data
- **Example**: Define proper interfaces instead of using `any`

#### Type Assertions Without Validation
- **Problem**: Using `as` without runtime checks
- **Solution**: Implement proper type guards
- **Example**: Validate data structure before type assertion

#### Optional Everything
- **Problem**: Making all props optional to avoid type errors
- **Solution**: Make required props required, use proper defaults
- **Example**: Only make props optional that are truly optional

### ❌ Performance Anti-Patterns

#### Premature Optimization
- **Problem**: Optimizing without measuring actual performance issues
- **Solution**: Profile first, optimize specific bottlenecks
- **Example**: Don't memo every component by default

#### Missing Memoization
- **Problem**: Not memoizing expensive calculations that run frequently
- **Solution**: Use `useMemo` for expensive computations
- **Example**: Memoize complex filtering or sorting operations

#### Excessive Memoization
- **Problem**: Memoizing everything unnecessarily
- **Solution**: Only memoize when performance issues are identified
- **Example**: Don't wrap every callback in `useCallback`

#### Large Bundle Sizes
- **Problem**: Including unused libraries or large dependencies
- **Solution**: Use tree shaking, dynamic imports, analyze bundle size
- **Example**: Import only needed functions from utility libraries

## Content Quality Standards

This project prioritizes **natural language**, **authentic voice**, and **human-sounding content** over AI-generated patterns and corporate buzzwords.

### 📝 Natural Language Principles

#### Conversational Tone
- Write like you're talking to a colleague, not writing marketing copy
- Use simple, direct sentences instead of complex structures
- Prefer active voice over passive voice
- Sound human and personal, not corporate or robotic

#### Avoid AI-Generated Patterns
- **Never use repetitive structures** like "Whether it's X, Y, or Z"
- **Eliminate buzzwords**: "deliver consistent value", "masters of change", "peak performance", "synergy"
- **No generic startup language**: "Let's Build Something Great", "Innovative Solutions"
- **Avoid forced analogies** that feel contrived or overly metaphorical

#### Simple Punctuation
- **Prefer periods and commas** over em dashes (—) and semicolons
- **Use short sentences** instead of complex compound sentences
- **Limit parenthetical statements** that disrupt reading flow
- **Avoid excessive exclamation points** or overly enthusiastic punctuation

### ✅ Content Examples

#### Hero/Introduction Text
```markdown
❌ "I thrive in dynamic environments and deliver consistent value through technological shifts"
✅ "I've spent 6+ years helping teams navigate technical changes and ship reliable software"

❌ "Passionate about crafting cutting-edge solutions that drive business transformation"
✅ "I build web applications with C#/.NET, TypeScript, and modern frameworks"
```

#### About/Personal Sections
```markdown
❌ "Whether it's debugging complex integrations or throwing a forehand around a guardian tree"
✅ "Disc golf taught me patience and precision - skills that transfer directly to debugging code"

❌ "Masters of code who are masters of change, delivering results that matter"
✅ "The best engineers adapt quickly to change and consistently deliver working solutions"
```

#### Contact/CTA Sections
```markdown
❌ "Let's Build Something Great - Whether you're working on complex legacy systems..."
✅ "Let's Talk Code - Got a tricky legacy system that needs untangling?"

❌ "I'm always interested in discussing solutions and sharing insights"
✅ "I enjoy discussing technical problems and sharing what I've learned along the way"
```

### 🚫 Red Flags to Avoid

#### Corporate Speak
- "deliver consistent value", "drive innovation", "optimize synergies"
- "leverage cutting-edge solutions", "maximize ROI", "streamline efficiency"
- "paradigm shifts", "game-changing", "next-generation"

#### AI-Generated Patterns
- Repetitive "Whether it's..." constructions (3+ times is a red flag)
- "The art of...", "Masters of...", "Peak performance" language
- Overly formal analogies that feel forced or pretentious
- Generic superlatives and marketing-speak

#### Complex Punctuation
- Em dashes for simple pauses (use commas instead)
- Semicolons in casual content (prefer periods or "and")
- Excessive parenthetical explanations (rewrite as separate sentences)

### 📋 Content Review Process

When writing or reviewing content:

1. **Read aloud** - Does it sound like something a human would actually say?
2. **Check for patterns** - Are there repetitive sentence structures?
3. **Eliminate buzzwords** - Replace corporate language with plain English
4. **Simplify punctuation** - Can em dashes become commas or periods?
5. **Personal voice** - Does this sound authentic and conversational?

This comprehensive guide ensures consistent, maintainable, and high-quality code across the entire project.