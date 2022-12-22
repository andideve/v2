import Link from 'next/link';
import React from 'react';
import { Navbar as Nav } from '@andideve/ds-navbar';
import clsx from 'clsx';

import NavLinkContainer from '../navlink-container';
import { Menu } from '@/types/defaults';

export function NavLinks({ items }: { items: Menu[] }) {
  return (
    <Nav.Links as="ul">
      {items.map(({ label, to, exact }) => (
        <li key={label}>
          <NavLinkContainer to={to} exact={exact}>
            {({ active }) => (
              <Link href={to} passHref>
                <Nav.Link
                  aria-current={active ? 'page' : undefined}
                  color={active ? 'foreground.primary' : 'foreground.secondary'}
                  className={clsx('nav-link', { active })}
                >
                  {label}
                </Nav.Link>
              </Link>
            )}
          </NavLinkContainer>
        </li>
      ))}
    </Nav.Links>
  );
}

export default NavLinks;
