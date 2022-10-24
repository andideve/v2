import Link from 'next/link';
import React from 'react';
import { Box } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { Drawer } from '@andideve/ds-drawer';

import {
  NavLink,
  IconButtons,
  IconButtonsProps,
  MobileMenu,
} from '../../../components/molecules/navbar';
import useDisclosure from '../../../hooks/use-disclosure';
import { UI } from '../../../config/globals';
import { Menu } from '../../../types/defaults';

export default function Navbar({
  brand,
  menuItems,
  iconButtons = [],
  cta,
}: {
  brand: string;
  menuItems: Menu[];
  iconButtons?: IconButtonsProps['items'];
  cta?: React.ReactNode;
}) {
  const disclosure = useDisclosure();
  return (
    <Nav
      px={UI.frameX}
      height={UI.navbarH}
      borderColor="separator.transparent"
      zIndex={9999}
      className="fixed inset-x-0 justify-between border-b border-solid backdrop-blur-xl"
    >
      <Box
        backgroundColor="background.primary"
        zIndex={-1}
        className="absolute inset-0 opacity-70"
      />
      <Nav.Brand className="nav__start relative z-10">
        <Link href="/" passHref>
          <a className="after:absolute after:inset-0">{brand}</a>
        </Link>
      </Nav.Brand>
      <div className="nav__center grow lg:absolute lg:inset-0 hidden lg:flex lg:items-center lg:justify-center">
        <Nav.Links>
          {menuItems.map((menu, i) => (
            <NavLink key={i} to={menu.to} exact={menu.exact}>
              {menu.label}
            </NavLink>
          ))}
        </Nav.Links>
      </div>
      <div className="nav__end flex space-x-12">
        <IconButtons items={iconButtons} />
        <div className="block lg:hidden">
          <Nav.Toggle
            aria-controls="main-nav-drawer"
            className="-mx-3"
            expanded={disclosure.isOpen}
            onClick={disclosure.onToggle}
          />
          <Drawer
            id="main-nav-drawer"
            isOpen={disclosure.isOpen}
            duration={150}
            placement="top"
            inset={{ top: UI.navbarH }}
            zIndex={9999}
            unmountOnCollapse
          >
            <MobileMenu items={menuItems}>{cta}</MobileMenu>
          </Drawer>
        </div>
        {cta && <div className="hidden lg:block">{cta}</div>}
      </div>
    </Nav>
  );
}
