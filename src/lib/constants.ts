// Site Configuration
export const SITE_CONFIG = {
  name: "Patrick Lehmann",
  title: "Patrick Lehmann - Full-Stack Software Engineer",
  description: "Full-stack software engineer with 6+ years building scalable applications using C#/.NET, TypeScript, and modern JavaScript frameworks.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://patricklehmann.com",
  email: "patlehmann1@gmail.com",
  social: {
    github: "https://github.com/patlehmann1",
    linkedin: "https://linkedin.com/in/patlehmann",
    twitter: "@lehmann_dev2",
  },
} as const;

// Blog Configuration
export const BLOG_CONFIG = {
  postsPerPage: 10,
  featuredPostsLimit: 3,
  wordsPerMinute: 200,
} as const;

// Animation Constants
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

// UI Constants
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

// SEO Constants
export const SEO = {
  keywords: ["Patrick Lehmann", "Full-Stack Developer", "Software Engineer", "C#", ".NET", "TypeScript", "React", "Angular", "Node.js"],
  author: "Patrick Lehmann",
  creator: "Patrick Lehmann",
  publisher: "Patrick Lehmann",
} as const;