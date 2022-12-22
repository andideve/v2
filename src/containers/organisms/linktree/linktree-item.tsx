import React from 'react';
import { FiLinkedin, FiTwitter, FiGithub, FiCodesandbox, FiDribbble } from 'react-icons/fi';
import { FaDiscord, FaSpotify } from 'react-icons/fa';

import LinkEmbed from '@/components/molecules/link-embed';
import Typography from '@/components/atoms/typography';
import { Linktree } from '@/types/linktree';

function findIcon(label: string) {
  return {
    discord: FaDiscord,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    github: FiGithub,
    codesandbox: FiCodesandbox,
    dribbble: FiDribbble,
    spotify: FaSpotify,
  }[label.toLowerCase()];
}

function Links({ items }: Pick<Linktree, 'items'>) {
  return (
    <ul className="list-none space-y-4">
      {items.map(({ label, href }) => (
        <li key={label}>
          <LinkEmbed label={label} href={href} icon={findIcon(label)} />
        </li>
      ))}
    </ul>
  );
}

export default function LinktreeItem({ category, items }: Linktree) {
  return (
    <li className="linktree-item">
      <Typography
        as="h3"
        variant="label-5"
        fontWeight="medium"
        color="foreground.secondary"
        letterSpacing="0.08em"
        className="uppercase mb-[.875rem]"
      >
        {category}
      </Typography>
      <Links items={items} />
    </li>
  );
}
