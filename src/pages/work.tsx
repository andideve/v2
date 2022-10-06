import React from 'react';
import { Box, Typography, Button } from '@andideve/design-system';
import { FiPlus } from 'react-icons/fi';

import createGetSSP from '../utils/server/get-ssp';

import { Page, getPageProps, PageDataProps } from '../containers/templates/page';
import useShowMore from '../hooks/use-show-more';
import useSearch from '../hooks/use-search';
import { UI } from '../config/globals';
import { Project as ProjectType } from '../types/project';
import Services from '../services';
import Project from '../containers/organisms/project';

interface PageProps extends PageDataProps {
  projects: ProjectType[];
  tags: string[];
}

export const getServerSideProps = createGetSSP(getPageProps, async () => {
  const projects = await Services.getProjects({ archived: false, sort: 'DESC' }).then(
    (res) => res.projects,
  );
  const tags = Array.from(new Set(projects.map((project) => project.tags).flat()));

  return { projects, tags };
});

export default function Work({ author, projects, tags }: PageProps) {
  const finder = useSearch(projects);
  const { list, shouldRenderButton, onShowMore } = useShowMore(
    finder.shouldRender ? finder.list : projects,
    9,
  );
  return (
    <Page author={author} title="My Work">
      <Page.Section minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" size="6xl" className="font-bold">
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
          <Typography as="p" size="2xl" color="foreground.secondary">
            Couldn&apos;t find anything to match your criteria. Sorry.
          </Typography>
        )}
        <Project.List>
          {list.map((project, i) => (
            <Project.Item key={i} {...project} />
          ))}
        </Project.List>
        {shouldRenderButton && (
          <Box as="footer" mt={UI.frameY} className="text-center">
            <Button size="lg" variant="tinted" iconRight={<FiPlus />} onClick={onShowMore}>
              Show more
            </Button>
          </Box>
        )}
      </Page.Section>
    </Page>
  );
}
