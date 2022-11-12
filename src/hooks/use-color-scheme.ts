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
  if (action.type === ACTION_TYPES.INIT_START) {
    return {
      ...state,
      initializing: true,
    };
  }
  if (action.type === ACTION_TYPES.INIT_DONE) {
    return {
      ...state,
      initializing: false,
    };
  }
  if (action.type === ACTION_TYPES.CHANGE_THEME) {
    themeStorage.set(action.payload);
    return {
      ...state,
      theme: action.payload,
      asColorScheme: action.payload === 'system' ? getSystemColorScheme() : action.payload,
    };
  }

  return state;
};

export default function useColorScheme(init: ColorSchemes = 'dark') {
  const [state, dispatch] = useReducer(reducer, {
    initializing: true,
    theme: init,
    asColorScheme: init,
  } as State);

  const initStart = () => {
    dispatch({ type: ACTION_TYPES.INIT_START });
  };
  const initDone = () => {
    dispatch({ type: ACTION_TYPES.INIT_DONE });
  };

  /** Can only be called on the client */
  const changeTheme = (theme: Themes) => {
    dispatch({ type: ACTION_TYPES.CHANGE_THEME, payload: theme });
  };

  useEffect(() => {
    initStart();
    const localTheme = themeStorage.get();
    if (isThemes(localTheme)) changeTheme(localTheme);
    initDone();
  }, []);

  return { ...state, changeTheme } as const;
}
