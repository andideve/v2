import { Author } from '@/types/defaults';
import { Linktree } from '@/types/linktree';
import { Project } from '@/types/project';
import { Email } from '@/types/email';

/**
 * Get Author
 */

export type GetAuthorResponseBody = Author;

/**
 * Get Linktrees
 */

export interface GetLinktreesResponseBody {
  linktrees: Linktree[];
}

/**
 * Get Projects
 */

export interface GetProjectsRequestQueryParameter {
  archived?: boolean;
  sort?: 'ASC' | 'DESC';
  limit?: number;
}

export interface GetProjectsResponseBody {
  projects: Project[];
}

/**
 * Create Email
 */

export type CreateEmailRequestBodyParameters = Email;
