import React from 'react';
import { Box, BoxProps } from '@andideve/design-system';

export default function VerticalRule(props: Omit<BoxProps, 'children'>) {
  return (
    <Box
      as="span"
      role="separator"
      aria-orientation="vertical"
      borderRightWidth={1}
      borderColor="separator.transparent"
      {...props}
    />
  );
}
