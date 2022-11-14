import React, { memo } from 'react';
import { Box, Button } from '@andideve/design-system';
import { FiPlus } from 'react-icons/fi';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Project from '@/containers/organisms/project';
import Typography from '@/components/atoms/typography';
import { ShowMoreContext } from '@/context/show-more';
import useSearch from '@/hooks/use-search';
import { UI } from '@/config/globals';
import { Project as ProjectType } from '@/types/project';
import Services from '@/services';

interface PageProps extends PageDataProps {
  projects: ProjectType[];
  tags: string[];
}

export const getServerSideProps = mergeGSSP<PageProps>(gSSP, async () => {
  const projects = await Services.getProjects({ archived: false, sort: 'DESC' }).then(
    (res) => res.projects,
  );
  const tags = Array.from(new Set(projects.map((project) => project.tags ?? []).flat()));

  return {
    props: { projects, tags },
  };
});

const Work = memo<PageProps>(function ({ author, projects, tags }) {
  const finder = useSearch(projects);
  return (
    <Page author={author} title="My Work">
      <Page.Section minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" variant="title-1">
            My Work
          </Typography>
          <Typography as="p" color="foreground.secondary" className="mt-8 mb-4">
            Search by topics
          </Typography>
          <form className="flex flex-wrap -mt-2 -ml-[.875rem]">
            {tags.map((tag) => (
              <Button
                key={tag}
                as="label"
                variant={finder.isActive(tag) ? 'filled' : 'gray'}
                rounded="full"
                className="relative mt-2 ml-[.875rem]"
                disabled={finder.isDisabledOption(tag)}
              >
                {tag}
                <input
                  type="checkbox"
                  value={tag}
                  checked={finder.isActive(tag)}
                  className="opacity-0 absolute inset-0"
                  onChange={finder.onToggle(tag)}
                />
              </Button>
            ))}
          </form>
        </Box>
        {finder.notFound && (
          <Typography as="p" variant="label-1" color="foreground.secondary">
            Couldn&apos;t find anything to match your criteria. Sorry.
          </Typography>
        )}
        <ShowMoreContext items={finder.shouldRender ? finder.list : projects} limit={9}>
          {({ list, shouldRenderButton, onShowMore }) => (
            <>
              <Project.List>
                {list.map((project, i) => (
                  <Project.Item key={i} {...(project as ProjectType)} />
                ))}
              </Project.List>
              {shouldRenderButton && (
                <Box as="footer" mt={UI.frameY} className="text-center">
                  <Button size="lg" variant="tinted" iconRight={<FiPlus />} onClick={onShowMore}>
                    Show more
                  </Button>
                </Box>
              )}
            </>
          )}
        </ShowMoreContext>
      </Page.Section>
    </Page>
  );
});

export default Work;
