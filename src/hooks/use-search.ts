import { useState, useEffect, useCallback, useMemo } from 'react';

function filter<T = unknown>(items: (T & { tags?: string[] })[], byTags: string[]) {
  return items.filter(({ tags = [] }) => byTags.every((byTag) => tags.includes(byTag)));
}

export default function useSearch<T = unknown>(items: (T & { tags?: string[] })[]) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (tags.length) setTags([]);
  }, [items]);

  const onToggle = useCallback((tag: string) => {
    const fn = () => setTags((s) => (s.includes(tag) ? s.filter((e) => e !== tag) : [...s, tag]));
    return fn;
  }, []);

  const isActive = useCallback((tag: string) => tags.includes(tag), [tags]);

  const list = useMemo(() => filter(items, tags), [tags]);
  const shouldRender = tags.length > 0;
  const notFound = shouldRender && !list.length;

  return { list, shouldRender, notFound, onToggle, isActive } as const;
}
