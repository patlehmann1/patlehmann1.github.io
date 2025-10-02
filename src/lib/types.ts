export type BlogSlug = string & { readonly __brand: unique symbol };
export type ProjectId = string & { readonly __brand: unique symbol };

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

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
  ttsContent?: string;
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

export interface NewsletterForm {
  email: string;
  firstName: string;
}

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationComponentProps extends BaseComponentProps {
  onNavClick: NavigationHandler;
  isActiveItem: (href: string) => boolean;
}