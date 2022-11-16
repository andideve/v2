import React from 'react';
import clsx from 'clsx';

import FormGroups from './form-groups';
import FormFooter from './form-footer';

interface FormFC<P = unknown> extends React.FC<P> {
  Groups: typeof FormGroups;
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

Form.Groups = FormGroups;
Form.Footer = FormFooter;

export default Form;
