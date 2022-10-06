import Link from 'next/link';
import React, { useMemo } from 'react';
import { Navbar as Nav } from '@andideve/ds-navbar';
import clsx from 'clsx';

import useNavlink from '../../../hooks/use-navlink';
import { Menu } from '../../../types/defaults';

export function NavLink({
  children,
  className,
  to,
  exact,
}: Omit<Menu, 'label'> & { children?: React.ReactNode; className?: string }) {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return (
    <Link href={to} passHref>
      <Nav.Link active={active} className={clsx('nav-link', active && 'active', className)}>
        {children}
      </Nav.Link>
    </Link>
  );
}

export default NavLink;
