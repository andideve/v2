import { Themes } from '@/types/globals';

export default function isValidTheme(arg: any): arg is Themes {
  if (typeof arg !== 'string') return false;
  return /^(system|light|dark)$/.test(arg);
}
