import {
  navigationButtonClasses,
  mobileNavigationItemClasses,
  navigationHeaderClasses,
  tagFilterButtonClasses,
  touchButtonClasses,
  mobileNavContainerClasses
} from '../ui-utils'

describe('UI Utilities', () => {
  describe('navigationButtonClasses', () => {
    it('should return active classes when isActive is true', () => {
      const result = navigationButtonClasses(true)

      expect(result).toContain('text-primary')
      expect(result).toContain('font-medium')
      expect(result).toContain('transition-colors')
      expect(result).toContain('duration-200')
    })

    it('should return inactive classes when isActive is false', () => {
      const result = navigationButtonClasses(false)

      expect(result).toContain('text-muted-foreground')
      expect(result).toContain('hover:text-foreground')
      expect(result).toContain('transition-colors')
      expect(result).toContain('duration-200')
    })

    it('should not contain active-specific classes when inactive', () => {
      const result = navigationButtonClasses(false)

      expect(result).not.toContain('text-primary')
      expect(result).not.toContain('font-medium')
    })

    it('should not contain inactive-specific classes when active', () => {
      const result = navigationButtonClasses(true)

      expect(result).not.toContain('text-muted-foreground')
      expect(result).not.toContain('hover:text-foreground')
    })

    it('should always include base classes', () => {
      const activeResult = navigationButtonClasses(true)
      const inactiveResult = navigationButtonClasses(false)

      expect(activeResult).toContain('transition-colors')
      expect(activeResult).toContain('duration-200')
      expect(inactiveResult).toContain('transition-colors')
      expect(inactiveResult).toContain('duration-200')
    })
  })

  describe('mobileNavigationItemClasses', () => {
    it('should return active classes when isActive is true', () => {
      const result = mobileNavigationItemClasses(true)

      expect(result).toContain('text-primary')
      expect(result).toContain('font-medium')
      expect(result).toContain('block')
      expect(result).toContain('w-full')
      expect(result).toContain('text-left')
      expect(result).toContain('py-3')
      expect(result).toContain('px-4')
    })

    it('should return inactive classes when isActive is false', () => {
      const result = mobileNavigationItemClasses(false)

      expect(result).toContain('text-muted-foreground')
      expect(result).toContain('hover:text-foreground')
      expect(result).toContain('block')
      expect(result).toContain('w-full')
      expect(result).toContain('text-left')
      expect(result).toContain('py-3')
      expect(result).toContain('px-4')
    })

    it('should not contain active-specific classes when inactive', () => {
      const result = mobileNavigationItemClasses(false)

      expect(result).not.toContain('text-primary')
      expect(result).not.toContain('font-medium')
    })

    it('should not contain inactive-specific classes when active', () => {
      const result = mobileNavigationItemClasses(true)

      expect(result).not.toContain('text-muted-foreground')
      expect(result).not.toContain('hover:text-foreground')
    })

    it('should always include base layout classes', () => {
      const activeResult = mobileNavigationItemClasses(true)
      const inactiveResult = mobileNavigationItemClasses(false)

      ;['block', 'w-full', 'text-left', 'py-3', 'px-4', 'transition-all', 'duration-200'].forEach(className => {
        expect(activeResult).toContain(className)
        expect(inactiveResult).toContain(className)
      })
    })
  })

  describe('navigationHeaderClasses', () => {
    it('should return scrolled classes when isScrolled is true', () => {
      const result = navigationHeaderClasses(true)

      expect(result).toContain('bg-background/80')
      expect(result).toContain('backdrop-blur-md')
      expect(result).toContain('border-b')
      expect(result).toContain('border-border')
    })

    it('should return transparent classes when isScrolled is false', () => {
      const result = navigationHeaderClasses(false)

      expect(result).toContain('bg-transparent')
    })

    it('should not contain scrolled-specific classes when not scrolled', () => {
      const result = navigationHeaderClasses(false)

      expect(result).not.toContain('bg-background/80')
      expect(result).not.toContain('backdrop-blur-md')
      expect(result).not.toContain('border-b')
      expect(result).not.toContain('border-border')
    })

    it('should not contain transparent class when scrolled', () => {
      const result = navigationHeaderClasses(true)

      expect(result).not.toContain('bg-transparent')
    })

    it('should always include base positioning classes', () => {
      const scrolledResult = navigationHeaderClasses(true)
      const notScrolledResult = navigationHeaderClasses(false)

      ;['fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'transition-all', 'duration-300'].forEach(className => {
        expect(scrolledResult).toContain(className)
        expect(notScrolledResult).toContain(className)
      })
    })
  })

  describe('tagFilterButtonClasses', () => {
    it('should return selected classes when isSelected is true', () => {
      const result = tagFilterButtonClasses(true)

      expect(result).toContain('bg-primary')
      expect(result).toContain('text-primary-foreground')
      expect(result).toContain('border-primary')
    })

    it('should return unselected classes when isSelected is false', () => {
      const result = tagFilterButtonClasses(false)

      expect(result).toContain('bg-background')
      expect(result).toContain('text-muted-foreground')
      expect(result).toContain('border-border')
      expect(result).toContain('hover:border-primary/50')
    })

    it('should not contain selected-specific classes when unselected', () => {
      const result = tagFilterButtonClasses(false)

      expect(result).not.toContain('bg-primary')
      expect(result).not.toContain('text-primary-foreground')
      // Check for exact class match, not substring match since "hover:border-primary/50" contains "border-primary"
      const classes = result.split(' ')
      expect(classes).not.toContain('border-primary')
    })

    it('should not contain unselected-specific classes when selected', () => {
      const result = tagFilterButtonClasses(true)

      expect(result).not.toContain('bg-background')
      expect(result).not.toContain('text-muted-foreground')
      expect(result).not.toContain('border-border')
      expect(result).not.toContain('hover:border-primary/50')
    })

    it('should always include base styling classes', () => {
      const selectedResult = tagFilterButtonClasses(true)
      const unselectedResult = tagFilterButtonClasses(false)

      ;['px-3', 'py-1', 'text-sm', 'rounded-full', 'border', 'transition-colors'].forEach(className => {
        expect(selectedResult).toContain(className)
        expect(unselectedResult).toContain(className)
      })
    })
  })

  describe('Edge cases and type handling', () => {
    it('should handle truthy values as true', () => {
      expect(navigationButtonClasses(1 as unknown as boolean)).toContain('text-primary')
      expect(navigationButtonClasses('true' as unknown as boolean)).toContain('text-primary')
      expect(navigationButtonClasses({} as unknown as boolean)).toContain('text-primary')
    })

    it('should handle falsy values as false', () => {
      expect(navigationButtonClasses(0 as unknown as boolean)).toContain('text-muted-foreground')
      expect(navigationButtonClasses('' as unknown as boolean)).toContain('text-muted-foreground')
      expect(navigationButtonClasses(null as unknown as boolean)).toContain('text-muted-foreground')
      expect(navigationButtonClasses(undefined as unknown as boolean)).toContain('text-muted-foreground')
    })

    it('should handle NaN as false', () => {
      expect(navigationButtonClasses(Number.NaN as unknown as boolean)).toContain('text-muted-foreground')
    })
  })

  describe('Return value consistency', () => {
    it('should return string values for all functions', () => {
      expect(typeof navigationButtonClasses(true)).toBe('string')
      expect(typeof mobileNavigationItemClasses(false)).toBe('string')
      expect(typeof navigationHeaderClasses(true)).toBe('string')
      expect(typeof tagFilterButtonClasses(false)).toBe('string')
    })

    it('should return non-empty strings', () => {
      expect(navigationButtonClasses(true).length).toBeGreaterThan(0)
      expect(mobileNavigationItemClasses(false).length).toBeGreaterThan(0)
      expect(navigationHeaderClasses(true).length).toBeGreaterThan(0)
      expect(tagFilterButtonClasses(false).length).toBeGreaterThan(0)
    })

    it('should return different values for different states', () => {
      expect(navigationButtonClasses(true)).not.toBe(navigationButtonClasses(false))
      expect(mobileNavigationItemClasses(true)).not.toBe(mobileNavigationItemClasses(false))
      expect(navigationHeaderClasses(true)).not.toBe(navigationHeaderClasses(false))
      expect(tagFilterButtonClasses(true)).not.toBe(tagFilterButtonClasses(false))
    })
  })

  describe('Class string format', () => {
    it('should return properly formatted class strings (space-separated)', () => {
      const result = navigationButtonClasses(true)
      const classes = result.split(' ')

      expect(classes.length).toBeGreaterThan(1)
      expect(classes.every(cls => cls.trim().length > 0)).toBe(true)
    })

    it('should not have leading or trailing spaces', () => {
      const results = [
        navigationButtonClasses(true),
        mobileNavigationItemClasses(false),
        navigationHeaderClasses(true),
        tagFilterButtonClasses(false)
      ]

      results.forEach(result => {
        expect(result).toBe(result.trim())
      })
    })

    it('should not have multiple consecutive spaces', () => {
      const results = [
        navigationButtonClasses(true),
        mobileNavigationItemClasses(false),
        navigationHeaderClasses(true),
        tagFilterButtonClasses(false)
      ]

      results.forEach(result => {
        expect(result).not.toMatch(/\s{2,}/)
      })
    })
  })

  describe('touchButtonClasses', () => {
    it('should return ghost variant classes by default', () => {
      const result = touchButtonClasses()

      expect(result).toContain('min-h-[44px]')
      expect(result).toContain('min-w-[44px]')
      expect(result).toContain('active:scale-95')
      expect(result).toContain('bg-primary')
    })

    it('should return correct classes for different variants', () => {
      const primaryResult = touchButtonClasses('primary')
      const secondaryResult = touchButtonClasses('secondary')
      const ghostResult = touchButtonClasses('ghost')

      expect(primaryResult).toContain('bg-primary')
      expect(secondaryResult).toContain('bg-secondary')
      expect(ghostResult).toContain('hover:bg-muted')
    })
  })

  describe('mobileNavContainerClasses', () => {
    it('should return container classes with backdrop blur', () => {
      const result = mobileNavContainerClasses()

      expect(result).toContain('bg-card/95')
      expect(result).toContain('backdrop-blur-md')
      expect(result).toContain('rounded-lg')
      expect(result).toContain('border')
      expect(result).toContain('shadow-lg')
      expect(result).toContain('p-4')
    })
  })
})