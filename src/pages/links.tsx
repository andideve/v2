import type { GetServerSideProps } from 'next';
import React, { memo } from 'react';

import { Page, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import Linktree from '@/containers/organisms/linktree';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import { Linktree as LinktreeType } from '@/types/linktree';
import Services from '@/services';

interface PageProps extends PageDataProps {
  linktrees: LinktreeType[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
  props: {
    author: await Services.getAuthor(),
    linktrees: await Services.getLinktrees().then((res) => res.linktrees),
  },
});

const metadata = {
  title: 'Links',
};

const Links = memo<PageProps>(function ({ author, linktrees }) {
  return (
    <Page author={author} title={metadata.title}>
      <Section spacing="1" containerW="sm" minHeight={UI.mainViewH}>
        <Section.Header>
          <HeaderContent
            title={
              <Typography as="h2" variant="title-1">
                @{author.name}
              </Typography>
            }
            description={
              <Typography
                as="p"
                variant="label-1"
                color="foreground.secondary"
                className="cursor-text"
              >
                {author.description}
              </Typography>
            }
          />
        </Section.Header>
        <Linktree.List>
          {linktrees.map((linktree, i) => (
            <Linktree.Item key={i} {...linktree} />
          ))}
        </Linktree.List>
      </Section>
    </Page>
  );
});

export default Links;
