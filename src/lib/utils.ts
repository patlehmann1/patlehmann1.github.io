import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BLOG_CONFIG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / BLOG_CONFIG.wordsPerMinute);
}

interface Skill {
  name: string;
  level: number;
  years: string;
  description: string;
}

export function sortSkillsByLevelAndExperience(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }

    const aYears = parseInt(a.years.match(/(\d+)/)?.[1] || '0');
    const bYears = parseInt(b.years.match(/(\d+)/)?.[1] || '0');
    if (aYears !== bYears) {
      return bYears - aYears;
    }

    return a.name.localeCompare(b.name);
  });
}