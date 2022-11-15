import React from 'react';
import clsx from 'clsx';

import FormGroup from './form-group';
import FormFooter from './form-footer';

interface FormFC<P = unknown> extends React.FC<P> {
  Group: typeof FormGroup;
  Footer: typeof FormFooter;
}

const Form: FormFC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  className,
  ...rest
}) => (
  <form className={clsx('form', className)} {...rest}>
    {children}
  </form>
);

Form.Group = FormGroup;
Form.Footer = FormFooter;

export default Form;
