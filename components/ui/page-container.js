/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function PageContainer({
  as: Component = 'div',
  className,
  children,
}) {
  return (
    <Component
      className={cx(
        'mx-auto w-full max-w-layout px-5 sm:px-6 lg:px-8 xl:px-10',
        className,
      )}
    >
      {children}
    </Component>
  );
}
