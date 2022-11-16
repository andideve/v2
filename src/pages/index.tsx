import Link from 'next/link';
import React, { memo } from 'react';
import { Button } from '@andideve/design-system';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import Project from '@/containers/organisms/project';
import Typing from '@/components/molecules/typing';
import Typography from '@/components/atoms/typography';
import { ShowLessContext } from '@/context/show-less';
import { SITE_PATHS, UI } from '@/config/globals';
import { Author } from '@/types/defaults';
import { Project as ProjectType } from '@/types/project';
import Services from '@/services';

interface PageProps extends PageDataProps {
  projects: ProjectType[];
}

export const getServerSideProps = mergeGSSP<PageProps>(gSSP, async () => ({
  props: {
    projects: await Services.getProjects({ archived: false, sort: 'DESC', limit: 9 }).then(
      (res) => res.projects,
    ),
  },
}));

const Hero = memo<{ author: Author }>(function ({ author }) {
  const greeting = `Hello, I'm ${author.name}.`;
  return (
    <Section
      containerW={590}
      minHeight={`calc(100vh - ${UI.navbarH})`}
      className="flex flex-col justify-center text-center"
    >
      <header>
        <h2>
          <HeaderContent
            title={
              <Typing as="div" color="accent">
                {greeting}
              </Typing>
            }
            description={
              <Typography as="div" variant="title-1">
                {author.description}
              </Typography>
            }
          />
        </h2>
      </header>
      {author.intro && (
        <Typography
          as="p"
          variant="label-1"
          color="foreground.secondary"
          className="cursor-text mt-4"
        >
          {author.intro}
        </Typography>
      )}
    </Section>
  );
});

const LatestProjects = memo<{ items: ProjectType[] }>(function ({ items }) {
  return (
    <Section spacing="2" centered>
      <Section.Header>
        <HeaderContent
          title={
            <Typography as="h2" variant="title-2">
              Latest my work
            </Typography>
          }
          description={
            <Link href={SITE_PATHS.work} passHref>
              <Typography as="a" color="accent" className="inline-block">
                view all projects
              </Typography>
            </Link>
          }
        />
      </Section.Header>
      <ShowLessContext items={items} limit={3}>
        {({ list, shouldRenderButton, isOpen, onToggle }) => (
          <>
            <Project.List>
              {list.map((project, i) => (
                <Project.Item key={i} {...(project as ProjectType)} />
              ))}
            </Project.List>
            {shouldRenderButton && (
              <Section.Footer>
                <Button
                  size="lg"
                  variant="gray"
                  iconRight={isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  onClick={onToggle}
                >
                  {isOpen ? 'Show less' : 'Show more'}
                </Button>
              </Section.Footer>
            )}
          </>
        )}
      </ShowLessContext>
    </Section>
  );
});

const Home = memo<PageProps>(function ({ author, projects }) {
  return (
    <Page author={author} title={author.name} description={author.description}>
      <Hero author={author} />
      <LatestProjects items={projects} />
    </Page>
  );
});

export default Home;
