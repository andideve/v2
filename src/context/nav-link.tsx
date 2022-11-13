import React, { useMemo, createContext } from 'react';
import useNavlink from '@/hooks/use-navlink';

type Value = { active: boolean };

const Ctx = createContext({} as Value);

export function NavLinkContext({
  children,
  to,
  exact,
}: {
  to: string;
  children?: React.ReactNode | React.FC<Value>;
  exact?: boolean;
}) {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return (
    <Ctx.Provider value={{ active }}>
      {typeof children === 'function' ? <Ctx.Consumer>{children}</Ctx.Consumer> : children}
    </Ctx.Provider>
  );
}
