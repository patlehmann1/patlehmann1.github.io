"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UI } from "@/lib/constants";
import { NavigationHandler } from "@/lib/types";
import { mobileNavigationItemClasses } from "@/lib/ui-utils";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  onNavClick: NavigationHandler;
  isActiveItem: (href: string) => boolean;
}

export function MobileNavigation({ isMenuOpen, onNavClick, isActiveItem }: MobileNavigationProps) {
  if (!isMenuOpen) return null;

  return (
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
            onClick={() => onNavClick(item.href)}
            className={mobileNavigationItemClasses(isActiveItem(item.href))}
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
  );
}