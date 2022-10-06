import { useState, useCallback } from 'react';

export default function useDisclosure(init = false) {
  const [isOpen, setIsOpen] = useState(init);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((s) => !s), []);

  return { isOpen, onOpen, onClose, onToggle } as const;
}
