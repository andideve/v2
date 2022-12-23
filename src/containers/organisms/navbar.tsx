import Link from 'next/link';
import React, { memo } from 'react';
import { Navbar as Nav } from '@andideve/ds-navbar';
import { Drawer } from '@andideve/ds-drawer';
import { dequal } from 'dequal';
import clsx from 'clsx';
import { FiLoader, FiMonitor, FiSun, FiMoon } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import {
  NavBackground,
  NavLinks,
  QuickAction,
  QuickActionItemProps,
  MobileMenu,
} from '@/components/molecules/navbar';
import VerticalRule from '@/components/atoms/vertical-rule';
import WindowScrollDisabler from '@/components/molecules/window-scroll-disabler';
import DisclosureContainer from '@/components/molecules/disclosure-container';
import useThemeHandler from '@/hooks/use-theme-handler';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';
import { Themes } from '@/types/globals';

type QuickActions = Omit<QuickActionItemProps, 'variant'>[];
interface NavbarProps {
  brand: string;
  menuItems: Menu[];
  className?: string;
  quickActions?: QuickActions;
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
  const { isReady, theme, onChange } = useThemeHandler();
  const icon = (
    {
      loading: FiLoader,
      system: FiMonitor,
      light: FiSun,
      dark: FiMoon,
    } as Record<'loading' | Themes, IconType>
  )[!isReady ? 'loading' : theme];
  return (
    <QuickAction.Item
      title={isReady ? 'Switch Theme' : 'Loading...'}
      variant="tinted"
      icon={icon}
      onClick={onChange}
    />
  );
}

const Navbar = memo<NavbarProps>(function ({
  className,
  brand,
  menuItems,
  quickActions = [],
  cta,
}) {
  console.log('[Navbar] render');
  return (
    <Nav
      px={UI.frameX}
      height={UI.navbarH}
      zIndex={9999}
      className={clsx('navbar justify-between', className)}
    >
      <NavBackground className="absolute inset-0 -z-[1]" />
      <Nav.Brand className="navbar__start relative z-10">
        <Link href="/" passHref>
          <a className="after:absolute after:inset-0">{brand}</a>
        </Link>
      </Nav.Brand>
      <div className="navbar__center grow lg:absolute lg:inset-0 hidden lg:flex lg:items-center lg:justify-center">
        <NavLinks items={menuItems} />
      </div>
      <div className="navbar__end flex space-x-8 lg:space-x-6">
        <QuickAction className="-my-3 -mx-1">
          {quickActions.map((e, i) => (
            <QuickAction.Item key={i} variant="plain" {...e} />
          ))}
          <QuickActionThemeSwitcher />
        </QuickAction>
        <VerticalRule className="my-auto h-6" />
        <DisclosureContainer>
          {({ isOpen, onToggle }) => (
            <div className="block lg:hidden">
              <WindowScrollDisabler disable={isOpen} />
              <Nav.Toggle
                aria-controls="main-nav-drawer"
                aria-expanded={isOpen}
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
                <MobileMenu items={menuItems} height={UI.mainViewH} className="overflow-y-auto">
                  {cta}
                </MobileMenu>
              </Drawer>
            </div>
          )}
        </DisclosureContainer>
        {cta && <div className="hidden lg:block">{cta}</div>}
      </div>
    </Nav>
  );
},
propsAreEqual);

export default Navbar;
