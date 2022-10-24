import { useState, useEffect, useCallback, useMemo } from 'react';

function filter<T = unknown>(items: (T & { tags?: string[] })[], byTags: string[]) {
  return items.filter(({ tags = [] }) => byTags.every((byTag) => tags.includes(byTag)));
}

function getUniqueFlatenTags<T extends { tags?: string[] } = {}>(items: T[]) {
  return Array.from(new Set(items.map((e) => e.tags ?? []).flat()));
}

function getAvailableOptions<T extends { tags?: string[] } = {}>(searchResults: T[]): string[] {
  return getUniqueFlatenTags(searchResults);
}

export default function useSearch<T = unknown>(items: (T & { tags?: string[] })[]) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (tags.length) setTags([]);
  }, [items]);

  const list = useMemo(() => filter(items, tags), [tags]);
  const availableOptions = useMemo(() => getAvailableOptions(list), [list]);

  const onToggle = useCallback((tag: string) => {
    const fn = () => setTags((s) => (s.includes(tag) ? s.filter((e) => e !== tag) : [...s, tag]));
    return fn;
  }, []);

  const isActive = useCallback((tag: string) => tags.includes(tag), [tags]);
  const isDisabledOption = useCallback(
    (tag: string) => !availableOptions.includes(tag),
    [availableOptions],
  );

  const shouldRender = tags.length > 0;
  const notFound = shouldRender && !list.length;

  return { list, shouldRender, notFound, onToggle, isActive, isDisabledOption } as const;
}
