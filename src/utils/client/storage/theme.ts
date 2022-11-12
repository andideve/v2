import { Themes } from '@/types/globals';

const key = 'theme';

const themeStorage = {
  set(value: Themes) {
    return window.localStorage.setItem(key, value);
  },
  get() {
    return window.localStorage.getItem(key);
  },
  remove() {
    return window.localStorage.removeItem(key);
  },
};

export default themeStorage;
