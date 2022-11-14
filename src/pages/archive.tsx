import React, { memo } from 'react';
import { Box, Table } from '@andideve/design-system';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import Typography from '@/components/atoms/typography';
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

const Archive = memo<PageProps>(function ({ author, projects }) {
  return (
    <Page author={author} title="Archive">
      <Section spacing="1" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Section.Header>
          <Typography as="h2" variant="title-1">
            Archive
          </Typography>
          <Typography
            as="p"
            variant="label-1"
            color="foreground.secondary"
            className="cursor-text mt-4"
          >
            A big list of things I&apos;ve worked on.
          </Typography>
        </Section.Header>
        <Box borderColor="separator.default" className="p-3 border rounded-xl">
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
                  <td>
                    <Typography variant="label-4" color="foreground.secondary">
                      {new Date(project.date).getFullYear()}
                    </Typography>
                  </td>
                  <td>
                    <Typography as="span" variant="title-4">
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
        </Box>
      </Section>
    </Page>
  );
});

export default Archive;
