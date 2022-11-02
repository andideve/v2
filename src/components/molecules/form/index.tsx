import React from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

import { UI } from '@/config/globals';

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;
type HTMLProps = React.HTMLAttributes<HTMLElement>;

const Form: React.FC<FormProps> & { Group: React.FC<HTMLProps>; Footer: React.FC<HTMLProps> } = ({
  children,
  className,
  ...rest
}) => (
  <form className={className} {...rest}>
    {children}
  </form>
);

Form.Group = ({ children, className, ...rest }) => (
  <div className={clsx('mt-8 first-of-type:mt-0', className)} {...rest}>
    {children}
  </div>
);

Form.Footer = ({ children, className, ...rest }) => (
  <Box
    mt={UI.frameY}
    className={clsx('flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4', className)}
    {...rest}
  >
    {children}
  </Box>
);

export default Form;
