import React from 'react';
import { IconButton } from '@andideve/design-system';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Links({ github, external }: { github?: string; external?: string }) {
  return (
    <ul className="links list-none flex flex-wrap -m-3">
      {[
        { label: 'GitHub', url: github, icon: FiGithub, external: true },
        { label: 'External', url: external, icon: FiExternalLink, external: true },
      ].map((e) => (
        <React.Fragment key={e.label}>
          {e.url && (
            <li>
              <IconButton
                aria-label={e.label}
                size="lg"
                variant="plain"
                href={e.url}
                external={e.external}
                className="before:hidden"
              >
                <e.icon />
              </IconButton>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
