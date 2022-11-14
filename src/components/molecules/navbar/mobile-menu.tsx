import Link from 'next/link';
import React, { useMemo } from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

import { List, ListItem } from '@/components/atoms/list';
import Typography from '@/components/atoms/typography';
import useNavlink from '@/hooks/use-navlink';
import { UI } from '@/config/globals';
import { Menu } from '@/types/defaults';

function Item({ label, to, exact }: Menu) {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return (
    <ListItem px={UI.frameX} height={UI.navbarH} className="relative">
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
    </ListItem>
  );
}

export function MobileMenu({ children, items }: { items: Menu[]; children?: React.ReactNode }) {
  return (
    <Box
      height={`calc(100vh - ${UI.navbarH})`}
      backgroundColor="background.elevated.primary"
      className="overflow-y-auto"
    >
      <List className="border-t-0 border-x-0">
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
  );
}

export default MobileMenu;
