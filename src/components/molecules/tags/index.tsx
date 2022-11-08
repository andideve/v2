import { Badge } from '@andideve/design-system';

export default function Tags({ items = [] }: { items?: string[] }) {
  return (
    <ul className="list-none flex flex-wrap -mt-2 -ml-[.625rem]">
      {items.map((tag, i) => (
        <li key={i} className="mt-2 ml-[.625rem]">
          <Badge size="xs" variant="gray">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
