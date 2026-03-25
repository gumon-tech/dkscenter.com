/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Divider({ className }) {
  return <div className={cx('h-px w-full bg-border/70', className)} />;
}
