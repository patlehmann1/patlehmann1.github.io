"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UI } from "@/lib/constants";
import { NavigationHandler } from "@/lib/types";
import { navigationButtonClasses } from "@/lib/ui-utils";

interface DesktopNavigationProps {
  onNavClick: NavigationHandler;
  isActiveItem: (href: string) => boolean;
}

export function DesktopNavigation({ onNavClick, isActiveItem }: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {UI.navItems.map((item, index) => (
        <motion.button
          key={item.name}
          onClick={() => onNavClick(item.href)}
          className={navigationButtonClasses(isActiveItem(item.href))}
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
  );
}