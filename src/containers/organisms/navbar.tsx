import Link from 'next/link';
import React, { memo } from 'react';
import { Box } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { Drawer } from '@andideve/ds-drawer';
import { dequal } from 'dequal';

import { NavLink, IconButtons, IconButtonsProps, MobileMenu } from '@/components/molecules/navbar';
import WindowScrollDisabler from '@/components/molecules/window-scroll-disabler';
import { DisclosureContext } from '@/context/disclosure';
import useThemeHandler from '@/hooks/use-theme-handler';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

interface NavbarProps {
  brand: string;
  menuItems: Menu[];
  iconButtons?: IconButtonsProps['items'];
  cta?: React.ReactNode;
}

function propsAreEqual(prev: NavbarProps, next: NavbarProps) {
  return [
    prev.brand === next.brand,
    dequal(prev.menuItems, next.menuItems),
    dequal(prev.iconButtons, next.iconButtons),
    prev.cta === next.cta,
  ].every(Boolean);
}

function NavIconButtons({ items: _items }: IconButtonsProps) {
  const themeHandler = useThemeHandler();
  return (
    <IconButtons
      items={[
        ..._items,
        {
          title: themeHandler.isReady ? 'Change Theme' : 'Loading...',
          onClick: themeHandler.onChange,
          children: themeHandler.icon,
        },
      ]}
    />
  );
}

const Navbar = memo<NavbarProps>(function ({ brand, menuItems, iconButtons = [], cta }) {
  return (
    <Nav
      px={UI.frameX}
      height={UI.navbarH}
      borderColor="separator.transparent"
      zIndex={9999}
      className="fixed inset-x-0 justify-between border-b border-solid backdrop-blur-xl"
    >
      <Box
        backgroundColor="background.elevated.primary"
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
        <NavIconButtons items={iconButtons} />
        <DisclosureContext>
          {({ isOpen, onToggle }) => (
            <div className="block lg:hidden">
              <WindowScrollDisabler disable={isOpen} />
              <Nav.Toggle
                aria-controls="main-nav-drawer"
                className="-mx-3"
                expanded={isOpen}
                onClick={onToggle}
              />
              <Drawer
                id="main-nav-drawer"
                isOpen={isOpen}
                duration={150}
                placement="top"
                inset={{ top: UI.navbarH }}
                zIndex={9999}
                unmountOnCollapse
              >
                <MobileMenu items={menuItems}>{cta}</MobileMenu>
              </Drawer>
            </div>
          )}
        </DisclosureContext>
        {cta && <div className="hidden lg:block">{cta}</div>}
      </div>
    </Nav>
  );
}, propsAreEqual);

export default Navbar;
