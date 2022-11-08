import Link from 'next/link';
import React from 'react';
import { Box, Button, Typography } from '@andideve/design-system';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, Section, gSSP, PageDataProps } from '@/containers/templates/page';
import Project from '@/containers/organisms/project';
import Typing from '@/components/molecules/typing';
import useShowLess from '@/hooks/use-show-less';
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

function Hero({ author }: { author: Author }) {
  const greeting = `Hello, I'm ${author.name}.`;
  return (
    <Section
      containerW={590}
      minHeight={`calc(100vh - ${UI.navbarH})`}
      className="flex flex-col justify-center text-center"
    >
      <header>
        <h2>
          <Typing as="div" color="accent" className="mb-4 font-normal">
            {greeting}
          </Typing>
          <Typography as="div" size="6xl" className="font-bold">
            {author.description}
          </Typography>
        </h2>
      </header>
      {author.intro && (
        <Typography as="p" size="xl" color="foreground.secondary" className="cursor-text mt-4">
          {author.intro}
        </Typography>
      )}
    </Section>
  );
}

function LatestProjects({ items }: { items: ProjectType[] }) {
  const { list, shouldRenderButton, isOpen, onToggle } = useShowLess(items, 3);
  return (
    <Section>
      <header className="mb-12 text-center">
        <Typography as="h2" size="4xl" className="font-semibold">
          Latest my work
        </Typography>
        <Link href={SITE_PATHS.work} passHref>
          <Typography as="a" color="accent" className="inline-block mt-4">
            view all projects
          </Typography>
        </Link>
      </header>
      <Project.List>
        {list.map((project, i) => (
          <Project.Item key={i} {...project} />
        ))}
      </Project.List>
      {shouldRenderButton && (
        <Box as="footer" mt={UI.frameY} className="text-center">
          <Button
            size="lg"
            variant="tinted"
            iconRight={isOpen ? <FiChevronUp /> : <FiChevronDown />}
            onClick={onToggle}
          >
            {isOpen ? 'Show less' : 'Show more'}
          </Button>
        </Box>
      )}
    </Section>
  );
}

export default function Home({ author, projects }: PageProps) {
  return (
    <Page author={author} title={author.name} description={author.description}>
      <Hero author={author} />
      <LatestProjects items={projects} />
    </Page>
  );
}
