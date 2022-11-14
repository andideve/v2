import React, { forwardRef } from 'react';
import {
  Typography as BaseTypography,
  TypographySizes,
  TypographyProps as BaseTypographyProps,
} from '@andideve/ds-typography';
import clsx from 'clsx';

import { TypographyVariants, TypographyProps } from './types';

export * from './types';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, variant: _variant = 'base', ...rest }, ref) => {
    const variant = (
      {
        base: ['base', { fontWeight: 'normal' }],
        'title-1': ['6xl', { fontWeight: 'bold' }],
        'title-2': ['4xl', { fontWeight: 'semibold' }],
        'title-3': ['xl', { fontWeight: 'semibold' }],
        'title-4': ['lg', { fontWeight: 'semibold' }],
        'title-5': ['base', { fontWeight: 'semibold' }],
        'label-1': ['xl', { fontWeight: 'normal' }],
        'label-2': ['lg', { fontWeight: 'normal' }],
        'label-3': ['base', { fontWeight: 'normal' }],
        'label-4': ['sm', { fontWeight: 'normal' }],
        'label-5': ['xs', { fontWeight: 'normal' }],
      } as Record<TypographyVariants, [TypographySizes, BaseTypographyProps]>
    )[_variant];

    return (
      <BaseTypography
        ref={ref}
        size={variant[0]}
        {...variant[1]}
        className={clsx(`typography--${_variant}`, className)}
        {...rest}
      >
        {children}
      </BaseTypography>
    );
  },
);

export default Typography;
