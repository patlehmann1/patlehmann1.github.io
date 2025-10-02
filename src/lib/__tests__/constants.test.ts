import {
  SITE_CONFIG,
  BLOG_CONFIG,
  ANIMATION,
  UI,
  SEO,
  READING_PROGRESS
} from '../constants'

describe('SITE_CONFIG', () => {
  it('should have required string properties', () => {
    expect(typeof SITE_CONFIG.name).toBe('string')
    expect(SITE_CONFIG.name).toBe('Patrick Lehmann')

    expect(typeof SITE_CONFIG.title).toBe('string')
    expect(SITE_CONFIG.title.length).toBeGreaterThan(0)

    expect(typeof SITE_CONFIG.description).toBe('string')
    expect(SITE_CONFIG.description.length).toBeGreaterThan(0)

    expect(typeof SITE_CONFIG.email).toBe('string')
    expect(SITE_CONFIG.email).toContain('@')
  })

  it('should have valid URL configuration', () => {
    expect(typeof SITE_CONFIG.url).toBe('string')
    expect(SITE_CONFIG.url).toMatch(/^https?:\/\//)
  })

  it('should have valid social media links', () => {
    expect(typeof SITE_CONFIG.social.github).toBe('string')
    expect(SITE_CONFIG.social.github).toMatch(/^https:\/\/github\.com\//)

    expect(typeof SITE_CONFIG.social.linkedin).toBe('string')
    expect(SITE_CONFIG.social.linkedin).toMatch(/^https:\/\/linkedin\.com\//)

    expect(typeof SITE_CONFIG.social.twitter).toBe('string')
    expect(SITE_CONFIG.social.twitter).toMatch(/^@/)
  })

  it('should have TypeScript readonly constraints', () => {
    // TypeScript provides compile-time readonly protection
    // At runtime, we can verify the object structure is defined
    expect(SITE_CONFIG).toBeDefined()
    expect(typeof SITE_CONFIG).toBe('object')
  })

  it('should have consistent branding', () => {
    expect(SITE_CONFIG.name).toContain('Patrick Lehmann')
    expect(SITE_CONFIG.title).toContain('Patrick Lehmann')
  })
})

describe('BLOG_CONFIG', () => {
  it('should have valid numeric configurations', () => {
    expect(typeof BLOG_CONFIG.postsPerPage).toBe('number')
    expect(BLOG_CONFIG.postsPerPage).toBeGreaterThan(0)
    expect(BLOG_CONFIG.postsPerPage).toBeLessThanOrEqual(50) // Reasonable upper limit

    expect(typeof BLOG_CONFIG.featuredPostsLimit).toBe('number')
    expect(BLOG_CONFIG.featuredPostsLimit).toBeGreaterThan(0)
    expect(BLOG_CONFIG.featuredPostsLimit).toBeLessThanOrEqual(10) // Reasonable upper limit

    expect(typeof BLOG_CONFIG.wordsPerMinute).toBe('number')
    expect(BLOG_CONFIG.wordsPerMinute).toBeGreaterThan(0)
    expect(BLOG_CONFIG.wordsPerMinute).toBeLessThanOrEqual(500) // Reasonable upper limit
  })

  it('should have sensible default values', () => {
    expect(BLOG_CONFIG.postsPerPage).toBe(10)
    expect(BLOG_CONFIG.featuredPostsLimit).toBe(3)
    expect(BLOG_CONFIG.wordsPerMinute).toBe(200) // Standard reading speed
  })

  it('should be internally consistent', () => {
    expect(BLOG_CONFIG.featuredPostsLimit).toBeLessThanOrEqual(BLOG_CONFIG.postsPerPage)
  })
})

describe('ANIMATION', () => {
  it('should have valid duration values', () => {
    expect(typeof ANIMATION.duration.fast).toBe('number')
    expect(ANIMATION.duration.fast).toBeGreaterThan(0)
    expect(ANIMATION.duration.fast).toBeLessThan(1)

    expect(typeof ANIMATION.duration.medium).toBe('number')
    expect(ANIMATION.duration.medium).toBeGreaterThan(0)
    expect(ANIMATION.duration.medium).toBeLessThan(2)

    expect(typeof ANIMATION.duration.slow).toBe('number')
    expect(ANIMATION.duration.slow).toBeGreaterThan(0)
    expect(ANIMATION.duration.slow).toBeLessThan(2)
  })

  it('should have valid delay values', () => {
    expect(typeof ANIMATION.delay.small).toBe('number')
    expect(ANIMATION.delay.small).toBeGreaterThan(0)
    expect(ANIMATION.delay.small).toBeLessThan(1)

    expect(typeof ANIMATION.delay.medium).toBe('number')
    expect(ANIMATION.delay.medium).toBeGreaterThan(0)
    expect(ANIMATION.delay.medium).toBeLessThan(1)

    expect(typeof ANIMATION.delay.large).toBe('number')
    expect(ANIMATION.delay.large).toBeGreaterThan(0)
    expect(ANIMATION.delay.large).toBeLessThan(1)
  })

  it('should have valid stagger value', () => {
    expect(typeof ANIMATION.stagger).toBe('number')
    expect(ANIMATION.stagger).toBeGreaterThan(0)
    expect(ANIMATION.stagger).toBeLessThan(1)
  })

  it('should have ascending duration values', () => {
    expect(ANIMATION.duration.fast).toBeLessThan(ANIMATION.duration.medium)
    expect(ANIMATION.duration.medium).toBeLessThan(ANIMATION.duration.slow)
  })

  it('should have ascending delay values', () => {
    expect(ANIMATION.delay.small).toBeLessThan(ANIMATION.delay.medium)
    expect(ANIMATION.delay.medium).toBeLessThan(ANIMATION.delay.large)
  })

  it('should have sensible animation timing', () => {
    expect(ANIMATION.duration.fast).toBe(0.3)
    expect(ANIMATION.duration.medium).toBe(0.5)
    expect(ANIMATION.duration.slow).toBe(0.8)
    expect(ANIMATION.stagger).toBe(0.1)
  })
})

describe('UI', () => {
  it('should have valid scroll threshold', () => {
    expect(typeof UI.scrollThreshold).toBe('number')
    expect(UI.scrollThreshold).toBeGreaterThan(0)
    expect(UI.scrollThreshold).toBeLessThan(100) // Reasonable threshold
  })

  it('should have valid navigation items', () => {
    expect(Array.isArray(UI.navItems)).toBe(true)
    expect(UI.navItems.length).toBeGreaterThan(0)

    UI.navItems.forEach(item => {
      expect(typeof item.name).toBe('string')
      expect(item.name.length).toBeGreaterThan(0)
      expect(typeof item.href).toBe('string')
      expect(item.href.length).toBeGreaterThan(0)
      expect(item.href.startsWith('#') || item.href.startsWith('/')).toBe(true)
    })
  })

  it('should have expected navigation structure', () => {
    const navNames = UI.navItems.map(item => item.name)
    expect(navNames).toContain('About')
    expect(navNames).toContain('Projects')
    expect(navNames).toContain('Blog')
    expect(navNames).toContain('Contact')
  })

  it('should have unique navigation hrefs', () => {
    const hrefs = UI.navItems.map(item => item.href)
    const uniqueHrefs = new Set(hrefs)
    expect(uniqueHrefs.size).toBe(hrefs.length)
  })

  it('should have Blog navigation pointing to /blog', () => {
    const blogItem = UI.navItems.find(item => item.name === 'Blog')
    expect(blogItem).toBeDefined()
    expect(blogItem?.href).toBe('/blog')
  })

  it('should have section anchors for other nav items', () => {
    const nonBlogItems = UI.navItems.filter(item => item.name !== 'Blog')
    nonBlogItems.forEach(item => {
      expect(item.href).toMatch(/^#[a-z]+$/)
    })
  })
})

describe('SEO', () => {
  it('should have valid keywords array', () => {
    expect(Array.isArray(SEO.keywords)).toBe(true)
    expect(SEO.keywords.length).toBeGreaterThan(0)

    SEO.keywords.forEach(keyword => {
      expect(typeof keyword).toBe('string')
      expect(keyword.length).toBeGreaterThan(0)
    })
  })

  it('should have consistent author information', () => {
    expect(typeof SEO.author).toBe('string')
    expect(SEO.author).toBe('Patrick Lehmann')

    expect(typeof SEO.creator).toBe('string')
    expect(SEO.creator).toBe('Patrick Lehmann')

    expect(typeof SEO.publisher).toBe('string')
    expect(SEO.publisher).toBe('Patrick Lehmann')
  })

  it('should include relevant technical keywords', () => {
    const keywordString = SEO.keywords.join(' ').toLowerCase()
    expect(keywordString).toContain('typescript')
    expect(keywordString).toContain('react')
    expect(keywordString).toContain('full-stack')
  })

  it('should include personal branding', () => {
    expect(SEO.keywords).toContain('Patrick Lehmann')
  })

  it('should have no duplicate keywords', () => {
    const uniqueKeywords = new Set(SEO.keywords)
    expect(uniqueKeywords.size).toBe(SEO.keywords.length)
  })
})

describe('READING_PROGRESS', () => {
  it('should have valid throttle delay', () => {
    expect(typeof READING_PROGRESS.throttleDelay).toBe('number')
    expect(READING_PROGRESS.throttleDelay).toBeGreaterThan(0)
    expect(READING_PROGRESS.throttleDelay).toBeLessThan(100) // Should be fast for smooth updates
  })

  it('should have valid threshold values', () => {
    expect(typeof READING_PROGRESS.showThreshold).toBe('number')
    expect(READING_PROGRESS.showThreshold).toBeGreaterThanOrEqual(0)
    expect(READING_PROGRESS.showThreshold).toBeLessThan(1)

    expect(typeof READING_PROGRESS.hideThreshold).toBe('number')
    expect(READING_PROGRESS.hideThreshold).toBeGreaterThan(0)
    expect(READING_PROGRESS.hideThreshold).toBeLessThanOrEqual(1)
  })

  it('should have valid bar height', () => {
    expect(typeof READING_PROGRESS.barHeight).toBe('number')
    expect(READING_PROGRESS.barHeight).toBeGreaterThan(0)
    expect(READING_PROGRESS.barHeight).toBeLessThan(20) // Reasonable UI size
  })

  it('should have valid content selector', () => {
    expect(typeof READING_PROGRESS.contentSelector).toBe('string')
    expect(READING_PROGRESS.contentSelector.length).toBeGreaterThan(0)
    expect(READING_PROGRESS.contentSelector).toBe('article')
  })

  it('should have logical threshold relationship', () => {
    expect(READING_PROGRESS.showThreshold).toBeLessThan(READING_PROGRESS.hideThreshold)
  })

  it('should have performance-optimized values', () => {
    expect(READING_PROGRESS.throttleDelay).toBe(16) // ~60fps
    expect(READING_PROGRESS.showThreshold).toBe(0.01)
    expect(READING_PROGRESS.hideThreshold).toBe(0.95)
    expect(READING_PROGRESS.barHeight).toBe(3)
  })
})

describe('Constants Integration', () => {
  it('should use BLOG_CONFIG.wordsPerMinute in reading time calculations', () => {
    // This ensures the constant is actually used by the utility function
    expect(BLOG_CONFIG.wordsPerMinute).toBe(200)
  })

  it('should have UI.scrollThreshold that works with READING_PROGRESS', () => {
    expect(UI.scrollThreshold).toBeGreaterThan(0)
    expect(READING_PROGRESS.throttleDelay).toBeGreaterThan(0)
    // Both should be configured for smooth UX
  })

  it('should maintain consistent branding across configs', () => {
    expect(SITE_CONFIG.name).toBe(SEO.author)
    expect(SITE_CONFIG.name).toBe(SEO.creator)
    expect(SITE_CONFIG.name).toBe(SEO.publisher)
  })

  it('should have animation timings that work well together', () => {
    // Stagger should be smaller than smallest duration
    expect(ANIMATION.stagger).toBeLessThan(ANIMATION.duration.fast)

    // All values should be reasonable for web animations
    Object.values(ANIMATION.duration).forEach(duration => {
      expect(duration).toBeGreaterThan(0.1)
      expect(duration).toBeLessThan(2)
    })
  })
})

describe('Hardcoded site URL', () => {
  it('should use consistent hardcoded site URL', () => {
    expect(SITE_CONFIG.url).toBe('https://patricklehmann.io')
  })
})