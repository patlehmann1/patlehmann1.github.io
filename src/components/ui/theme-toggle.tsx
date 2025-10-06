"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "light", label: "Light", color: "hsl(23, 72%, 44%)" },
  { value: "dark", label: "Dark", color: "hsl(23, 65%, 55%)" },
  { value: "ocean", label: "Ocean", color: "hsl(195, 85%, 45%)" },
  { value: "forest", label: "Forest", color: "hsl(145, 65%, 40%)" },
  { value: "sunset", label: "Sunset", color: "hsl(285, 70%, 55%)" },
  { value: "minimal", label: "Minimal", color: "hsl(0, 0%, 20%)" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-theme-selector]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-9 h-9 border-primary/20 hover:border-primary/40 hover:bg-primary/10">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative" data-theme-selector>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <Palette className="h-4 w-4 text-primary" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover shadow-lg z-50 overflow-hidden">
          <div className="p-2 space-y-1">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-left"
              >
                <div
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: t.color }}
                />
                <span className="flex-1 text-sm font-450 text-foreground">
                  {t.label}
                </span>
                {theme === t.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}