import React from 'react';
import { IconButton } from '@andideve/design-system';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

import memo from '@/utils/client/memo';

const Links = memo<{ github?: string; external?: string }>(({ github, external }) => (
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
));

export default Links;
