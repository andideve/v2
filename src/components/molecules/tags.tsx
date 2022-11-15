import { Badge } from '@andideve/design-system';

export default function Tags({ items = [], bordered }: { items?: string[]; bordered?: true }) {
  return (
    <ul className="tags list-none flex flex-wrap -mt-2 -ml-[.625rem]">
      {items.map((tag, i) => (
        <li key={i} className="mt-2 ml-[.625rem]">
          <Badge
            size="xs"
            variant="gray"
            className={bordered ? 'border' : undefined}
            style={bordered ? { borderColor: 'var(--ds-colors-separator-default)' } : undefined}
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
