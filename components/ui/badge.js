/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

const variants = {
  default: 'border-primary/15 bg-primary/10 text-primary',
  success: 'border-success/20 bg-success/10 text-success',
  warning: 'border-warning/20 bg-warning/10 text-warning',
  danger: 'border-danger/20 bg-danger/10 text-danger',
  neutral: 'border-border/80 bg-surface text-soft',
};

export default function Badge({
  children,
  variant = 'default',
  className,
}) {
  return (
    <span
      className={cx(
        'inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]',
        variants[variant] || variants.default,
        className,
      )}
    >
      {children}
    </span>
  );
}
