import React from 'react';
import useShowLess from '@/hooks/use-show-less';

export default function DisclosureContainer({
  children,
  items,
  limit,
}: {
  children: React.FC<ReturnType<typeof useShowLess>>;
  items: unknown[];
  limit: number;
}) {
  const value = useShowLess(items, limit);
  return children(value);
}
