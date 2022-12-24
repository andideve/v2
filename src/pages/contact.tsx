import type { GetServerSideProps } from 'next';
import React, { useState, memo } from 'react';
import { Box, Button } from '@andideve/design-system';

import { Page, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import ContactForm, { FieldValues } from '@/containers/organisms/contact-form';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import Services, { CreateEmailRequestBodyParameters } from '@/services';

type PageProps = PageDataProps;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
  props: {
    author: await Services.getAuthor(),
  },
});

const metadata = {
  title: 'Contact',
};

const Contact = memo<PageProps>(function ({ author }) {
  const [loading, setLoading] = useState(false);

  const pushData = async (values: FieldValues) => {
    setLoading(true);
    const body: CreateEmailRequestBodyParameters = {
      name: values.name,
      from: values.email,
      body: values.message,
    };
    try {
      await Services.postEmail(body);
      window.alert('Message was sent!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page author={author} title={metadata.title}>
      <Section spacing="1" containerW="sm" minHeight={UI.mainViewH}>
        <Section.Header>
          <HeaderContent
            title={
              <Typography as="h2" variant="title-1">
                Hey! Wanna collaborate?
              </Typography>
            }
          />
        </Section.Header>
        <ContactForm handleSubmit={pushData}>
          <ContactForm.Groups>
            <ContactForm.Name />
            <ContactForm.Email />
          </ContactForm.Groups>
          <Box mt={UI.frameY} className="mb-12">
            <HeaderContent
              title={
                <Typography as="h3" variant="title-2">
                  Share your idea with me
                </Typography>
              }
              description={
                <Typography
                  as="p"
                  variant="label-2"
                  color="foreground.secondary"
                  className="cursor-text"
                >
                  Shoot me a direct email and I will get in touch with you as soon as possible.
                </Typography>
              }
            />
          </Box>
          <ContactForm.Message />
          <ContactForm.Footer>
            <Button type="submit" size="lg" variant="filled" rounded="full" disabled={loading}>
              Send message
            </Button>
            <Button type="reset" size="lg" variant="plain" rounded="full">
              Reset form
            </Button>
          </ContactForm.Footer>
        </ContactForm>
      </Section>
    </Page>
  );
});

export default Contact;
