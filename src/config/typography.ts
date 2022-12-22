import { variant } from '@/utils/client/ds-typography';

const typographyConfig = {
  variants: {
    base: variant('base', { fontWeight: 400 }),
    'title-1': variant('6xl', { fontWeight: 700 }),
    'title-2': variant('4xl', { fontWeight: 600 }),
    'title-3': variant('xl', { fontWeight: 600 }),
    'title-4': variant('lg', { fontWeight: 600 }),
    'title-5': variant('base', { fontWeight: 600 }),
    'label-1': variant('xl', { fontWeight: 400 }),
    'label-2': variant('lg', { fontWeight: 400 }),
    'label-3': variant('base', { fontWeight: 400 }),
    'label-4': variant('sm', { fontWeight: 400 }),
    'label-5': variant('xs', { fontWeight: 400 }),
  },
};

export default typographyConfig;
