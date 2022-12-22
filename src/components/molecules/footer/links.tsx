import Link from 'next/link';
import { Navbar as Nav } from '@andideve/ds-navbar';

import { Menu } from '@/types/defaults';

export function FooterLinks({ items }: { items: Menu[] }) {
  return (
    <Nav.Links
      as="ul"
      spacing={0}
      display={{ _: 'grid', lg: 'flex' }}
      className="footer-links grid-cols-2 gap-y-4 gap-x-6 lg:gap-0 lg:space-x-6"
    >
      {items.map(({ label, to }) => (
        <li key={label}>
          <Link href={to} passHref>
            <Nav.Link
              color="foreground.secondary"
              className="nav-link block lg:inline -mx-1 lg:mx-0"
            >
              {label}
            </Nav.Link>
          </Link>
        </li>
      ))}
    </Nav.Links>
  );
}

export default FooterLinks;
