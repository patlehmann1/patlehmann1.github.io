"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { UI } from "@/lib/constants";
import { NavigationLogo } from "./navigation-logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { navigationHeaderClasses } from "@/lib/ui-utils";

/**
 * Main navigation component that coordinates between desktop and mobile navigation
 *
 * Features:
 * - Responsive design with desktop and mobile variants
 * - Scroll-based header styling
 * - Smooth scrolling for hash links
 * - Active link highlighting
 */
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const scrollToSection = useScrollToSection();

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > UI.scrollThreshold;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = React.useCallback((href: string) => {
    setIsMenuOpen(false);
    scrollToSection(href);
  }, [scrollToSection]);

  const handleLogoClick = React.useCallback(() => {
    handleNavClick("#");
  }, [handleNavClick]);

  const isActiveItem = React.useCallback((href: string) => {
    if (href.startsWith("/")) {
      return pathname.startsWith(href);
    }
    return false;
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={navigationHeaderClasses(scrolled)}
    >
      <nav className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <NavigationLogo onLogoClick={handleLogoClick} />

          <DesktopNavigation onNavClick={handleNavClick} isActiveItem={isActiveItem} />

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          <MobileNavigation
            isMenuOpen={isMenuOpen}
            onNavClick={handleNavClick}
            isActiveItem={isActiveItem}
          />
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}