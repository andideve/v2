import styled from '@emotion/styled';
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

export default Cursor;
