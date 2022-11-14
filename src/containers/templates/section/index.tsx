import React from 'react';
import { Box, BoxProps, Theme } from '@andideve/design-system';

import { UI } from '@/config/globals';

export default function Section({
  children,
  containerW: _containerW = 'xl',
  ...rest
}: {
  containerW?: keyof Theme['screens'] | number;
} & BoxProps) {
  return (
    <Box as="section" py={UI.frameY} px={UI.frameX} {...rest}>
      <Box
        width={typeof _containerW === 'number' ? _containerW : `var(--ds-screens-${_containerW})`}
        className="mx-auto max-w-full"
      >
        {children}
      </Box>
    </Box>
  );
}
