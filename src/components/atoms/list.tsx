import React from 'react';
import { Box, BoxProps } from '@andideve/design-system';
import clsx from 'clsx';

export function List({ as = 'ul', children, className, ...rest }: BoxProps) {
  return (
    <Box as={as} borderColor="separator.default" className={clsx('border', className)} {...rest}>
      {children}
    </Box>
  );
}

export function ListItem({
  children,
  className,
  ...rest
}: Pick<BoxProps, 'children' | 'className' | 'px' | 'height'>) {
  return (
    <Box
      as="li"
      borderColor="separator.default"
      className={clsx('flex items-center border-b last-of-type:border-b-0', className)}
      {...rest}
    >
      {children}
    </Box>
  );
}
