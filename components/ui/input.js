/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Input({
  label,
  error,
  className,
  inputClassName,
  ...props
}) {
  return (
    <label className={cx('block', className)}>
      {label ? (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-soft">
          {label}
        </span>
      ) : null}
      <input
        className={cx(
          'w-full rounded-2xl border border-border/80 bg-surface-elevated px-4 py-3 text-sm text-text shadow-soft outline-none transition placeholder:text-soft focus:border-primary/40 focus:ring-4 focus:ring-primary/10',
          error && 'border-danger/40 focus:border-danger/40 focus:ring-danger/10',
          inputClassName,
        )}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-danger">{error}</span> : null}
    </label>
  );
}
