import React, { useMemo, useContext, createContext } from 'react';

import useColorScheme from '@/hooks/use-color-scheme';
import { ColorSchemes } from '@/types/globals';

type Value = ReturnType<typeof useColorScheme>;

const Ctx = createContext({} as Value);

export function ColorSchemeContext({
  children,
  init,
}: {
  children?: React.ReactNode | ((props: Value) => React.ReactElement);
  init?: ColorSchemes;
}) {
  const { initializing, theme, asColorScheme, changeTheme } = useColorScheme(init);
  const value = useMemo(
    () => ({ initializing, theme, asColorScheme, changeTheme }),
    [initializing, theme, asColorScheme],
  );

  return (
    <Ctx.Provider value={value}>
      {typeof children === 'function' ? <Ctx.Consumer>{children}</Ctx.Consumer> : children}
    </Ctx.Provider>
  );
}

export function useColorSchemeCtx() {
  return useContext(Ctx);
}
