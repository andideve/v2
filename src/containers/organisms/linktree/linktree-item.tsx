import React, { useMemo, memo } from 'react';
import { StyledBox } from '@andideve/design-system';
import { FiLinkedin, FiTwitter, FiGithub, FiDribbble, FiExternalLink } from 'react-icons/fi';
import { FaDiscord, FaSpotify } from 'react-icons/fa';
import type { IconType } from 'react-icons';

import Typography from '@/components/atoms/typography';
import { Linktree } from '@/types/linktree';

const Anchor = StyledBox.withComponent('a');

function getAppearance(label: string): { icon: null | IconType; color?: string } {
  if (/^discord$/i.test(label)) {
    return { icon: FaDiscord };
  }
  if (/^linkedin$/i.test(label)) {
    return { icon: FiLinkedin };
  }
  if (/^twitter$/i.test(label)) {
    return { icon: FiTwitter };
  }
  if (/^github$/i.test(label)) {
    return { icon: FiGithub };
  }
  if (/^dribbble$/i.test(label)) {
    return { icon: FiDribbble };
  }
  if (/^spotify$/i.test(label)) {
    return { icon: FaSpotify };
  }
  return { icon: null };
}

type LinkProps = Pick<Linktree['items'][0], 'label' | 'href'>;

const Link = memo<LinkProps>(function ({ label, href }) {
  const { icon: SVG, color } = useMemo(() => getAppearance(label), [label]);
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      borderColor="separator.default"
      className="group flex items-center justify-between p-3 border rounded-md"
    >
      <div className="flex items-center">
        {SVG && <SVG className="mr-2 w-5 h-5" style={{ color }} />}
        <Typography as="span" variant="title-5">
          {label}
        </Typography>
      </div>
      <FiExternalLink
        strokeWidth={1.5}
        className="opacity-80 group-focus:opacity-100 lg:group-hover:opacity-100 w-4 h-4"
      />
    </Anchor>
  );
});

function Links({ items }: Pick<Linktree, 'items'>) {
  return (
    <ul className="list-none space-y-4">
      {items.map((link, i) => (
        <li key={i}>
          <Link label={link.label} href={link.href} />
        </li>
      ))}
    </ul>
  );
}

export default function LinktreeItem({ category, items }: Linktree) {
  return (
    <li>
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
