import React from 'react';
import { keyframes } from '@emotion/react';

const kframes = keyframes({
  '50%': { opacity: 0 },
});

const blink = {
  keyframes: kframes,
  css: {
    animation: `${kframes.name} 1.075s infinite`,
  } as Pick<React.CSSProperties, 'animation'>,
};

export default blink;
