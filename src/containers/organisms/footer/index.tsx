import React from 'react';
import { Box, Typography } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';

import NavLink from '@/components/molecules/navbar/nav-link';
import { IconButtons, IconButtonsProps } from '@/components/molecules/navbar/icon-buttons';
import memo from '@/utils/client/memo';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

const Footer = memo<{
  brand: string;
  menuItems: Menu[];
  iconButtons?: IconButtonsProps['items'];
  copy?: React.ReactNode;
}>(({ brand, menuItems, iconButtons = [], copy }) => (
  <Box
    as="footer"
    py={UI.frameY}
    px={UI.frameX}
    backgroundColor="background.primary"
    className="lg:text-center"
  >
    <hr />
    <div className="brand-and-links footer__row lg:flex lg:items-center mt-6">
      <Nav.Brand className="brand-and-links__start">{brand}</Nav.Brand>
      <div className="brand-and-links__center footer__row--brand-and-links lg:grow lg:flex lg:justify-center mt-6 lg:mt-0 lg:mx-12">
        <Nav.Links
          spacing={0}
          display={{ _: 'grid', lg: 'flex' }}
          className="grid-cols-2 gap-y-4 gap-x-6 lg:gap-0 lg:space-x-6"
        >
          {menuItems.map((menu, i) => (
            <NavLink key={i} to={menu.to} exact={menu.exact} className="-mx-1 lg:mx-0">
              {menu.label}
            </NavLink>
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
      <Typography size="xs" color="foreground.secondary" className="footer__row mt-6 font-semibold">
        {copy}
      </Typography>
    )}
  </Box>
));

export default Footer;
