import React, { useMemo, memo } from 'react';
import { FiLinkedin, FiTwitter, FiGithub, FiCodesandbox, FiDribbble } from 'react-icons/fi';
import { FaDiscord, FaSpotify } from 'react-icons/fa';
import type { IconType } from 'react-icons';

import LinkEmbed from '@/components/molecules/link-embed';
import Typography from '@/components/atoms/typography';
import { Linktree } from '@/types/linktree';

function getAppearance(label: string) {
  const record: Record<string, { icon: null | IconType; color?: string }> = {
    discord: { icon: FaDiscord },
    linkedin: { icon: FiLinkedin },
    twitter: { icon: FiTwitter },
    github: { icon: FiGithub },
    codesandbox: { icon: FiCodesandbox },
    dribbble: { icon: FiDribbble },
    spotify: { icon: FaSpotify },
  };

  return record[label.toLowerCase()] ?? { icon: null };
}

type LinkProps = Pick<Linktree['items'][0], 'label' | 'href'>;

const Link = memo<LinkProps>(function ({ label, href }) {
  const { icon } = useMemo(() => getAppearance(label), [label]);
  return <LinkEmbed label={label} href={href} icon={icon} />;
});

function Links({ items }: Pick<Linktree, 'items'>) {
  return (
    <ul className="list-none space-y-4">
      {items.map((link) => (
        <li key={link.label}>
          <Link label={link.label} href={link.href} />
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
