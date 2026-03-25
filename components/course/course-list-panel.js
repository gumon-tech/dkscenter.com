/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function CourseListPanel({
  items,
  columns = 1,
  compact = false,
  className,
}) {
  return (
    <ul
      className={cx(
        'grid gap-x-8 gap-y-4',
        columns > 1 ? 'md:grid-cols-2' : '',
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={cx(
            'flex items-start gap-3 border-t border-border/50 text-muted',
            compact ? 'pt-3 text-sm leading-7' : 'pt-4 text-[15px] leading-8 lg:text-base',
          )}
        >
          <span className="mt-2 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
