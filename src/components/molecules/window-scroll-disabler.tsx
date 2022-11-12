import useWindowScrollDisabler from '@/hooks/use-window-scroll-disabler';

/** It should only render once */
export default function WindowScrollDisabler({ disable }: { disable?: boolean }) {
  useWindowScrollDisabler(disable);
  return null;
}
