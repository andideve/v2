import React from 'react';
import useShowMore from '@/hooks/use-show-more';

export default function ShowMoreContainer({
  children,
  items,
  limit,
}: {
  children: (props: ReturnType<typeof useShowMore>) => React.ReactElement;
  items: unknown[];
  limit: number;
}) {
  const value = useShowMore(items, limit);
  return children(value);
}
