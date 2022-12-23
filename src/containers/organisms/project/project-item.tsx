import React, { memo } from 'react';
import { Box, Theme } from '@andideve/design-system';
import { useTheme } from '@emotion/react';
import { FiHexagon, FiFolder, FiFile } from 'react-icons/fi';
import { dequal } from 'dequal';

import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import Typography from '@/components/atoms/typography';
import { categorify, Categories } from '@/utils/client/projects';
import { Project } from '@/types/project';

function Icon({ category }: { category: Categories }) {
  const theme = useTheme() as Theme;

  const SVG = (
    {
      general: FiFile,
      repository: FiHexagon,
      archive: FiFolder,
    } as Record<Categories, React.FC<React.SVGAttributes<SVGSVGElement>>>
  )[category];

  return <SVG strokeWidth={1} className="w-11 h-11" style={{ color: theme.colors.accent }} />;
}

function propsAreEqual(prev: Project, next: Project) {
  return [
    prev.date === next.date,
    prev.title === next.title,
    prev.description === next.description,
    dequal(prev.tags, next.tags),
    prev.github === next.github,
    prev.external === next.external,
    prev.archived === next.archived,
  ].every(Boolean);
}

const ProjectItem = memo(function ({
  date,
  title,
  description,
  tags = [],
  github,
  external,
  archived,
}: Project) {
  return (
    <Box
      as="article"
      borderColor="separator.default"
      backgroundColor="background.elevated.primary"
      className="project-item relative col-span-full md:col-span-4 flex flex-col p-6 border rounded-lg shadow"
    >
      <div className="mb-4 min-h-[2.625rem]">
        <Icon category={categorify({ archived, github, external })} />
      </div>
      <div className="grow">
        <header className="mb-4">
          <time dateTime={date} className="sr-only">
            {date}
          </time>
          <Typography as="h3" variant="title-3">
            {title}
          </Typography>
        </header>
        <Typography as="p" variant="label-3" color="foreground.secondary" className="cursor-text">
          {description}
        </Typography>
      </div>
      {tags.length ? (
        <div className="mt-4">
          <Tags items={tags} />
        </div>
      ) : null}
      <footer className="absolute top-6 right-6 flex items-center h-[2.625rem]">
        <Links github={github} external={external} />
      </footer>
    </Box>
  );
},
propsAreEqual);

export default ProjectItem;
