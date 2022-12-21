import { useState, useEffect } from 'react';

export default function useTyping(chars: string, _delayPerChar = 90) {
  const [result, setResult] = useState('');

  const type = (char: string) => setResult((s) => s + char);

  const typeWithTimeout = (char: string, boostTimeout?: boolean) => {
    const delayPerChar = boostTimeout ? _delayPerChar - _delayPerChar * 0.4 : _delayPerChar;
    return setTimeout(() => type(char), delayPerChar);
  };

  useEffect(() => {
    if (result === chars) return;
    const leftChars = chars.substring(result.length);
    const timeoutId = typeWithTimeout(leftChars[0], chars.indexOf(leftChars) < 8);
    return () => clearTimeout(timeoutId);
  }, [result, chars]);

  useEffect(() => () => setResult(''), [chars]);

  return result;
}
