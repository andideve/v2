import Link from 'next/link';
import React, { useMemo } from 'react';
import { Box, Typography } from '@andideve/design-system';
import clsx from 'clsx';

import useNavlink from '@/hooks/use-navlink';
import memo from '@/utils/client/memo';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

function List({ children }: { children?: React.ReactNode }) {
  return <ul className="list-none">{children}</ul>;
}

const Item = memo<Menu>(({ label, to, exact }: Menu) => {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return (
    <Box
      as="li"
      px={UI.frameX}
      height={UI.navbarH}
      borderColor="separator.default"
      className="relative flex items-center border-b border-solid"
    >
      <Link href={to} passHref>
        <Typography
          as="a"
          aria-current={active ? 'page' : undefined}
          className={clsx(
            'nav-link font-semibold after:absolute after:inset-0',
            active && 'active',
          )}
        >
          {label}
        </Typography>
      </Link>
    </Box>
  );
});

export const MobileMenu = memo<{ items: Menu[]; children?: React.ReactNode }>(
  ({ children, items }) => (
    <Box
      height={`calc(100vh - ${UI.navbarH})`}
      backgroundColor="background.primary"
      className="overflow-y-auto"
    >
      <List>
        {items.map((menu) => (
          <Item key={menu.to} {...menu} />
        ))}
      </List>
      {children && (
        <Box py={`calc(${UI.navbarH}/2)`} px={UI.frameX} className="text-center">
          {children}
        </Box>
      )}
    </Box>
  ),
);

export default MobileMenu;
