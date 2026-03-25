/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseTrustGrid({ items, locale }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="course-theme-soft-panel rounded-[28px] p-6"
        >
          <div className="inline-flex rounded-2xl border border-cyan-400/18 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {locale === 'th' ? 'Trust Signal' : 'Trust Signal'}
          </div>
          <h4 className="course-heading mt-4 text-lg font-semibold leading-8">
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
