import React from 'react';

export default function ProjectList({ children }: { children?: React.ReactNode }) {
  return <div className="project-list grid-container gap-y-5 md:gap-y-8">{children}</div>;
}
