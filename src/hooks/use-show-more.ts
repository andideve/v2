import { useState, useEffect, useCallback, useMemo } from 'react';

export default function useShowMore<T = unknown>(items: T[], limit: number) {
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [items]);

  const onShowMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const list = useMemo(() => items.slice(0, limit * page), [items, limit, page]);
  const shouldRenderButton = list.length < items.length;

  return { list, shouldRenderButton, onShowMore } as const;
}
