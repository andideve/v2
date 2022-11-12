import { useEffect } from 'react';

export default function useWindowScrollDisabler(disable?: boolean) {
  useEffect(() => {
    const { classList } = window.document.documentElement;
    if (disable) classList.add('overflow-y-hidden');
    return () => classList.remove('overflow-y-hidden');
  }, [disable]);
}
