export interface Linktree {
  category: string;
  items: {
    label: string;
    href: string;
    text_color?: string;
    bg_color?: string;
  }[];
}
