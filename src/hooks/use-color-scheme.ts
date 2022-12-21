import { useEffect, useReducer, Reducer } from 'react';

import themeStorage from '@/utils/client/storage/theme';
import getSystemColorScheme from '@/utils/client/system-color-scheme';
import { Themes, ColorSchemes } from '@/types/globals';

const THEMES_REGEX = /^(system|light|dark)$/;

function isThemes(arg: any): arg is Themes {
  if (typeof arg !== 'string') return false;
  return THEMES_REGEX.test(arg);
}

type State = {
  readonly initializing: boolean;
  readonly theme: Themes;
  readonly asColorScheme: ColorSchemes;
};

type Action = { type: string; payload?: any };

const ACTION_TYPES = {
  INIT_START: 'INIT_START',
  INIT_DONE: 'INIT_DONE',
  CHANGE_THEME: 'CHANGE_THEME',
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT_START: {
      return {
        ...state,
        initializing: true,
      };
    }
    case ACTION_TYPES.INIT_DONE: {
      return {
        ...state,
        initializing: false,
      };
    }
    case ACTION_TYPES.CHANGE_THEME: {
      const { theme, asColorScheme } = action.payload;
      return {
        ...state,
        theme,
        asColorScheme,
      };
    }
    default: {
      return state;
    }
  }
};

const ActionCreators = {
  initStart() {
    return { type: ACTION_TYPES.INIT_START };
  },
  initDone() {
    return { type: ACTION_TYPES.INIT_DONE };
  },
  changeTheme(payload: Pick<State, 'theme' | 'asColorScheme'>) {
    return { type: ACTION_TYPES.CHANGE_THEME, payload };
  },
};

export default function useColorScheme(init: ColorSchemes = 'dark') {
  const [state, dispatch] = useReducer(reducer, {
    initializing: true,
    theme: init,
    asColorScheme: init,
  } as State);

  const initStart = () => {
    dispatch(ActionCreators.initStart());
  };
  const initDone = () => {
    dispatch(ActionCreators.initDone());
  };

  /** Can only be called on the client */
  const changeTheme = (theme: Themes) => {
    const asColorScheme = theme === 'system' ? getSystemColorScheme() : theme;
    dispatch(ActionCreators.changeTheme({ theme, asColorScheme }));
    themeStorage.set(theme);
  };

  useEffect(() => {
    initStart();
    const localTheme = themeStorage.get();
    if (isThemes(localTheme)) changeTheme(localTheme);
    initDone();
  }, []);

  return { ...state, changeTheme } as const;
}
