import React from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

export default function TableFrame({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Box
      borderColor="separator.default"
      className={clsx('table-frame p-3 border rounded-xl', className)}
    >
      {children}
    </Box>
  );
}
