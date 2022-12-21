import React from 'react';
import useDisclosure from '@/hooks/use-disclosure';

export default function DisclosureContainer({
  children,
  init,
}: {
  children: (props: ReturnType<typeof useDisclosure>) => React.ReactElement;
  init?: boolean;
}) {
  const value = useDisclosure(init);
  return children(value);
}
