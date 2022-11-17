import React from 'react';
import useDisclosure from '@/hooks/use-disclosure';

export default function DisclosureContainer({
  children,
  init,
}: {
  children: React.FC<ReturnType<typeof useDisclosure>>;
  init?: boolean;
}) {
  const value = useDisclosure(init);
  return children(value);
}
