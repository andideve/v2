import { useState, useEffect, useMemo } from 'react';

const getBoostedDelay = (delay: number) => delay - delay * 0.4;

const getUntypedChars = (from: string, typed: string) => from.substring(typed.length);

export default function useTyping(chars: string, _delayPerChar = 90) {
  const [result, setResult] = useState('');
  const boostedDelay = useMemo(() => getBoostedDelay(_delayPerChar), [_delayPerChar]);

  const type = (char: string) => setResult((s) => s + char);

  const typeWithDelay = (char: string, boostDelay?: boolean) => {
    const delayPerChar = boostDelay ? boostedDelay : _delayPerChar;
    return setTimeout(() => type(char), delayPerChar);
  };

  useEffect(() => {
    if (result === chars) return;

    const untypedChars = getUntypedChars(chars, result);
    const shouldBoostDelay = chars.indexOf(untypedChars) < 8;
    const timeoutId = typeWithDelay(untypedChars[0], shouldBoostDelay);

    return () => clearTimeout(timeoutId);
  }, [result, chars]);

  useEffect(() => () => setResult(''), [chars]);

  return result;
}
