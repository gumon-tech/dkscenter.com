/* eslint-disable react/prop-types */
import React from 'react';
import PageContainer from './page-container';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Section({
  as: Component = 'section',
  className,
  containerClassName,
  children,
}) {
  return (
    <Component className={cx('py-10 md:py-12', className)}>
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </Component>
  );
}
