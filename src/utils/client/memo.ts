import React from 'react';
import { dequal } from 'dequal';

export default function memo<P = unknown>(Component: React.FC<P>) {
  return React.memo(Component, dequal);
}
