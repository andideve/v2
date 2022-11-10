import React from 'react';
import { Box, Table, Typography } from '@andideve/design-system';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import { UI } from '@/config/globals';
import { Project } from '@/types/project';
import Services from '@/services';

interface PageProps extends PageDataProps {
  projects: Project[];
}

export const getServerSideProps = mergeGSSP<PageProps>(gSSP, async () => ({
  props: {
    projects: await Services.getProjects({ archived: true, sort: 'DESC' }).then(
      (res) => res.projects,
    ),
  },
}));

export default function Archive({ author, projects }: PageProps) {
  return (
    <Page author={author} title="Archive">
      <Page.Section minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" size="6xl" className="font-bold">
            Archive
          </Typography>
          <Typography as="p" size="xl" color="foreground.secondary" className="cursor-text mt-4">
            A big list of things I&apos;ve worked on.
          </Typography>
        </Box>
        <div className="-mx-4">
          <Table hoverable>
            <thead>
              <tr>
                <th>Year</th>
                <th>Title</th>
                <th className="hidden lg:table-cell">Tag</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={i}>
                  <td>{new Date(project.date).getFullYear()}</td>
                  <td>
                    <Typography as="span" size="lg" className="font-semibold">
                      {project.title}
                    </Typography>
                  </td>
                  <td className="hidden lg:table-cell">
                    <Tags items={project.tags} bordered />
                  </td>
                  <td>
                    <Links github={project.github} external={project.external} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Page.Section>
    </Page>
  );
}
