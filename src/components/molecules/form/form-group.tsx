import React from 'react';
import clsx from 'clsx';

export default function FormGroup({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={clsx('mt-8 first-of-type:mt-0', className)} {...rest}>
      {children}
    </div>
  );
}
