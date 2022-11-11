import React from 'react';

export default function ProjectList({ children }: { children?: React.ReactNode }) {
  return <div className="grid-container gap-y-5 md:gap-y-8">{children}</div>;
}
