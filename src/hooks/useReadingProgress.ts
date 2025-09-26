import { useState, useEffect, useCallback, useRef } from "react";

interface UseReadingProgressOptions {
  /**
   * Selector for the content element to track reading progress
   * @default "article"
   */
  contentSelector?: string;
  /**
   * Minimum progress percentage to start showing indicator
   * @default 0.01
   */
  showThreshold?: number;
  /**
   * Progress percentage to hide indicator (article mostly read)
   * @default 0.95
   */
  hideThreshold?: number;
}

interface UseReadingProgressReturn {
  /**
   * Reading progress as a percentage (0-100)
   */
  progress: number;
  /**
   * Whether the progress indicator should be visible
   */
  isVisible: boolean;
  /**
   * Whether the content element was found
   */
  contentFound: boolean;
}

/**
 * Custom hook for tracking reading progress through content
 *
 * Monitors scroll position relative to content height and calculates
 * how much of the content has been read. Includes performance optimizations
 * with throttled scroll events and smart visibility controls.
 *
 * @param options Configuration options for reading progress tracking
 * @returns Object containing progress percentage and visibility state
 */
export function useReadingProgress({
  contentSelector = "article",
  showThreshold = 0.01,
  hideThreshold = 0.95,
}: UseReadingProgressOptions = {}): UseReadingProgressReturn {
  const [progress, setProgress] = useState(0);
  const [contentFound, setContentFound] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const contentRef = useRef<Element | null>(null);

  const updateProgress = useCallback(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const contentRect = content.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const contentTop = contentRect.top;
    const contentHeight = contentRect.height;
    const contentBottom = contentTop + contentHeight;

    if (contentBottom < 0) {
      setProgress(100);
      return;
    }

    if (contentTop > windowHeight) {
      setProgress(0);
      return;
    }

    const scrolled = Math.max(0, -contentTop);
    const totalScrollable = Math.max(1, contentHeight - windowHeight);
    const progressPercentage = Math.min(100, (scrolled / totalScrollable) * 100);

    setProgress(Math.max(0, progressPercentage));
  }, []);

  const handleScroll = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);

    if (contentElement) {
      contentRef.current = contentElement;
      setContentFound(true);

      updateProgress();

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);

        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    } else {
      setContentFound(false);
      setProgress(0);
    }
  }, [contentSelector, handleScroll, updateProgress]);

  const progressDecimal = progress / 100;
  const isVisible = contentFound &&
    progressDecimal >= showThreshold &&
    progressDecimal <= hideThreshold;

  return {
    progress,
    isVisible,
    contentFound,
  };
}