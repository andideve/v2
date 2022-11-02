import React, { useCallback, useState } from 'react';
import { Box, Input, Typography, Button, StyledInput } from '@andideve/design-system';
import { useForm } from 'react-hook-form';

import mergeGSSP from '@/utils/server/merge-gssp';

import { Page, gSSP, PageDataProps } from '@/containers/templates/page';
import Form from '@/components/molecules/form';
import { UI } from '@/config/globals';
import { Email } from '@/types/email';
import Services from '@/services';

const TextArea = StyledInput.withComponent('textarea');

type PageProps = PageDataProps;

export const getServerSideProps = mergeGSSP<PageProps>(gSSP);

export default function Links({ author }: PageProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<Email>();

  const pushData = async (email: Email) => {
    setLoading(true);
    try {
      await Services.postEmail(email);
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
      <label htmlFor="name">
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
      <label htmlFor="from">
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
      <label htmlFor="body">
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
      <Page.Section containerW="sm" minHeight={`calc(100vh - ${UI.navbarH})`}>
        <Box as="header" mb={UI.frameY}>
          <Typography as="h2" size="6xl" className="font-bold">
            Hey! Wanna collaborate?
          </Typography>
        </Box>
        <Form onSubmit={form.handleSubmit(pushData)} onReset={onReset}>
          <Form.Group>{inputs.name}</Form.Group>
          <Form.Group>{inputs.from}</Form.Group>
          <Box mt={UI.frameY} className="mb-12">
            <Typography as="h3" size="4xl" className="font-semibold">
              Share your idea with me
            </Typography>
            <Typography as="p" size="lg" color="foreground.secondary" className="cursor-text mt-4">
              Shoot me a direct email and I will get in touch with you as soon as possible.
            </Typography>
          </Box>
          <Form.Group>{inputs.body}</Form.Group>
          <Form.Footer>
            <Button type="submit" size="lg" variant="filled" disabled={loading}>
              Send message
            </Button>
            <Button type="reset" size="lg" variant="plain">
              Reset form
            </Button>
          </Form.Footer>
        </Form>
      </Page.Section>
    </Page>
  );
}
