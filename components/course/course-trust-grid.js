/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseTrustGrid({ items, locale }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="course-theme-soft-panel rounded-[30px] p-6 lg:p-7"
        >
          <div className="inline-flex rounded-full border border-primary/18 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {locale === 'th' ? 'Trust Signal' : 'Trust Signal'}
          </div>
          <h4 className="course-heading mt-4 text-lg font-semibold leading-8 tracking-[-0.03em]">
            {item.title}
          </h4>
          <p className="course-copy mt-2 text-sm leading-7">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
