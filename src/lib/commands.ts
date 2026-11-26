import { RESUME_PATH, SITE_CONFIG, THEMES, UI } from "./constants";

export type CommandAction =
  | { type: "navigate"; href: string }
  | { type: "theme"; value: string }
  | { type: "link"; href: string }
  | { type: "print"; text: string };

export interface Command {
  id: string;
  name: string;
  description: string;
  action: CommandAction;
  hidden?: boolean;
}

export interface PostSummary {
  slug: string;
  title: string;
}

export function buildCommands(posts: PostSummary[]): Command[] {
  const sections: Command[] = [
    { id: "go-home", name: "home", description: "Back to the top", action: { type: "navigate", href: "#" } },
    ...UI.navItems.map((item) => ({
      id: `go-${item.name.toLowerCase()}`,
      name: item.name.toLowerCase(),
      description: item.href.startsWith("/") ? `Open ${item.name}` : `Jump to ${item.name}`,
      action: { type: "navigate", href: item.href } as const,
    })),
  ];

  const reads: Command[] = posts.map((post) => ({
    id: `read-${post.slug}`,
    name: `read ${post.slug}`,
    description: post.title,
    action: { type: "navigate", href: `/blog/${post.slug}` },
  }));

  const themes: Command[] = THEMES.map((theme) => ({
    id: `theme-${theme.value}`,
    name: `theme ${theme.value}`,
    description: `Switch to the ${theme.label} theme`,
    action: { type: "theme", value: theme.value },
  }));

  const links: Command[] = [
    { id: "resume", name: "resume", description: "Open my resume (PDF)", action: { type: "link", href: RESUME_PATH } },
    { id: "email", name: "email", description: "Send me an email", action: { type: "link", href: `mailto:${SITE_CONFIG.email}` } },
    { id: "github", name: "github", description: "Open my GitHub profile", action: { type: "link", href: SITE_CONFIG.social.github } },
    { id: "linkedin", name: "linkedin", description: "Open my LinkedIn profile", action: { type: "link", href: SITE_CONFIG.social.linkedin } },
    { id: "rss", name: "rss", description: "Subscribe to the blog feed", action: { type: "link", href: "/rss.xml" } },
  ];

  const easterEggs: Command[] = [
    {
      id: "whoami",
      name: "whoami",
      description: "Who is this guy?",
      hidden: true,
      action: { type: "print", text: "patrick: full-stack software engineer at OPM, building with TypeScript, React, and MSSQL." },
    },
    {
      id: "sudo",
      name: "sudo",
      description: "Elevate privileges",
      hidden: true,
      action: { type: "print", text: "patrick is not in the sudoers file. This incident will be reported." },
    },
  ];

  return [...sections, ...reads, ...themes, ...links, ...easterEggs];
}

/**
 * Matches the query against each command's name and description.
 * Hidden commands only appear when the query starts with their exact name, so `sudo rm -rf /` still finds `sudo`.
 */
export function filterCommands(commands: Command[], query: string): Command[] {
  const q = query.trim().toLowerCase();

  return commands.filter((command) => {
    if (command.hidden) {
      return q === command.name || q.startsWith(`${command.name} `);
    }
    if (!q) return true;
    return command.name.includes(q) || command.description.toLowerCase().includes(q);
  });
}
