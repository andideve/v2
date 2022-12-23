import React, { createContext, useCallback, useMemo } from 'react';
import { Input, StyledInput } from '@andideve/design-system';
import { useForm, UseFormRegister } from 'react-hook-form';

import Form from '../templates/form';

const TextArea = StyledInput.withComponent('textarea');

export interface FieldValues {
  name: string;
  email: string;
  message: string;
}

type ContextValue = { register: UseFormRegister<FieldValues> };

const Ctx = createContext({} as ContextValue);

interface ContactFormFC<P = unknown> extends React.FC<P>, Pick<typeof Form, 'Groups' | 'Footer'> {
  Name: React.FC;
  Email: React.FC;
  Message: React.FC;
}

const ContactForm: ContactFormFC<{
  children?: React.ReactNode;
  handleSubmit?(values: FieldValues): Promise<any>;
}> = ({ children, handleSubmit: handleSubmitAPI }) => {
  const form = useForm<FieldValues>();
  const ctxValue = useMemo((): ContextValue => ({ register: form.register }), []);

  const onValid = async (values: FieldValues) => {
    if (typeof handleSubmitAPI !== 'function') return;
    await handleSubmitAPI(values);
    form.reset();
  };

  const onReset = useCallback(() => {
    form.reset();
  }, []);

  return (
    <Form onSubmit={form.handleSubmit(onValid)} onReset={onReset}>
      <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>
    </Form>
  );
};

ContactForm.Groups = Form.Groups;
ContactForm.Footer = Form.Footer;

ContactForm.Name = () => (
  <Ctx.Consumer>
    {({ register }) => (
      <label htmlFor="name" className="block">
        <Input
          type="text"
          variant="flushed"
          rounded={0}
          $size="xl"
          placeholder="What's your full name? *"
          {...register('name', { required: true })}
        />
      </label>
    )}
  </Ctx.Consumer>
);

ContactForm.Email = () => (
  <Ctx.Consumer>
    {({ register }) => (
      <label htmlFor="email" className="block">
        <Input
          type="email"
          variant="flushed"
          rounded={0}
          $size="xl"
          placeholder="Your fancy email *"
          {...register('email', { required: true })}
        />
      </label>
    )}
  </Ctx.Consumer>
);

ContactForm.Message = () => (
  <Ctx.Consumer>
    {({ register }) => (
      <label htmlFor="message" className="block">
        <TextArea
          variant="flushed"
          placeholder="Write a Message *"
          rows={4}
          {...register('message', { required: true })}
        />
      </label>
    )}
  </Ctx.Consumer>
);

export default ContactForm;
