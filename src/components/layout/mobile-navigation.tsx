"use client";

import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UI } from "@/lib/constants";
import { NavigationHandler } from "@/lib/types";
import { mobileNavigationItemClasses, mobileNavContainerClasses } from "@/lib/ui-utils";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  onNavClick: NavigationHandler;
  isActiveItem: (href: string) => boolean;
  onClose: () => void;
}

export function MobileNavigation({ isMenuOpen, onNavClick, isActiveItem, onClose }: MobileNavigationProps) {
  if (!isMenuOpen) return null;

  const backdrop = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      onClick={onClose}
      aria-label="Close menu"
    />
  );

  return (
    <>
      {/* Backdrop overlay - rendered in document.body via portal */}
      {typeof document !== 'undefined' && createPortal(backdrop, document.body)}

      {/* Menu content */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden mt-4 overflow-hidden relative z-50"
      >
        <motion.div
          className={mobileNavContainerClasses()}
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
          className="flex justify-center pt-6 mt-6 pb-2 mb-4 border-t border-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, delay: UI.navItems.length * 0.05 }}
        >
          <ThemeToggle />
        </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}