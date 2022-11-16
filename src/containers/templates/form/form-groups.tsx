import React from 'react';
import clsx from 'clsx';

export default function FormGroups({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={clsx('form__groups space-y-8', className)} {...rest}>
      {children}
    </div>
  );
}
