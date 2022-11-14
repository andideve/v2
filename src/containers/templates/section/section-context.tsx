import React, { useMemo, useContext, createContext } from 'react';
import { ChildOptions } from './types';

type Value = ChildOptions;

const Ctx = createContext<Value>({} as Value);

export function SectionContext({
  children,
  value: { spacing, centered } = {},
}: {
  children?: React.ReactNode;
  value?: Value;
}) {
  const value = useMemo((): Value => ({ spacing, centered }), [spacing, centered]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSectionContext() {
  return useContext(Ctx);
}
