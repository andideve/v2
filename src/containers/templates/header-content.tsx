import React from 'react';

export default function HeaderContent({
  title,
  description,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="header-content space-y-4">
      {title}
      {description}
    </div>
  );
}
