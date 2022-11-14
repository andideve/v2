import { TypographyProps as BaseTypographyProps } from '@andideve/design-system';

export type TypographyVariants =
  | 'base'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'title-5'
  | 'label-1'
  | 'label-2'
  | 'label-3'
  | 'label-4'
  | 'label-5';

export interface TypographyOptions {
  variant?: TypographyVariants;
}

type ExcludeProps = 'size' | 'fontSize' | 'lineHeight';

export type TypographyProps = TypographyOptions & Omit<BaseTypographyProps, ExcludeProps>;
