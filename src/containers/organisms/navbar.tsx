import Link from 'next/link';
import React, { memo } from 'react';
import { Box } from '@andideve/design-system';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { Drawer } from '@andideve/ds-drawer';
import { dequal } from 'dequal';
import clsx from 'clsx';

import { QuickAction, QuickActionItemProps, MobileMenu } from '@/components/molecules/navbar';
import VerticalRule from '@/components/atoms/vertical-rule';
import WindowScrollDisabler from '@/components/molecules/window-scroll-disabler';
import { DisclosureContext } from '@/context/disclosure';
import { NavLinkContext } from '@/context/nav-link';
import useThemeHandler from '@/hooks/use-theme-handler';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

interface NavbarProps {
  brand: string;
  menuItems: Menu[];
  className?: string;
  quickActions?: QuickActionItemProps[];
  cta?: React.ReactNode;
}

function propsAreEqual(prev: NavbarProps, next: NavbarProps) {
  return [
    prev.brand === next.brand,
    dequal(prev.menuItems, next.menuItems),
    dequal(prev.quickActions, next.quickActions),
    prev.cta === next.cta,
  ].every(Boolean);
}

function QuickActionThemeSwitcher() {
  const { isReady, onChange, icon: SVG } = useThemeHandler();
  return (
    <QuickAction.Item
      title={isReady ? 'Switch Theme' : 'Loading...'}
      variant="tinted"
      onClick={onChange}
    >
      <SVG strokeWidth={1.5} />
    </QuickAction.Item>
  );
}

const Navbar = memo<NavbarProps>(function ({
  className,
  brand,
  menuItems,
  quickActions = [],
  cta,
}) {
  return (
    <Nav
      px={UI.frameX}
      height={UI.navbarH}
      borderColor="separator.transparent"
      zIndex={9999}
      className={clsx('justify-between border-b border-solid backdrop-blur-3xl', className)}
    >
      <div className="overflow-hidden absolute inset-0">
        <Box
          backgroundColor="background.elevated.primary"
          zIndex={-1}
          className="relative opacity-90 w-full h-full"
        />
        <Box
          backgroundColor="accent"
          zIndex={-1}
          className="relative -top-full opacity-5 w-full h-full blur-3xl"
        />
      </div>

      <Nav.Brand className="nav__start relative z-10">
        <Link href="/" passHref>
          <a className="after:absolute after:inset-0">{brand}</a>
        </Link>
      </Nav.Brand>
      <div className="nav__center grow lg:absolute lg:inset-0 hidden lg:flex lg:items-center lg:justify-center">
        <Nav.Links as="ul">
          {menuItems.map((menu, i) => (
            <li key={i}>
              <NavLinkContext to={menu.to} exact={menu.exact}>
                {({ active }) => (
                  <Link href={menu.to} passHref>
                    <Nav.Link
                      aria-current={active ? 'page' : undefined}
                      color={active ? 'foreground.primary' : 'foreground.secondary'}
                      className={clsx('nav-link', { active })}
                    >
                      {menu.label}
                    </Nav.Link>
                  </Link>
                )}
              </NavLinkContext>
            </li>
          ))}
        </Nav.Links>
      </div>
      <div className="nav__end flex space-x-8 lg:space-x-6">
        <QuickAction className="-my-3 -mx-1">
          {quickActions.map((e, i) => (
            <QuickAction.Item key={i} variant="plain" {...e} />
          ))}
          <QuickActionThemeSwitcher />
        </QuickAction>
        <VerticalRule className="my-auto h-7" />
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
                position="absolute"
                isOpen={isOpen}
                duration={150}
                placement="top"
                inset={{ top: UI.navbarH }}
                zIndex={9999}
                unmountOnCollapse
              >
                <MobileMenu items={menuItems} style={{ height: `calc(100vh - ${UI.navbarH})` }}>
                  {cta}
                </MobileMenu>
              </Drawer>
            </div>
          )}
        </DisclosureContext>
        {cta && <div className="hidden lg:block">{cta}</div>}
      </div>
    </Nav>
  );
},
propsAreEqual);

export default Navbar;
