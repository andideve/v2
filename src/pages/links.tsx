import React, { memo } from 'react';
import { Box } from '@andideve/design-system';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Linktree from '@/containers/organisms/linktree';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import { Linktree as LinktreeType } from '@/types/linktree';
import Services from '@/services';

interface PageProps extends PageDataProps {
  linktrees: LinktreeType[];
}

export const getServerSideProps = mergeGSSP<PageProps>(gSSP, async () => ({
  props: {
    linktrees: await Services.getLinktrees().then((res) => res.linktrees),
  },
}));

const Links = memo<PageProps>(function ({ author, linktrees }) {
  return (
    <Page author={author} title="Links">
      <Page.Section containerW="sm" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" variant="title-1">
            @{author.name}
          </Typography>
          <Typography
            as="p"
            variant="label-1"
            color="foreground.secondary"
            className="cursor-text mt-4"
          >
            {author.description}
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
});

export default Links;
