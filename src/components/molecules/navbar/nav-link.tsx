import Link from 'next/link';
import React, { useMemo } from 'react';
import { Navbar as Nav } from '@andideve/ds-navbar';
import clsx from 'clsx';

import useNavlink from '@/hooks/use-navlink';
import memo from '@/utils/client/memo';
import { Menu } from '@/types/defaults';

export const NavLink = memo<
  Omit<Menu, 'label'> & { children?: React.ReactNode; className?: string }
>(({ children, className, to, exact }) => {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return (
    <Link href={to} passHref>
      <Nav.Link active={active} className={clsx('nav-link', active && 'active', className)}>
        {children}
      </Nav.Link>
    </Link>
  );
});

export default NavLink;
