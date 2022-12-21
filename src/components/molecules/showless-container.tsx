import React from 'react';
import useShowLess from '@/hooks/use-show-less';

export default function ShowLessContainer({
  children,
  items,
  limit,
}: {
  children: (props: ReturnType<typeof useShowLess>) => React.ReactElement;
  items: unknown[];
  limit: number;
}) {
  const value = useShowLess(items, limit);
  return children(value);
}
