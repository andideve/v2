import React, { createContext } from 'react';
import useDisclosure from '@/hooks/use-disclosure';

type Value = ReturnType<typeof useDisclosure>;

const Ctx = createContext({} as Value);

export function DisclosureContext({
  children,
  init,
}: {
  children?: React.ReactNode | React.FC<Value>;
  init?: boolean;
}) {
  const value = useDisclosure(init);
  return (
    <Ctx.Provider value={value}>
      {typeof children === 'function' ? <Ctx.Consumer>{children}</Ctx.Consumer> : children}
    </Ctx.Provider>
  );
}
