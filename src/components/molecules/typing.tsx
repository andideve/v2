import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { Typography, TypographyProps } from '@/components/atoms/typography';
import useTyping from '@/hooks/use-typing';

const blinkKeyframes = keyframes({
  '50%': { opacity: 0 },
});

const Cursor = styled.span<{ blinking?: boolean }>(
  blinkKeyframes.styles,
  ({ blinking }) => {
    if (!blinking) return {};
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

export default function Typing({
  children,
  ...rest
}: { children: string } & Omit<TypographyProps, 'children'>) {
  const result = useTyping(children);
  const typingDone = result === children;
  return (
    <Typography {...rest}>
      {result}
      <Cursor blinking={typingDone} />
    </Typography>
  );
}
