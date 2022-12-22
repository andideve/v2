import { Typography, TypographyProps } from '@/components/atoms/typography';
import Cursor from '../atoms/cursor';
import useTyping from '@/hooks/use-typing';

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
