import { Badge, Theme } from '@andideve/design-system';
import { useTheme } from '@emotion/react';

export default function Tags({ items = [], bordered }: { items?: string[]; bordered?: true }) {
  const theme = useTheme() as Theme;
  return (
    <ul className="tags list-none flex flex-wrap -mt-2 -ml-[.625rem]">
      {items.map((tag) => (
        <li key={tag} className="mt-2 ml-[.625rem]">
          <Badge
            size="xs"
            variant="gray"
            className={bordered ? 'border' : undefined}
            style={bordered ? { borderColor: theme.colors.separator.default } : undefined}
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
