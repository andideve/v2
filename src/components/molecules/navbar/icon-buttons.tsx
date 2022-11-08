import React from 'react';
import { IconButton, IconButtonProps } from '@andideve/design-system';

import memo from '@/utils/client/memo';

interface ItemProps extends Pick<IconButtonProps, 'title' | 'onClick' | 'href' | 'external'> {
  children: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IconButtonsProps {
  items: ItemProps[];
}

export const IconButtons = memo<IconButtonsProps>(({ items }) => (
  <ul className="list-none flex items-center -m-3 space-x-2">
    {items.map(({ children: SVG, ...props }, i) => (
      <li key={i}>
        <IconButton variant="plain" {...props}>
          <SVG strokeWidth={1.5} />
        </IconButton>
      </li>
    ))}
  </ul>
));

export default IconButtons;
