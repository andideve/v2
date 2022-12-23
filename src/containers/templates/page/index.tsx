import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import React from 'react';
import { Box } from '@andideve/design-system';
import { Button } from '@andideve/design-system';
import { FiArrowRight, FiBox, FiGithub, FiTwitter } from 'react-icons/fi';

import Head from './head';
import Navbar from '@/containers/organisms/navbar';
import Footer from '@/containers/organisms/footer';
import { SITE_PATHS, UI, EXT_LINKS } from '@/config/globals';
import { PageMetadata, Author } from '@/types/defaults';
import { siteMenu, extendedSiteMenu } from '../../../_data/app/site-menu';
import Services from '@/services';

const cta = (
  <Link href={SITE_PATHS.contact} passHref>
    <Button as="a" variant="filled" rounded="full" iconRight={<FiArrowRight />}>
      Contact me
    </Button>
  </Link>
);

export interface PageDataProps {
  author: Author;
}

interface PageProps extends PageDataProps, PageMetadata {
  children?: React.ReactNode;
}

export const gSSP: GetServerSideProps<PageDataProps> = async () => ({
  props: {
    author: await Services.getAuthor(),
  },
});

export const Page: React.FC<PageProps> = ({
  children,
  author,
  title,
  description = author.description,
}) => (
  <>
    <Head title={title} description={description} />
    <header>
      <h1 className="sr-only">{title}</h1>
      <Navbar
        className="fixed top-0 inset-x-0"
        brand={author.name}
        menuItems={siteMenu}
        cta={cta}
        quickActions={[
          {
            title: 'GitHub Profile',
            href: author.urls.github,
            icon: FiGithub,
          },
          {
            title: 'Twitter Profile',
            href: author.urls.twitter,
            external: true,
            icon: FiTwitter,
          },
        ]}
      />
    </header>
    <Box as="main" mt={UI.navbarH}>
      {children}
    </Box>
    <Footer
      brand={author.name}
      menuItems={extendedSiteMenu}
      quickActions={[
        {
          title: 'View Source Code',
          href: EXT_LINKS.ghRepository,
          external: true,
          icon: FiBox,
        },
      ]}
      copy="MIT License &copy; 2022 Andi."
    />
  </>
);

export default Page;
