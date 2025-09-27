import { cn } from "./utils";

/**
 * Utility functions for UI styling and class management
 */

/**
 * Creates navigation button classes with active state styling
 */
export function navigationButtonClasses(isActive: boolean) {
  return cn(
    "transition-colors duration-200",
    isActive
      ? "text-primary font-medium"
      : "text-muted-foreground hover:text-foreground"
  );
}

/**
 * Creates mobile navigation item classes with active state styling
 */
export function mobileNavigationItemClasses(isActive: boolean) {
  return cn(
    "block w-full text-left touch-target mobile-nav-item touch-feedback",
    "py-3 px-4 transition-all duration-200 rounded-lg",
    isActive
      ? "text-primary font-medium bg-primary/5"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
  );
}

/**
 * Creates navigation header classes with scroll state styling
 */
export function navigationHeaderClasses(isScrolled: boolean) {
  return cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isScrolled
      ? "bg-background/80 backdrop-blur-md border-b border-border"
      : "bg-transparent"
  );
}

/**
 * Creates tag filter button classes with active state styling
 */
export function tagFilterButtonClasses(isSelected: boolean) {
  return cn(
    "px-3 py-1 text-sm rounded-full border transition-colors",
    isSelected
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-background text-muted-foreground border-border hover:border-primary/50"
  );
}

/**
 * Creates touch-optimized button classes for mobile devices
 */
export function touchButtonClasses(variant: 'primary' | 'secondary' | 'ghost' = 'primary') {
  const baseClasses = "min-h-[44px] min-w-[44px] active:scale-95 transition-transform duration-150";

  switch (variant) {
    case 'primary':
      return cn(baseClasses, "bg-primary text-primary-foreground");
    case 'secondary':
      return cn(baseClasses, "bg-secondary text-secondary-foreground");
    case 'ghost':
      return cn(baseClasses, "hover:bg-muted active:bg-muted/80");
    default:
      return baseClasses;
  }
}

/**
 * Creates mobile navigation container classes with enhanced backdrop
 */
export function mobileNavContainerClasses() {
  return cn(
    "bg-card/95 backdrop-blur-md rounded-lg border border-border",
    "shadow-lg shadow-black/5 dark:shadow-black/20",
    "p-4 safe-area-inset"
  );
}