/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

const styles = {
  primary:
    'border border-primary/10 bg-primary text-white shadow-glow hover:bg-primary-strong focus-visible:outline-primary',
  secondary:
    'border border-border/80 bg-surface-elevated text-text hover:border-primary/35 hover:text-primary focus-visible:outline-primary',
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
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant] || styles.primary,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
