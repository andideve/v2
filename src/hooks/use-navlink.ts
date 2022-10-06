import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useNavlink(useHook = useRouter) {
  const router = useHook();
  const isActive = useCallback(
    (to: string, exact?: boolean) => {
      if (exact) return to === router.pathname;
      return new RegExp(`^${to}`).test(router.pathname);
    },
    [router.pathname],
  );

  return { isActive } as const;
}
