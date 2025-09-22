"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { UI, SITE_CONFIG } from "@/lib/constants";

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

  const isActiveItem = (href: string) => {
    if (href.startsWith("/")) {
      return pathname.startsWith(href);
    }
    return false;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => handleNavClick("#")}
            className="text-xl font-bold gradient-warm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {SITE_CONFIG.name}
          </motion.button>

          <div className="hidden md:flex items-center space-x-8">
            {UI.navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors duration-200 ${
                  isActiveItem(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: UI.navItems.length * 0.1 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <motion.div
                className="bg-card/95 backdrop-blur-md rounded-lg border border-border p-4"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                {UI.navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left py-3 px-2 transition-colors duration-200 ${
                      isActiveItem(item.href)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.div
                  className="flex justify-center pt-4 mt-4 border-t border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: UI.navItems.length * 0.05 }}
                >
                  <ThemeToggle />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}