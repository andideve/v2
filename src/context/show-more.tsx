import React, { createContext } from 'react';
import useShowMore from '@/hooks/use-show-more';

type Value = ReturnType<typeof useShowMore>;

const Ctx = createContext({} as Value);

export function ShowMoreContext({
  children,
  items,
  limit,
}: {
  items: unknown[];
  limit: number;
  children?: React.ReactNode | React.FC<Value>;
}) {
  const value = useShowMore(items, limit);
  return (
    <Ctx.Provider value={value}>
      {typeof children === 'function' ? <Ctx.Consumer>{children}</Ctx.Consumer> : children}
    </Ctx.Provider>
  );
}
