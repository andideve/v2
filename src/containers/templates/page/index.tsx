import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import React from 'react';
import { Box, BoxProps, Theme } from '@andideve/design-system';
import { Button } from '@andideve/design-system';
import { FiArrowRight, FiBox, FiGithub, FiTwitter } from 'react-icons/fi';

import Head from './Head';
import Navbar from '../../../containers/organisms/navbar';
import Footer from '../../organisms/footer';
import { SITE_PATHS, UI, EXT_LINKS } from '../../../config/globals';
import { PageMetadata, Author } from '../../../types/defaults';
import { siteMenu, extendedSiteMenu } from '../../../_data/app/site-menu';
import Services from '../../../services';

const cta = (
  <Link href={SITE_PATHS.contact} passHref>
    <Button as="a" variant="filled" iconRight={<FiArrowRight />}>
      Contact me
    </Button>
  </Link>
);

function Section({
  children,
  containerW: _containerW = 'xl',
  ...rest
}: {
  containerW?: keyof Theme['screens'] | number;
} & BoxProps) {
  return (
    <Box as="section" py={UI.frameY} px={UI.frameX} {...rest}>
      <Box
        width={typeof _containerW === 'number' ? _containerW : `var(--ds-screens-${_containerW})`}
        className="mx-auto max-w-full"
      >
        {children}
      </Box>
    </Box>
  );
}

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

export const Page: React.FC<PageProps> & { Section: typeof Section } = ({
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
        brand={author.name}
        menuItems={siteMenu}
        cta={cta}
        iconButtons={[
          {
            title: 'GitHub Profile',
            href: author.urls.github,
            children: FiGithub,
          },
          {
            title: 'Twitter',
            href: author.urls.twitter,
            external: true,
            children: FiTwitter,
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
      iconButtons={[
        {
          title: 'GitHub Repository',
          href: EXT_LINKS.ghRepository,
          external: true,
          children: FiBox,
        },
      ]}
      copy="MIT License &copy; 2022 Andi."
    />
  </>
);

Page.Section = Section;

export default Page;
