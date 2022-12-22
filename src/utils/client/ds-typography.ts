import React from 'react';
import type { TypographySizes } from '@andideve/design-system';

type CSSProps = Pick<React.CSSProperties, 'fontWeight'>;

export const variant = (size: TypographySizes, css: CSSProps) => [size, css] as const;
