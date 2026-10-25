# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📖 Detailed Documentation

For comprehensive information about specific aspects of the project, refer to these detailed guides:

- **[🏗️ Architecture & System Design](docs/architecture.md)** - Component system, styling approach, blog architecture, SEO implementation, and technical details
- **[🧪 Testing Guide](docs/testing.md)** - Jest configuration, testing patterns, coverage requirements, and testing best practices
- **[📝 Development Guidelines](docs/development-guidelines.md)** - Code quality standards, React/Next.js/TypeScript best practices, and anti-patterns to avoid
- **[✅ Code Review Checklist](docs/code-review-checklist.md)** - Comprehensive review requirements, quality checks, and approval criteria

## Quick Reference

### Quality Gate Checks
**IMPORTANT**: Always run quality-gate checks after making any code changes. These checks are mandatory before considering any work complete.

Run all checks in parallel for efficiency:
```bash
npm test && npx tsc --noEmit && npm run lint && npm audit
```

Or run individually:
- `npm test` - Verify all tests pass
- `npx tsc --noEmit` - Ensure no TypeScript errors
- `npm run lint` - Confirm no linting issues
- `npm audit` - Check for security vulnerabilities

Before committing, also:
- Analyze changes and bump the version per SemVer when needed (see the `release` skill)
- Review relevant checklist items in [Code Review Checklist](docs/code-review-checklist.md)
- Proofread any changed copy (site text, blog posts, metadata, alt text, aria labels) for grammar, spelling, and punctuation (see Proofreading below)

### Content & Writing Guidelines
- **Natural Language**: Write conversationally, avoid AI-generated patterns and corporate buzzwords
- **Avoid Repetitive Structures**: No "Whether it's X, Y, or Z" patterns or forced analogies
- **Simple Punctuation**: Prefer periods and commas over em dashes and complex punctuation
- **Personal Voice**: Sound human and authentic, not like marketing copy or AI-generated content
- **Direct Communication**: Use short, clear sentences instead of complex, verbose structures

### Proofreading
Always proofread copy before committing. Read the full sentence or paragraph around each change, not just the edited words.
- **Run-ons and comma splices**: Split them into separate sentences
- **Spelling and capitalization**: Proper nouns and product names spelled correctly (Homes.com, TypeScript, GitHub)
- **Hyphenation**: Compound modifiers before a noun are hyphenated (full-stack engineer, blue-collar work, compile-time checks)
- **Articles and agreement**: No dropped "a"/"the", subject-verb agreement, subjunctive after "wish" ("I wish it were")
- **Consistency**: Serial (Oxford) comma, title case on headings and buttons ("Get in Touch"), consistent spelling of terms (micro-frontend)
- **Repetition and redundancy**: No repeated phrases in nearby sentences, no redundancies like "SEO optimization"
- **Tests**: Copy changes often break text-matching tests, so update them in the same change
- Fix grammar in older blog posts without changing their voice or their original terminology (e.g., keep "AI" in pre-September 2026 posts)

### Comment Guidelines
- **Avoid unnecessary comments**: Write self-documenting code with clear naming and structure
- **Only comment complex functions**: Add JSDoc comments above functions that require explanation of their purpose, parameters, or complex logic
- **Remove obvious comments**: Don't comment what the code clearly shows (e.g., `// Set loading state`)
- **No section headers**: Avoid organizational comments like `// Constants` or `// Helper functions`
- **Preserve valuable documentation**: Keep comments that explain non-obvious business logic, complex algorithms, or important context
