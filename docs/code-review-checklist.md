# Code Review Checklist

This document provides comprehensive checklists and requirements for code reviews to ensure consistent quality and maintainability across the codebase.

## Pre-Review Requirements

Before submitting code for review, ensure:

### 🔧 Build and Test Status
- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npx tsc --noEmit`)
- [ ] Linting passes (`npm run lint`)
- [ ] Test coverage meets minimum thresholds (70%)

### 📦 Version Management
- [ ] Change impact analyzed (breaking/feature/fix)
- [ ] Version number updated appropriately in package.json
  - PATCH (x.x.X) for bug fixes and minor updates
  - MINOR (x.X.x) for new features (backwards compatible)
  - MAJOR (X.x.x) for breaking changes
- [ ] Version bump uses appropriate command (`npm run version:patch/minor/major`)
- [ ] Git tag created for version release
- [ ] Changes align with SemVer guidelines in development-guidelines.md

### 📝 Documentation
- [ ] Code changes are reflected in relevant documentation
- [ ] Complex functions have JSDoc comments
- [ ] New features are documented
- [ ] Breaking changes are clearly noted

## Code Quality Checklist

### ✅ Component Quality

#### Structure and Organization
- [ ] Component is under 100 lines (if larger, justified or split)
- [ ] Single responsibility principle is followed
- [ ] Component has a clear, focused purpose
- [ ] Related code is grouped together logically
- [ ] Imports are organized (React, libraries, local)

#### Props and Interfaces
- [ ] Props are properly typed with interfaces
- [ ] Required props are marked as required
- [ ] Optional props have appropriate defaults
- [ ] Prop interfaces are well-documented
- [ ] Complex prop types are clearly defined

#### Naming and Conventions
- [ ] Consistent naming conventions followed
- [ ] Variable and function names are descriptive
- [ ] Boolean variables use appropriate prefixes (`is`, `has`, `can`, `should`)
- [ ] No unused imports or variables
- [ ] File and component names match established patterns

### ✅ Performance

#### React Optimization
- [ ] `useCallback` used for functions passed to children (when necessary)
- [ ] `useMemo` used for expensive calculations (when necessary)
- [ ] Proper dependency arrays in hooks (`useEffect`, `useMemo`, `useCallback`)
- [ ] No unnecessary re-renders identified
- [ ] State is kept as local as possible

#### Bundle and Asset Optimization
- [ ] No unnecessary large dependencies added
- [ ] Dynamic imports used for code splitting where appropriate
- [ ] Images optimized and using `next/image` where applicable
- [ ] CSS classes use Tailwind utilities appropriately

### ✅ Type Safety

#### TypeScript Usage
- [ ] No `any` types used (or justified exceptions documented)
- [ ] All props and state properly typed
- [ ] Event handlers have correct types
- [ ] Function return types are explicit for public APIs
- [ ] Generic types used appropriately

#### Error Handling
- [ ] Async operations have proper error handling
- [ ] Error boundaries implemented where appropriate
- [ ] User-facing error messages are helpful
- [ ] Loading states implemented for async operations
- [ ] Edge cases considered and handled

### ✅ Testing Requirements

#### Test Coverage
- [ ] Unit tests written for new components/functions
- [ ] Tests cover main functionality and edge cases
- [ ] Error scenarios are tested
- [ ] Integration tests for complex interactions
- [ ] Test coverage meets minimum thresholds (70%)

#### Test Quality
- [ ] Tests are readable and well-organized
- [ ] Test names clearly describe what is being tested
- [ ] Mocks are appropriate and not over-mocked
- [ ] Tests are independent and don't rely on external state
- [ ] Async tests use proper waiting patterns

#### Test Patterns
- [ ] React Testing Library best practices followed
- [ ] User-centric testing approach (testing behavior, not implementation)
- [ ] Accessibility testing included where appropriate
- [ ] Custom hooks tested independently
- [ ] API mocking implemented correctly

### ✅ Accessibility & UX

#### Semantic HTML
- [ ] Semantic HTML elements used appropriately
- [ ] Proper heading hierarchy maintained
- [ ] Lists use appropriate list elements
- [ ] Forms have proper structure and labeling
- [ ] Interactive elements are focusable

#### ARIA and Accessibility
- [ ] ARIA labels provided where necessary
- [ ] Screen reader compatibility considered
- [ ] Color contrast meets WCAG standards
- [ ] Focus management implemented properly
- [ ] Reduced motion preferences respected

#### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are visible
- [ ] Keyboard shortcuts don't conflict with browser/OS shortcuts
- [ ] Escape key behavior implemented where appropriate

#### User Experience
- [ ] Loading states provide clear feedback
- [ ] Error states are user-friendly
- [ ] Success states confirm actions
- [ ] Responsive design works on all target devices
- [ ] Performance is acceptable on slower devices

## Security and Best Practices

### 🔒 Security Considerations
- [ ] No sensitive data exposed in client-side code
- [ ] API keys and secrets properly managed
- [ ] Input validation implemented where necessary
- [ ] XSS prevention measures in place
- [ ] CSRF protection considered for forms

### 🌐 SEO and Performance
- [ ] Meta tags updated for new pages
- [ ] Structured data implemented where appropriate
- [ ] Core Web Vitals considered
- [ ] Proper caching headers for static assets
- [ ] Images have appropriate alt text

### 📱 Responsive Design
- [ ] Mobile-first approach followed
- [ ] Breakpoints use established design system
- [ ] Touch targets are appropriately sized
- [ ] Horizontal scrolling avoided
- [ ] Content reflows properly on different screen sizes

## Code Organization

### 📁 File Structure
- [ ] Files are in appropriate directories
- [ ] New files follow established naming conventions
- [ ] Related files are co-located appropriately
- [ ] Import paths use consistent patterns
- [ ] Index files used appropriately for clean imports

### 🔄 State Management
- [ ] State is managed at appropriate level
- [ ] Global state is justified and necessary
- [ ] State updates are immutable
- [ ] Complex state logic extracted to custom hooks
- [ ] State shape is normalized where appropriate

### 🎨 Styling
- [ ] Tailwind CSS classes used consistently
- [ ] Design system tokens followed
- [ ] Custom CSS justified and minimal
- [ ] Dark mode considerations included
- [ ] Animation performance considered

## Framework-Specific Checks

### ⚛️ React Specific
- [ ] Components use composition over inheritance
- [ ] Refs used appropriately (not for state management)
- [ ] Side effects properly managed with `useEffect`
- [ ] Context used sparingly and appropriately
- [ ] Error boundaries catch relevant errors

### 🚀 Next.js Specific
- [ ] Server/client components used appropriately
- [ ] Metadata API used for dynamic meta tags
- [ ] Static generation used where possible
- [ ] API routes follow established patterns
- [ ] Environment variables used correctly

### 🔷 TypeScript Specific
- [ ] Interfaces preferred over type aliases for objects
- [ ] Utility types used where appropriate
- [ ] Generic constraints applied correctly
- [ ] Type guards implemented for runtime checks
- [ ] Branded types used for domain-specific values

## Documentation and Communication

### 📚 Code Documentation
- [ ] Complex logic has explanatory comments
- [ ] JSDoc comments for public APIs
- [ ] README updated if necessary
- [ ] Architecture decisions documented
- [ ] Breaking changes clearly communicated

### 🔄 Change Management
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains changes and reasoning
- [ ] Related issues are referenced
- [ ] Migration guide provided for breaking changes
- [ ] Rollback plan considered for risky changes

## Content Review

When reviewing changes that include user-facing content, ensure:

### 📝 Natural Language Quality
- [ ] Content sounds conversational and human, not AI-generated
- [ ] No repetitive sentence structures (especially "Whether it's..." patterns)
- [ ] Active voice preferred over passive voice where appropriate
- [ ] Tone is personal and authentic, not corporate or robotic

### 🚫 AI-Generated Patterns Avoided
- [ ] No "Whether it's X, Y, or Z" repetitive constructions
- [ ] Corporate buzzwords eliminated ("deliver value", "masters of", "peak performance")
- [ ] Generic startup language avoided ("Let's Build Something Great", "cutting-edge solutions")
- [ ] Forced analogies and metaphors feel natural, not contrived

### ✏️ Punctuation and Structure
- [ ] Simple punctuation used (periods, commas) over complex punctuation (em dashes, semicolons)
- [ ] Sentences are short and clear rather than complex and verbose
- [ ] Parenthetical statements are minimal and don't disrupt reading flow
- [ ] Excessive exclamation points or enthusiastic punctuation avoided

### 👤 Personal Voice Check
- [ ] Content sounds like it came from a real person, not marketing copy
- [ ] Technical explanations are clear and jargon-free when possible
- [ ] Examples and descriptions feel authentic to the person/company
- [ ] Call-to-actions are direct and conversational

### 📋 Content Red Flags
Watch for and flag these patterns:
- [ ] Repetitive "Whether it's..." appearing 2+ times in same section
- [ ] Corporate speak: "synergy", "paradigm shift", "game-changing", "next-generation"
- [ ] AI patterns: "The art of...", "Masters of...", generic superlatives
- [ ] Overly complex sentences that could be simplified
- [ ] Forced enthusiasm that doesn't feel genuine

### ✅ Content Review Process
- [ ] Read content aloud - does it sound like natural speech?
- [ ] Check for repetitive patterns across the entire page/section
- [ ] Ensure technical terms are explained appropriately for the audience
- [ ] Verify that personality comes through without being unprofessional

## Review Process Guidelines

### 👀 For Reviewers
- [ ] Review for correctness, not just style
- [ ] Consider maintainability and future changes
- [ ] Test the changes locally if complex
- [ ] Provide constructive feedback
- [ ] Ask questions to understand design decisions

### 📝 For Authors
- [ ] Respond to all review comments
- [ ] Explain design decisions when requested
- [ ] Update code based on valid feedback
- [ ] Test changes after addressing feedback
- [ ] Request re-review after significant changes

## Approval Criteria

Code is ready for approval when:

### ✅ All Checks Pass
- [ ] All checklist items addressed or justified exceptions documented
- [ ] Tests pass and coverage maintained
- [ ] No breaking changes without proper migration plan
- [ ] Performance impact assessed and acceptable
- [ ] Security considerations addressed

### 📋 Documentation Complete
- [ ] Code is self-documenting or properly commented
- [ ] User-facing changes documented
- [ ] API changes documented
- [ ] Breaking changes clearly communicated

### 🎯 Quality Standards Met
- [ ] Code follows established patterns and conventions
- [ ] Maintainability considerations addressed
- [ ] No obvious technical debt introduced
- [ ] Future extension points considered where appropriate

This comprehensive checklist ensures that all code contributions maintain the high quality standards expected in the project while providing clear guidance for both authors and reviewers.