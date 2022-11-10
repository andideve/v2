import React, { useMemo } from 'react';
import { Box, Typography } from '@andideve/design-system';
import { FiHexagon, FiFolder, FiFile } from 'react-icons/fi';

import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import { Project } from '@/types/project';

function getSVG({ archived, github, external }: Pick<Project, 'archived' | 'github' | 'external'>) {
  if (archived) return FiFolder;
  if (github && !external) return FiHexagon;
  return FiFile;
}

function List({ children }: { children?: React.ReactNode }) {
  return <div className="grid-container gap-y-5 md:gap-y-8">{children}</div>;
}

function Item({ date, title, description, tags = [], github, external, archived }: Project) {
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
        <header>
          <time dateTime={date} className="sr-only">
            {date}
          </time>
          <Typography as="h3" size="xl" className="font-semibold">
            {title}
          </Typography>
        </header>
        <Typography as="p" color="foreground.secondary" className="cursor-text mt-4">
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
}

const Project = { List, Item };

export default Project;
