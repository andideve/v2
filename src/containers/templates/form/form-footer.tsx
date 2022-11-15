import React from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

import { UI } from '@/config/globals';

export default function FormFooter({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <Box
      mt={UI.frameY}
      className={clsx(
        'form__footer flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4',
        className,
      )}
      {...rest}
    >
      {children}
    </Box>
  );
}
