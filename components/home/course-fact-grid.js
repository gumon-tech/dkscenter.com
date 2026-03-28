/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

function FactValue({ item }) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="break-words text-sm font-medium leading-6 text-text transition hover:text-primary"
      >
        {item.value}
      </a>
    );
  }

  return (
    <div className="break-words text-sm font-medium leading-6 text-text">
      {item.value}
    </div>
  );
}

export default function CourseFactGrid({ items, className }) {
  return (
    <div className={cx('grid gap-3 sm:grid-cols-2', className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[22px] border border-border/75 bg-[linear-gradient(180deg,var(--fact-surface),var(--fact-surface-strong))] px-4 py-3.5 shadow-soft ring-1 ring-white/20"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
            {item.label}
          </div>
          <div className="mt-1.5">
            <FactValue item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
