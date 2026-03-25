/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Card({ as: Component = 'div', className, children }) {
  return (
    <Component
      className={cx(
        'rounded-[28px] border border-border/80 bg-surface-elevated shadow-panel backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </Component>
  );
}
