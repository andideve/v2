import React, { useCallback, useState, memo } from 'react';
import { Box, Input, Button, StyledInput } from '@andideve/design-system';
import { useForm } from 'react-hook-form';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Section from '@/containers/templates/section';
import HeaderContent from '@/containers/templates/header-content';
import Form from '@/containers/templates/form';
import Typography from '@/components/atoms/typography';
import { UI } from '@/config/globals';
import { Email } from '@/types/email';
import Services, { CreateEmailRequestBodyParameters } from '@/services';

const TextArea = StyledInput.withComponent('textarea');

type PageProps = PageDataProps;

export const getServerSideProps = mergeGSSP<PageProps>(gSSP);

const Contact = memo<PageProps>(function ({ author }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<Email>();

  const pushData = async (email: Email) => {
    setLoading(true);
    const body: CreateEmailRequestBodyParameters = {
      name: email.name,
      from: email.from,
      subject: email.subject,
      body: email.body,
    };
    try {
      await Services.postEmail(body);
      form.reset();
      window.alert('Message was sent!');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onReset = useCallback(() => {
    form.reset();
  }, []);

  const inputs: Record<keyof Omit<Email, 'subject'>, React.ReactElement> = {
    name: (
      <label htmlFor="name" className="block">
        <Input
          type="text"
          variant="flushed"
          rounded={0}
          $size="xl"
          placeholder="What's your full name? *"
          {...form.register('name', { required: true })}
        />
      </label>
    ),
    from: (
      <label htmlFor="from" className="block">
        <Input
          type="email"
          variant="flushed"
          rounded={0}
          $size="xl"
          placeholder="Your fancy email *"
          {...form.register('from', { required: true })}
        />
      </label>
    ),
    body: (
      <label htmlFor="body" className="block">
        <TextArea
          variant="flushed"
          placeholder="Write a Message *"
          rows={4}
          {...form.register('body', { required: true })}
        />
      </label>
    ),
  };

  return (
    <Page author={author} title="Contact">
      <Section spacing="1" containerW="sm" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Section.Header>
          <HeaderContent
            title={
              <Typography as="h2" variant="title-1">
                Hey! Wanna collaborate?
              </Typography>
            }
          />
        </Section.Header>
        <Form onSubmit={form.handleSubmit(pushData)} onReset={onReset}>
          <Form.Groups>
            {inputs.name}
            {inputs.from}
          </Form.Groups>
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
          {inputs.body}
          <Form.Footer>
            <Button type="submit" size="lg" variant="filled" disabled={loading}>
              Send message
            </Button>
            <Button type="reset" size="lg" variant="plain">
              Reset form
            </Button>
          </Form.Footer>
        </Form>
      </Section>
    </Page>
  );
});

export default Contact;
