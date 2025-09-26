export const SITE_CONFIG = {
  name: "Patrick Lehmann",
  title: "Patrick Lehmann - Full-Stack Software Engineer",
  description: "Full-stack software engineer with 6+ years building scalable applications using C#/.NET, TypeScript, and modern JavaScript frameworks.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://patricklehmann.io",
  email: "contact@patricklehmann.io",
  social: {
    github: "https://github.com/patlehmann1",
    linkedin: "https://linkedin.com/in/patlehmann",
    twitter: "@lehmann_dev2",
  },
} as const;

export const BLOG_CONFIG = {
  postsPerPage: 10,
  featuredPostsLimit: 3,
  wordsPerMinute: 200,
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
  },
  delay: {
    small: 0.1,
    medium: 0.2,
    large: 0.4,
  },
  stagger: 0.1,
} as const;

export const UI = {
  scrollThreshold: 20,
  navItems: [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
  ],
} as const;

export const SEO = {
  keywords: ["Patrick Lehmann", "Full-Stack Developer", "Software Engineer", "C#", ".NET", "TypeScript", "React", "Angular", "Node.js"],
  author: "Patrick Lehmann",
  creator: "Patrick Lehmann",
  publisher: "Patrick Lehmann",
} as const;

export const READING_PROGRESS = {
  throttleDelay: 16,
  showThreshold: 0.01,
  hideThreshold: 0.95,
  barHeight: 3,
  contentSelector: "article",
} as const;

export const OG_PREVIEW_TECH_STACK = [
  { name: "C#/.NET", years: "4+ years" },
  { name: "TypeScript", years: "6+ years" },
  { name: "React", years: "6+ years" },
  { name: "Angular", years: "2+ years" },
] as const;