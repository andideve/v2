import React, { useMemo, memo } from 'react';
import { Box } from '@andideve/design-system';
import { FiHexagon, FiFolder, FiFile } from 'react-icons/fi';
import { dequal } from 'dequal';

import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import Typography from '@/components/atoms/typography';
import { Project } from '@/types/project';

function getSVG({ archived, github, external }: Pick<Project, 'archived' | 'github' | 'external'>) {
  if (archived) return FiFolder;
  if (github && !external) return FiHexagon;
  return FiFile;
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
  const SVG = useMemo(() => getSVG({ archived, github, external }), [archived, github, external]);
  return (
    <Box
      as="article"
      borderColor="separator.default"
      backgroundColor="background.elevated.primary"
      className="relative col-span-full md:col-span-4 flex flex-col p-6 border rounded-md shadow"
    >
      <div className="mb-4 min-h-[2.625rem]">
        <SVG strokeWidth={1} className="w-11 h-11" style={{ color: 'var(--ds-colors-accent)' }} />
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
        {(github || external) && <Links github={github} external={external} />}
      </footer>
    </Box>
  );
},
propsAreEqual);

export default ProjectItem;
