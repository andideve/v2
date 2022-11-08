import React from 'react';
import { Badge } from '@andideve/design-system';

import memo from '@/utils/client/memo';

const Tags = memo<{ items?: string[] }>(({ items = [] }) => (
  <ul className="list-none flex flex-wrap -mt-2 -ml-[.625rem]">
    {items.map((tag, i) => (
      <li key={i} className="mt-2 ml-[.625rem]">
        <Badge size="xs" variant="gray">
          {tag}
        </Badge>
      </li>
    ))}
  </ul>
));

export default Tags;
