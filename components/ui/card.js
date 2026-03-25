/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Card({ as: Component = 'div', className, children }) {
  return (
    <Component
      className={cx(
        'rounded-3xl border border-border bg-surface shadow-soft backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </Component>
  );
}
