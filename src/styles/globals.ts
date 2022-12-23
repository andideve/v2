import { Theme } from '@andideve/design-system';
import { CSSObject } from '@emotion/react';
import { UI } from '../config/globals';

const globals = ({ config: { colorMode }, colors }: Theme): CSSObject => ({
  '#__next': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    cursor: 'default',
    backgroundColor: colors.background.elevated.primary,
    transition: '.3s color ease, .3s background-color ease',
    '::-webkit-scrollbar': {
      width: 16,
    },
    '::-webkit-scrollbar-track': {
      background: 'var(--ds-colors-background-elevated-primary)',
    },
    '::-webkit-scrollbar-thumb': {
      border: '4px solid var(--ds-colors-background-elevated-primary)',
      borderRadius: 9999,
      backgroundColor: colorMode === 'dark' ? 'var(--ds-colors-gray-1)' : 'hsl(0, 0%, 76%)',
    },
  },
  main: {
    flexGrow: 1,
  },
  hr: {
    borderTop: '1px solid var(--ds-colors-separator-default)',
  },
  '.nav-link': {
    color: 'var(--ds-colors-foreground-secondary)',
    transition: 'color .1s ease',
    '&:focus, &.active': {
      color: 'var(--ds-colors-foreground-primary)',
    },
  },
  '#nprogress .bar': {
    top: UI.navbarH,
    height: 1,
    background: 'var(--ds-colors-foreground-primary)',
    zIndex: 10000,
    '.peg': {
      display: 'none',
    },
  },
});

export default globals;
