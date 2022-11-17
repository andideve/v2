import React, { memo } from 'react';
import { Button } from '@andideve/design-system';
import { FiPlus } from 'react-icons/fi';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import Project from '@/containers/organisms/project';
import ShowMoreContainer from '@/components/molecules/showmore-container';
import Typography from '@/components/atoms/typography';
import useSearch from '@/hooks/use-search';
import { UI } from '@/config/globals';
import { Project as ProjectType } from '@/types/project';
import Services from '@/services';

interface PageProps extends PageDataProps {
  projects: ProjectType[];
}

export const getServerSideProps = mergeGSSP<PageProps>(gSSP, async () => ({
  props: {
    projects: await Services.getProjects({ archived: false, sort: 'DESC' }).then(
      (res) => res.projects,
    ),
  },
}));

const Work = memo<PageProps>(function ({ author, projects }) {
  const finder = useSearch(projects);
  return (
    <Page author={author} title="My Work">
      <Section spacing="1" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Section.Header>
          <HeaderContent
            title={
              <Typography as="h2" variant="title-1">
                My Work
              </Typography>
            }
          />
          <Typography as="p" color="foreground.secondary" className="mt-8 mb-4">
            Search by topics
          </Typography>
          <form className="flex flex-wrap -mt-2 -ml-[.875rem]">
            {finder.options.map((option) => (
              <Button
                key={option.value}
                as="label"
                variant={option.selected ? 'filled' : 'gray'}
                rounded="full"
                className="relative mt-2 ml-[.875rem]"
                disabled={option.disabled}
              >
                {option.value}
                <input
                  type="checkbox"
                  value={option.value}
                  checked={option.selected}
                  className="opacity-0 absolute inset-0"
                  onChange={finder.onChange}
                />
              </Button>
            ))}
          </form>
        </Section.Header>
        {finder.notFound && (
          <Typography as="p" variant="label-1" color="foreground.secondary">
            Couldn&apos;t find anything to match your criteria. Sorry.
          </Typography>
        )}
        <ShowMoreContainer items={finder.list} limit={9}>
          {({ list, shouldRenderButton, onShowMore }) => (
            <>
              <Project.List>
                {list.map((project, i) => (
                  <Project.Item key={i} {...(project as ProjectType)} />
                ))}
              </Project.List>
              {shouldRenderButton && (
                <Section.Footer className="text-center">
                  <Button size="lg" variant="tinted" iconRight={<FiPlus />} onClick={onShowMore}>
                    Show more
                  </Button>
                </Section.Footer>
              )}
            </>
          )}
        </ShowMoreContainer>
      </Section>
    </Page>
  );
});

export default Work;
