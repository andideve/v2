import React from 'react';
import { IconButton } from '@andideve/design-system';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Links({ github, external }: { github?: string; external?: string }) {
  return (
    <ul className="list-none flex flex-wrap -m-3">
      {github && (
        <li>
          <IconButton
            aria-label="GitHub"
            size="lg"
            variant="plain"
            href={github}
            className="before:hidden"
          >
            <FiGithub />
          </IconButton>
        </li>
      )}
      {external && (
        <li>
          <IconButton
            aria-label="External Link"
            size="lg"
            variant="plain"
            href={external}
            className="before:hidden"
            external
          >
            <FiExternalLink />
          </IconButton>
        </li>
      )}
    </ul>
  );
}