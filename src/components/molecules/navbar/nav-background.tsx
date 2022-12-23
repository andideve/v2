import React from 'react';
import { Box, BoxProps } from '@andideve/design-system';
import clsx from 'clsx';

export function NavBackground({
  className,
  ...rest
}: { className?: string } & Pick<BoxProps, 'height'>) {
  return (
    <Box
      borderColor="separator.transparent"
      className={clsx(
        'nav-background overflow-hidden border-b border-solid backdrop-blur-3xl',
        className,
      )}
      {...rest}
    >
      <Box
        backgroundColor="background.elevated.primary"
        zIndex={-1}
        className="relative opacity-90 w-full h-full"
      />
      <Box
        backgroundColor="accent"
        zIndex={-1}
        className="relative -top-full opacity-5 w-full h-full blur-3xl"
      />
    </Box>
  );
}

export default NavBackground;
