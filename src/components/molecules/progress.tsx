import React from 'react';
import { useTheme } from '@emotion/react';
import type { Theme } from '@andideve/design-system';
import clsx from 'clsx';

export default function Progress({
  className,
  style,
  label,
  loading = true,
  percentage,
}: {
  percentage: number;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  loading?: boolean;
}) {
  const { colors } = useTheme() as Theme;
  return (
    <div className={clsx('progress', className)} style={style}>
      <span
        role="progressbar"
        aria-hidden={!loading}
        aria-label={label}
        aria-valuenow={percentage}
        className="block h-[.125rem]"
        style={{
          width: loading ? `${percentage}%` : 0,
          backgroundColor: colors.accent,
        }}
      />
    </div>
  );
}
