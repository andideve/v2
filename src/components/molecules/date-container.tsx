import React, { useMemo } from 'react';

interface ChildrenProps {
  fullYear: number;
}

export default function DateContainer({
  children,
  date,
}: {
  children: (props: ChildrenProps) => React.ReactElement;
  date: string;
}) {
  const props = useMemo((): ChildrenProps => {
    const newDate = new Date(date);
    return { fullYear: newDate.getFullYear() };
  }, [date]);

  return children(props);
}
