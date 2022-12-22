import { Project } from '@/types/project';

export type Categories = 'general' | 'archive' | 'repository';

export function categorify({
  archived,
  github,
  external,
}: Pick<Project, 'archived' | 'github' | 'external'>): Categories {
  if (archived) return 'archive';
  if (github && !external) return 'repository';
  return 'general';
}
