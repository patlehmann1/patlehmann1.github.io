// Branded types for better type safety
export type BlogSlug = string & { readonly __brand: unique symbol };
export type ProjectId = string & { readonly __brand: unique symbol };

// Utility types for common patterns
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// Event handler types
export type NavigationHandler = (href: string) => void;
export type ClickHandler = () => void;

export interface Project {
  id: ProjectId;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  slug: BlogSlug;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationComponentProps extends BaseComponentProps {
  onNavClick: NavigationHandler;
  isActiveItem: (href: string) => boolean;
}