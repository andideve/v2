import React from 'react';
import { Typography } from '@andideve/design-system';
import { FiExternalLink } from 'react-icons/fi';

import { Linktree } from '@/types/linktree';

function List({ children }: { children?: React.ReactNode }) {
  return <ul className="list-none space-y-6">{children}</ul>;
}

function Links({ items }: { items: Linktree['items'] }) {
  return (
    <ul className="list-none space-y-4">
      {items.map((link, i) => (
        <li key={i}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-[.875rem] px-6 rounded-md font-medium"
            style={{
              color: link.text_color,
              backgroundColor: link.bg_color || 'var(--ds-colors-background-secondary)',
            }}
          >
            {link.label}
            <FiExternalLink strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Item({ category, items }: Linktree) {
  return (
    <li>
      <Typography as="h3" color="foreground.secondary" className="mb-[.875rem]">
        {category}
      </Typography>
      <Links items={items} />
    </li>
  );
}

const Linktree = { List, Item };

export default Linktree;
