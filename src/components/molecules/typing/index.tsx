import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Typography, TypographyProps } from '@andideve/design-system';

import useTyping from '@/hooks/use-typing';
import memo from '@/utils/client/memo';

const blinkKeyframes = keyframes({
  '50%': { opacity: 0 },
});

const Cursor = styled.span<{ typingDone?: boolean }>(
  blinkKeyframes.styles,
  ({ typingDone }) => {
    if (!typingDone) return {};
    return {
      animation: `${blinkKeyframes.name} 1.075s infinite`,
    };
  },
  {
    '&:after': {
      position: 'relative',
      top: -1,
      content: '"|"',
      display: 'inline-block',
      fontWeight: 400,
    },
  },
);

const Typing = memo<{ children: string } & Omit<TypographyProps, 'children'>>(
  ({ children, ...rest }) => {
    const result = useTyping(children);
    return (
      <Typography {...rest}>
        {result}
        <Cursor typingDone={result === children} />
      </Typography>
    );
  },
);

export default Typing;
