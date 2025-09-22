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
    "block w-full text-left py-3 px-2 transition-colors duration-200",
    isActive
      ? "text-primary font-medium"
      : "text-muted-foreground hover:text-foreground"
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