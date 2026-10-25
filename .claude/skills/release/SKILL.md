---
name: release
description: Bump this project's SemVer version (patch/minor/major) and tag a release. Use when committing significant work or when the user asks to release, tag, or bump the version.
---

# Release / Version Bump

This project uses **Semantic Versioning (SemVer)** with the format: `MAJOR.MINOR.PATCH`

The `version:*` scripts push to the remote. Only run them when the user has asked to release or push; otherwise recommend the bump level and let the user run it.

## When to Update Versions

- **PATCH** (1.0.x) - Bug fixes, typos, small tweaks
  - Fixing broken functionality
  - Correcting typos in content or code
  - Minor style adjustments
  - Performance improvements without API changes

- **MINOR** (1.x.0) - New features, backwards compatible
  - Adding new components or pages
  - New blog posts or content
  - Enhanced functionality that doesn't break existing features
  - New configuration options

- **MAJOR** (x.0.0) - Breaking changes
  - Removing or significantly changing public APIs
  - Major architectural changes
  - Dependency updates that change behavior
  - Changes requiring user intervention

## Version Bump Workflow

```bash
# Analyze your changes first, then run the appropriate command:
npm run version:patch      # Creates commit, tag, and pushes automatically
npm run version:minor      # Creates commit, tag, and pushes automatically
npm run version:major      # Creates commit, tag, and pushes automatically
```

These commands automatically:
1. Update package.json version
2. Create a git commit with the version bump
3. Create an annotated git tag
4. Push changes and tags to remote

## Manual Version Management

If you need more control:
```bash
npm version patch -m "Fix: description"     # Update version and commit
git push && git push --tags                 # Push changes and tags
```
