export const SITE_URL = "https://patricklehmann.io";

export const SITE_CONFIG = {
  name: "Patrick Lehmann",
  title: "Patrick Lehmann - Full-Stack Software Engineer",
  description: "Full-stack software engineer with 7+ years in fintech, enterprise, and federal systems. Now at OPM, building with TypeScript, React, and MSSQL.",
  url: SITE_URL,
  email: "contact@patricklehmann.io",
  social: {
    github: "https://github.com/patlehmann1",
    linkedin: "https://linkedin.com/in/patlehmann",
    twitter: "@lehmann_dev2",
  },
} as const;

export const THEMES = [
  { value: "light", label: "Light", color: "hsl(23, 72%, 44%)" },
  { value: "dark", label: "Dark", color: "hsl(23, 65%, 55%)" },
  { value: "ocean", label: "Ocean", color: "hsl(195, 85%, 45%)" },
  { value: "forest", label: "Forest", color: "hsl(145, 65%, 40%)" },
  { value: "synthwave", label: "Synthwave", color: "hsl(320, 100%, 60%)" },
  { value: "cobalt2", label: "Cobalt2", color: "hsl(205, 49%, 19%)" },
] as const;

export const RESUME_PATH = "/Patrick W. Lehmann - Software Engineer.pdf";

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