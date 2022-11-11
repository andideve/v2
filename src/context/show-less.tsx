import React, { createContext } from 'react';
import useShowLess from '@/hooks/use-show-less';

type Value = ReturnType<typeof useShowLess>;

const Ctx = createContext({} as Value);

export function ShowLessContext({
  children,
  items,
  limit,
}: {
  items: unknown[];
  limit: number;
  children?: React.ReactNode | React.FC<Value>;
}) {
  const value = useShowLess(items, limit);
  return (
    <Ctx.Provider value={value}>
      {typeof children === 'function' ? <Ctx.Consumer>{children}</Ctx.Consumer> : children}
    </Ctx.Provider>
  );
}
