import { useMemo } from 'react';
import useDisclosure from './use-disclosure';

export default function useShowLess<T = unknown>(items: T[], limit: number) {
  const { isOpen, onToggle } = useDisclosure();

  const limited = useMemo(() => items.slice(0, limit), [items, limit]);
  const list = isOpen ? items : limited;
  const shouldRenderButton = limited.length < items.length;

  return { list, shouldRenderButton, isOpen, onToggle } as const;
}
