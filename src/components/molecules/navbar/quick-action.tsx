import React from 'react';
import { IconButton, IconButtonProps } from '@andideve/design-system';
import clsx from 'clsx';

export interface QuickActionItemProps
  extends Pick<IconButtonProps, 'title' | 'variant' | 'onClick' | 'href' | 'external'> {
  icon: React.FC<React.SVGAttributes<SVGSVGElement>>;
}

function Item({ icon: SVG, ...rest }: QuickActionItemProps) {
  return (
    <li>
      <IconButton rounded="full" {...rest}>
        <SVG strokeWidth={1.5} />
      </IconButton>
    </li>
  );
}

interface QuickActionFC<P = unknown> extends React.FC<P> {
  Item: typeof Item;
}

export const QuickAction: QuickActionFC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <ul className={clsx('quick-action list-none flex items-center space-x-2', className)}>
    {children}
  </ul>
);

QuickAction.Item = Item;

export default QuickAction;
