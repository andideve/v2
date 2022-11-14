import Link from 'next/link';
import React, { memo } from 'react';
import { Box, Typography } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { dequal } from 'dequal';

import { IconButtons, IconButtonsProps } from '@/components/molecules/navbar/icon-buttons';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

interface FooterProps {
  brand: string;
  menuItems: Menu[];
  iconButtons?: IconButtonsProps['items'];
  copy?: React.ReactNode;
}

function propsAreEqual(prev: FooterProps, next: FooterProps) {
  return [
    prev.brand === prev.brand,
    dequal(prev.menuItems, prev.menuItems),
    dequal(prev.iconButtons, prev.iconButtons),
    prev.copy === prev.copy,
  ].every(Boolean);
}

const Footer = memo<FooterProps>(function ({ brand, menuItems, iconButtons = [], copy }) {
  return (
    <Box
      as="footer"
      py={UI.frameY}
      px={UI.frameX}
      backgroundColor="background.elevated.primary"
      className="lg:text-center"
    >
      <hr />
      <div className="brand-and-links footer__row lg:flex lg:items-center mt-6">
        <Nav.Brand className="brand-and-links__start">{brand}</Nav.Brand>
        <div className="brand-and-links__center footer__row--brand-and-links lg:grow lg:flex lg:justify-center mt-6 lg:mt-0 lg:mx-12">
          <Nav.Links
            as="ul"
            spacing={0}
            display={{ _: 'grid', lg: 'flex' }}
            className="grid-cols-2 gap-y-4 gap-x-6 lg:gap-0 lg:space-x-6"
          >
            {menuItems.map((menu, i) => (
              <li key={i}>
                <Link href={menu.to} passHref>
                  <Nav.Link
                    color='foreground.secondary'
                    className='nav-link block lg:inline -mx-1 lg:mx-0'
                  >
                    {menu.label}
                  </Nav.Link>
                </Link>
              </li>
            ))}
          </Nav.Links>
        </div>
        {iconButtons.length ? (
          <div className="brand-and-links__end footer__row--brand-and-links mt-6 lg:mt-0">
            <IconButtons items={iconButtons} />
          </div>
        ) : null}
      </div>
      {copy && (
        <Typography
          size="xs"
          color="foreground.secondary"
          className="footer__row mt-6 font-semibold"
        >
          {copy}
        </Typography>
      )}
    </Box>
  );
}, propsAreEqual);

export default Footer;
