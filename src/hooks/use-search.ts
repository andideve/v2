import React, { useState, useMemo, useCallback } from 'react';
import TopicSearch from '@/utils/client/topic-search';

export default function useSearch<T extends { tags?: string[] } = {}>(items: T[]) {
  const [selected, setSelected] = useState<string[]>([]);

  const finder = useMemo(() => TopicSearch(items), []);
  const results = useMemo(() => finder.search(selected), [selected]);
  const options = useMemo(() => finder.getOptions(results, selected), [results, selected]);

  const onChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((s) => {
      if (s.includes(value)) return s.filter((tag) => tag !== value);
      return [...s, value];
    });
  }, []);

  const list = selected.length ? results : items;
  const notFound = Boolean(selected.length && !results.length);

  return { options, onChange, list, notFound } as const;
}
