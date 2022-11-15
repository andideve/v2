import React from 'react';
import { Box, BoxProps } from '@andideve/design-system';
import clsx from 'clsx';

export default function VerticalRule({ className, ...rest }: Omit<BoxProps, 'children'>) {
  return (
    <Box
      as="span"
      role="separator"
      aria-orientation="vertical"
      borderRightWidth={1}
      borderColor="separator.transparent"
      className={clsx('vertical-rule', className)}
      {...rest}
    />
  );
}
