import React from 'react';
import clsx from 'clsx';

import { useSectionContext } from './section-context';

export default function SectionHeader({
  children,
  className,
  style,
  ...rest
}: React.ComponentPropsWithoutRef<'header'>) {
  const ctx = useSectionContext();
  return (
    <header
      className={clsx('section__header', { 'text-center': ctx.centered }, className)}
      style={{ marginBottom: ctx.spacing?.header, ...style }}
      {...rest}
    >
      {children}
    </header>
  );
}
