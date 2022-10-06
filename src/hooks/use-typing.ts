import { useState, useEffect } from 'react';

export default function useTyping(chars: string, timeout = 90) {
  const [result, setResult] = useState('');

  const type = (char: string) => setResult((s) => s + char);
  const typeWithTimeout = (char: string, boostTimeout?: boolean) => {
    const _timeout = boostTimeout ? timeout - timeout * 0.4 : timeout;
    return setTimeout(() => type(char), _timeout);
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
