import React, { useMemo } from 'react';
import useNavlink from '@/hooks/use-navlink';

export default function NavLinkContainer({
  children,
  to,
  exact,
}: {
  children: (props: { active: boolean }) => React.ReactElement;
  to: string;
  exact?: boolean;
}) {
  const { isActive } = useNavlink();
  const active = useMemo(() => isActive(to, exact), [to, exact]);
  return children({ active });
}
