export interface Author {
  name: string;
  description: string;
  urls: {
    github: string;
    twitter: string;
  };
  twitter: {
    username: string;
  };
  images?: { width: number; url: string }[];
  intro?: string;
}

export type Menu = { label: string; to: string; exact?: boolean };

export interface PageMetadata {
  title: string;
  description?: string;
}
