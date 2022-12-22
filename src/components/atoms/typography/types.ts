import typographyConfig from '@/config/typography';
import { TypographyProps as BaseTypographyProps } from '@andideve/design-system';

export type TypographyVariants = keyof typeof typographyConfig.variants;

export interface TypographyOptions {
  variant?: TypographyVariants;
}

type ExcludeProps = 'size' | 'fontSize' | 'lineHeight';

export type TypographyProps = TypographyOptions & Omit<BaseTypographyProps, ExcludeProps>;
