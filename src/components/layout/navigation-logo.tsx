"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { ClickHandler } from "@/lib/types";

interface NavigationLogoProps {
  onLogoClick: ClickHandler;
}

/**
 * Navigation logo component that handles the site branding and home navigation
 */
export function NavigationLogo({ onLogoClick }: NavigationLogoProps) {
  return (
    <motion.button
      onClick={onLogoClick}
      className="text-xl font-bold gradient-warm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Navigate to home page"
    >
      {SITE_CONFIG.name}
    </motion.button>
  );
}