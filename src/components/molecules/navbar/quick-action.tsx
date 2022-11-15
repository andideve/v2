import React from 'react';
import { IconButton, IconButtonProps } from '@andideve/design-system';
import clsx from 'clsx';

export type QuickActionItemProps = Pick<
  IconButtonProps,
  'children' | 'title' | 'variant' | 'onClick' | 'href' | 'external'
>;

function Item({ children, ...rest }: QuickActionItemProps) {
  return (
    <li>
      <IconButton rounded="full" {...rest}>
        {children}
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
