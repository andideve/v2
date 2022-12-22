import React, { memo } from 'react';
import { Box } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { dequal } from 'dequal';
import type { IconType } from 'react-icons';

import { QuickAction, QuickActionItemProps } from '@/components/molecules/navbar/quick-action';
import { FooterLinks } from '@/components/molecules/footer';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

type QuickActions = (Omit<QuickActionItemProps, 'children'> & { icon: IconType })[];
interface FooterProps {
  brand: string;
  menuItems: Menu[];
  quickActions?: QuickActions;
  copy?: React.ReactNode;
}

function propsAreEqual(prev: FooterProps, next: FooterProps) {
  return [
    prev.brand === prev.brand,
    dequal(prev.menuItems, prev.menuItems),
    dequal(prev.quickActions, prev.quickActions),
    prev.copy === prev.copy,
  ].every(Boolean);
}

const Footer = memo<FooterProps>(function ({ brand, menuItems, quickActions = [], copy }) {
  return (
    <Box
      as="footer"
      py={UI.frameY}
      px={UI.frameX}
      backgroundColor="background.elevated.primary"
      className="footer lg:text-center"
    >
      <hr />
      <div className="brand-and-links footer__row lg:flex lg:items-center mt-6">
        <Nav.Brand className="brand-and-links__start">{brand}</Nav.Brand>
        <div className="brand-and-links__center footer__row--brand-and-links lg:grow lg:flex lg:justify-center mt-6 lg:mt-0 lg:mx-12">
          <FooterLinks items={menuItems} />
        </div>
        {quickActions.length ? (
          <div className="brand-and-links__end footer__row--brand-and-links mt-6 lg:mt-0">
            <QuickAction className="-m-3">
              {quickActions.map(({ icon: SVG, ...e }, i) => (
                <QuickAction.Item key={i} variant="plain" {...e}>
                  <SVG strokeWidth={1.5} />
                </QuickAction.Item>
              ))}
            </QuickAction>
          </div>
        ) : null}
      </div>
      {copy && (
        <Typography
          variant="label-5"
          fontWeight="semibold"
          color="foreground.secondary"
          className="footer__row mt-6"
        >
          {copy}
        </Typography>
      )}
    </Box>
  );
}, propsAreEqual);

export default Footer;
