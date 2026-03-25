/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

const styles = {
  primary:
    'bg-primary text-white hover:bg-primary-strong focus-visible:outline-primary',
  secondary:
    'border border-border bg-surface text-text hover:border-primary/40 hover:text-primary focus-visible:outline-primary',
  ghost:
    'text-text hover:bg-primary/10 hover:text-primary focus-visible:outline-primary',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        styles[variant] || styles.primary,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
