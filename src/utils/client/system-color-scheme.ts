import { ColorSchemes } from '@/types/globals';

export default function getSystemColorScheme(): ColorSchemes {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
