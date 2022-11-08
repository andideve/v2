import React from 'react';
import { Box } from '@andideve/design-system';
import clsx from 'clsx';

import memo from '@/utils/client/memo';
import { UI } from '@/config/globals';

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;
type HTMLProps = { children?: React.ReactNode; className?: string };

const Form: React.FC<FormProps> & { Group: React.FC<HTMLProps>; Footer: React.FC<HTMLProps> } = ({
  children,
  className,
}) => <form className={className}>{children}</form>;

Form.Group = memo(({ children, className }) => (
  <div className={clsx('mt-8 first-of-type:mt-0', className)}>{children}</div>
));

Form.Footer = memo(({ children, className }) => (
  <Box
    mt={UI.frameY}
    className={clsx('flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4', className)}
  >
    {children}
  </Box>
));

export default Form;
