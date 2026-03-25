/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseTrustGrid({ items, locale }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="theme-overlay-card relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-secondary/0"
          />
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
            {locale === 'th' ? `เหตุผล 0${index + 1}` : `Benefit 0${index + 1}`}
          </div>
          <h3 className="course-heading mt-4 text-xl font-semibold leading-8 tracking-[-0.04em]">
            {item.title}
          </h3>
          <p className="course-copy mt-3 text-sm leading-7">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
