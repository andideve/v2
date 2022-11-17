import React from 'react';
import useShowMore from '@/hooks/use-show-more';

export default function DisclosureContainer({
  children,
  items,
  limit,
}: {
  children: React.FC<ReturnType<typeof useShowMore>>;
  items: unknown[];
  limit: number;
}) {
  const value = useShowMore(items, limit);
  return children(value);
}
