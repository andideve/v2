import React from 'react';
import { StyledBox } from '@andideve/design-system';
import { FiExternalLink } from 'react-icons/fi';

import Typography from '../atoms/typography';

const Anchor = StyledBox.withComponent('a');

export default function LinkEmbed({
  label,
  href,
  icon: SVG,
}: {
  label: string;
  href: string;
  icon?: React.FC<React.SVGAttributes<SVGSVGElement>> | null;
}) {
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      borderColor="separator.default"
      className="link-embed group flex items-center p-3 border rounded-md"
    >
      <div className="grow flex items-center">
        {SVG && <SVG className="mr-2 w-5 h-5" />}
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
}
