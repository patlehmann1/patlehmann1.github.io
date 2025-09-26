"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReadingProgress } from "@/hooks/useReadingProgress";

interface ReadingProgressBarProps {
  /**
   * Selector for the content element to track
   * @default "article"
   */
  contentSelector?: string;
  /**
   * Height of the progress bar in pixels
   * @default 3
   */
  height?: number;
  /**
   * Custom className for styling
   */
  className?: string;
}

/**
 * Reading progress bar component that shows article reading progress
 *
 * Displays a fixed-position progress bar at the top of the viewport
 * that fills as the user scrolls through the article content.
 * Includes smooth animations and accessibility features.
 */
export function ReadingProgressBar({
  contentSelector = "article",
  height = 3,
  className = "",
}: ReadingProgressBarProps) {
  const { progress, isVisible } = useReadingProgress({
    contentSelector,
    showThreshold: 0.01,
    hideThreshold: 0.95,
  });

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={prefersReducedMotion ?
            { duration: 0 } :
            {
              opacity: { duration: 0.3 },
              scaleX: { duration: 0.3 },
            }
          }
          className={`fixed top-0 left-0 right-0 z-50 ${className}`}
          style={{ height: `${height}px` }}
          role="progressbar"
          aria-label={`Reading progress: ${Math.round(progress)}% complete`}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute inset-0 bg-border/30" />

          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={prefersReducedMotion ?
              { duration: 0 } :
              {
                width: {
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8,
                },
              }
            }
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 70%, hsl(var(--primary) / 0.8) 100%)",
            }}
          />

          <motion.div
            className="absolute inset-y-0 left-0 bg-primary/20 blur-sm"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={prefersReducedMotion ?
              { duration: 0 } :
              {
                width: {
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8,
                },
              }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}