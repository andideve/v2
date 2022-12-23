import React, { memo } from 'react';
import { Table } from '@andideve/design-system';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import Tags from '@/components/molecules/tags';
import Links from '@/components/molecules/links';
import DateContainer from '@/components/molecules/date-container';
import Typography from '@/components/atoms/typography';
import TableFrame from '@/components/atoms/table-frame';
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

const metadata = {
  title: 'Archive',
  description: "A big list of things I've worked on.",
};

const Archive = memo<PageProps>(function ({ author, projects }) {
  return (
    <Page author={author} title={metadata.title}>
      <Section spacing="1" minHeight={UI.mainViewH}>
        <Section.Header>
          <HeaderContent
            title={
              <Typography as="h2" variant="title-1">
                {metadata.title}
              </Typography>
            }
            description={
              <Typography
                as="p"
                variant="label-1"
                color="foreground.secondary"
                className="cursor-text"
              >
                {metadata.description}
              </Typography>
            }
          />
        </Section.Header>
        <TableFrame>
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
              {projects.map((project) => (
                <tr key={project.title} className="group">
                  <td>
                    <Typography
                      variant="label-4"
                      color="foreground.secondary"
                      className="lg:group-hover:text-inherit"
                    >
                      <DateContainer date={project.date}>
                        {({ fullYear }) => <>{fullYear}</>}
                      </DateContainer>
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
        </TableFrame>
      </Section>
    </Page>
  );
});

export default Archive;
