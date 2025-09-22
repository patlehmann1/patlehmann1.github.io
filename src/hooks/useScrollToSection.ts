import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useScrollToSection() {
  const router = useRouter();

  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith("/")) {
      // Navigate to different page
      router.push(href);
    } else if (href === "#") {
      // Scroll to top or navigate home
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      // Handle hash links
      if (window.location.pathname === "/") {
        // We're on home page, scroll to section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home page with hash
        router.push(`/${href}`);
      }
    }
  }, [router]);

  return scrollToSection;
}