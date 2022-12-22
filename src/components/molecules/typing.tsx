import styled from '@emotion/styled';

import { Typography, TypographyProps } from '@/components/atoms/typography';
import useTyping from '@/hooks/use-typing';
import blink from '@/styles/blink';

const Cursor = styled.span<{ blinking?: boolean }>(
  blink.keyframes.styles,
  ({ blinking }) => (blinking ? blink.css : {}),
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
