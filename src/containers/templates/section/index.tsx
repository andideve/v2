import React from 'react';
import { Box, BoxProps, Theme } from '@andideve/design-system';
import clsx from 'clsx';

import { SectionContext } from './section-context';
import SectionHeader from './section-header';
import SectionFooter from './section-footer';
import { UI } from '@/config/globals';
import { Spacings, ChildOptions } from './types';

interface SectionFC<P = unknown> extends React.FC<P> {
  Header: typeof SectionHeader;
  Footer: typeof SectionFooter;
}

interface SectionProps extends Pick<ChildOptions, 'centered'>, BoxProps {
  containerW?: keyof Theme['screens'] | number;
  spacing?: Spacings;
}

const Section: SectionFC<SectionProps> = ({
  children,
  className,
  containerW: _containerW = 'xl',
  spacing: _spacing = '1',
  centered,
  ...rest
}) => {
  const spacing = (
    {
      '1': { header: UI.frameY, footer: UI.frameY },
      '2': { header: '3rem', footer: UI.frameY },
    } as Record<Spacings, { header: string; footer: string }>
  )[_spacing];
  return (
    <Box
      as="section"
      py={UI.frameY}
      px={UI.frameX}
      className={clsx(`section--${_spacing}`, className)}
      {...rest}
    >
      <Box
        width={typeof _containerW === 'number' ? _containerW : `var(--ds-screens-${_containerW})`}
        className="mx-auto max-w-full"
      >
        <SectionContext value={{ spacing, centered }}>{children}</SectionContext>
      </Box>
    </Box>
  );
};

Section.Header = SectionHeader;
Section.Footer = SectionFooter;

export default Section;
