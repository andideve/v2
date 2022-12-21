import Link from 'next/link';
import React from 'react';
import { Box, BoxProps } from '@andideve/design-system';
import clsx from 'clsx';

import NavLinkContainer from '@/components/molecules/navlink-container';
import { List, ListItem } from '@/components/atoms/list';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

export function MobileMenu({
  children,
  className,
  items,
  ...rest
}: {
  items: Menu[];
} & Pick<BoxProps, 'children' | 'className' | 'height'>) {
  return (
    <Box
      backgroundColor="background.elevated.primary"
      className={clsx('mobile-menu', className)}
      {...rest}
    >
      <List className="mobile-menu__list border-t-0 border-x-0">
        {items.map((menu) => (
          <ListItem
            key={menu.to}
            px={UI.frameX}
            height={UI.navbarH}
            className="relative flex items-center"
          >
            <NavLinkContainer to={menu.to} exact={menu.exact}>
              {({ active }) => (
                <Link href={menu.to} passHref>
                  <Typography
                    as="a"
                    aria-current={active ? 'page' : undefined}
                    fontWeight="semibold"
                    className={clsx('nav-link after:absolute after:inset-0', active && 'active')}
                  >
                    {menu.label}
                  </Typography>
                </Link>
              )}
            </NavLinkContainer>
          </ListItem>
        ))}
      </List>
      {children && (
        <Box
          py={`calc(${UI.navbarH}/2)`}
          px={UI.frameX}
          className="mobile-menu__bottom flex justify-center"
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export default MobileMenu;
