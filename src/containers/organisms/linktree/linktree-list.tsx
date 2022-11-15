import React from 'react';

export default function LinktreeList({ children }: { children?: React.ReactNode }) {
  return <ul className="linktree-list list-none space-y-6">{children}</ul>;
}
