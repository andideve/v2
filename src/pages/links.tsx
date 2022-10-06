import React from 'react';
import { Box, Typography } from '@andideve/design-system';

import createGetSSP from '../utils/server/get-ssp';

import { Page, getPageProps, PageDataProps } from '../containers/templates/page';
import Linktree from '../containers/organisms/linktree';
import { UI } from '../config/globals';
import { Linktree as LinktreeType } from '../types/linktree';
import Services from '../services';

interface PageProps extends PageDataProps {
  linktrees: LinktreeType[];
}

export const getServerSideProps = createGetSSP(getPageProps, async () => ({
  linktrees: await Services.getLinktrees().then((res) => res.linktrees),
}));

export default function Links({ author, linktrees }: PageProps) {
  return (
    <Page author={author} title="Links">
      <Page.Section containerW="sm" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" size="6xl" className="font-bold">
            Links
          </Typography>
          <Typography as="p" size="xl" color="foreground.secondary" className="cursor-text mt-4">
            A links to my profile on multiple platforms.
          </Typography>
        </Box>
        <Linktree.List>
          {linktrees.map((linktree, i) => (
            <Linktree.Item key={i} {...linktree} />
          ))}
        </Linktree.List>
      </Page.Section>
    </Page>
  );
}
