import { useState, useMemo, useCallback } from 'react';

interface Options {
  repeat?: 'none' | 'all';
}

export default function useQueue(init = 0, length = 0, { repeat = 'none' }: Options = {}) {
  const [currIndex, setCurrIndex] = useState(init);

  const reset = (index = init) => setCurrIndex(index);

  /** Indexes of items */
  const indexes = useMemo(() => new Array(length).fill(null).map((_, i) => i), [length]);

  /** Returns item indexes */
  const inQueue = useMemo(() => {
    if (repeat === 'all' && currIndex === length - 1) return indexes;
    return indexes.slice(currIndex + 1);
  }, [repeat, currIndex, length, indexes]);

  const onNext = useCallback(() => {
    setCurrIndex(inQueue[0]);
  }, [inQueue[0]]);

  return { currIndex, reset, onNext } as const;
}
