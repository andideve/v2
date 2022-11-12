import { useEffect, useMemo } from 'react';
import { FiLoader, FiMonitor, FiSun, FiMoon } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import { useColorSchemeCtx } from '@/context/color-scheme';
import useQueue from '@/hooks/use-queue';
import { Themes } from '@/types/globals';

export default function useThemeHandler() {
  const themes: Themes[] = ['system', 'light', 'dark'];

  const { initializing, theme, changeTheme } = useColorSchemeCtx();
  const initThemeIndex = useMemo(() => themes.indexOf(theme), []);
  const themeQueue = useQueue(initThemeIndex, themes.length, { repeat: 'all' });

  useEffect(() => {
    if (!initializing) themeQueue.reset(themes.indexOf(theme));
  }, [initializing]);

  useEffect(() => changeTheme(themes[themeQueue.currIndex]), [themeQueue.currIndex]);

  const icon = (
    {
      loading: FiLoader,
      system: FiMonitor,
      light: FiSun,
      dark: FiMoon,
    } as Record<'loading' | Themes, IconType>
  )[initializing ? 'loading' : theme];

  return {
    isReady: !initializing,
    icon,
    onChange: initializing ? undefined : themeQueue.onNext,
  } as const;
}
