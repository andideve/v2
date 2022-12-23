import React, { forwardRef } from 'react';
import { Typography as BaseTypography } from '@andideve/ds-typography';
import clsx from 'clsx';

import typographyConfig from '@/config/typography';
import { TypographyProps } from './types';

export * from './types';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, variant = 'base', ...rest }, ref) => {
    const [size, cssProps] = typographyConfig.variants[variant];
    return (
      <BaseTypography
        ref={ref}
        size={size}
        {...cssProps}
        className={clsx(`typography--${variant}`, className)}
        {...rest}
      >
        {children}
      </BaseTypography>
    );
  },
);

export default Typography;
