import React, { useMemo } from 'react';
import useNavlink from '@/hooks/use-navlink';

export default function DisclosureContainer({
  children,
  to,
  exact,
}: {
  children: React.FC<{ active: boolean }>;
  to: string;
  exact?: boolean;
}) {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return children({ active });
}
