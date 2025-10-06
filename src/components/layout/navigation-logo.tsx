"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { ClickHandler } from "@/lib/types";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface NavigationLogoProps {
  onLogoClick: ClickHandler;
}

/**
 * Navigation logo component that handles the site branding and home navigation
 */
export function NavigationLogo({ onLogoClick }: NavigationLogoProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.button
      onClick={onLogoClick}
      className={cn(
        "text-xl font-bold",
        mounted && theme === "synthwave" ? "gradient-synthwave" : "gradient-warm"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Navigate to home page"
    >
      {SITE_CONFIG.name}
    </motion.button>
  );
}