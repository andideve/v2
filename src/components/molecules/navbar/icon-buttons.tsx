import React from 'react';
import { IconButton, IconButtonProps } from '@andideve/design-system';
import clsx from 'clsx';

interface ItemProps extends Pick<IconButtonProps, 'title' | 'onClick' | 'href' | 'external'> {
  children: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IconButtonsProps {
  items: ItemProps[];
}

export function IconButtons({ items }: IconButtonsProps) {
  return (
    <ul
      className={clsx(
        'list-none flex items-center -m-3 space-x-2',
        !items[items.length - 1].href && '-mr-1',
        !items[0].href && '-ml-1',
      )}
    >
      {items.map(({ children: SVG, href, ...props }, i) => (
        <li key={i}>
          <IconButton variant={href ? 'plain' : 'tinted'} rounded="full" href={href} {...props}>
            <SVG strokeWidth={1.5} />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}

export default IconButtons;
