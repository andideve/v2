export interface Project {
  date: string;
  title: string;
  description: string;
  tags?: string[];
  github?: string;
  external?: string;
  archived?: true;
}
