import { useEffect } from 'react';

import { useColorSchemeCtx } from '@/context/color-scheme';
import useQueue from '@/hooks/use-queue';
import { Themes } from '@/types/globals';

export default function useThemeHandler() {
  const themes: Themes[] = ['system', 'light', 'dark'];

  const { initializing, theme, changeTheme } = useColorSchemeCtx();
  const themeQueue = useQueue(() => themes.indexOf(theme), themes.length, { repeat: 'all' });

  useEffect(() => {
    if (!initializing) themeQueue.reset(themes.indexOf(theme));
  }, [initializing]);

  useEffect(() => {
    if (!initializing) changeTheme(themes[themeQueue.currIndex]);
  }, [themeQueue.currIndex]);

  return {
    isReady: !initializing,
    theme,
    onChange: initializing ? undefined : themeQueue.onNext,
  } as const;
}
