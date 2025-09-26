import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for handling navigation with smooth scrolling support
 *
 * Handles both hash-based navigation (for same-page sections) and
 * regular page navigation. Provides smooth scrolling for hash links
 * when already on the target page.
 *
 * @returns A function that handles navigation based on href type
 */
export function useScrollToSection() {
  const router = useRouter();

  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith("/")) {
      router.push(href);
    } else if (href === "#") {
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      if (window.location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    }
  }, [router]);

  return scrollToSection;
}