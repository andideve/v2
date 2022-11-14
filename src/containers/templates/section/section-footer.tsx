import React from 'react';
import clsx from 'clsx';

import { useSectionContext } from './section-context';

export default function SectionFooter({
  children,
  className,
  style,
  ...rest
}: React.ComponentPropsWithoutRef<'footer'>) {
  const ctx = useSectionContext();
  return (
    <footer
      className={clsx('section__footer', { 'text-center': ctx.centered }, className)}
      style={{ marginTop: ctx.spacing?.footer, ...style }}
      {...rest}
    >
      {children}
    </footer>
  );
}
