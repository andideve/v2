import Link from 'next/link';
import React from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

import { List, ListItem } from '@/components/atoms/list';
import Typography from '@/components/atoms/typography';
import { NavLinkContext } from '@/context/nav-link';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

export function MobileMenu({
  children,
  items,
  ...rest
}: {
  items: Menu[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Box backgroundColor="background.elevated.primary" className="overflow-y-auto" {...rest}>
      <List className="border-t-0 border-x-0">
        {items.map((menu) => (
          <ListItem
            key={menu.to}
            px={UI.frameX}
            height={UI.navbarH}
            className="relative flex items-center"
          >
            <NavLinkContext to={menu.to} exact={menu.exact}>
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
            </NavLinkContext>
          </ListItem>
        ))}
      </List>
      {children && (
        <Box py={`calc(${UI.navbarH}/2)`} px={UI.frameX} className="text-center">
          {children}
        </Box>
      )}
    </Box>
  );
}

export default MobileMenu;
