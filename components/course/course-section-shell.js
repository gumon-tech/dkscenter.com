/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseSectionShell({ eyebrow, title, children }) {
  return (
    <section className="relative mb-14">
      <div className="mb-6 lg:mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="course-title-line h-px flex-1 max-w-16" />
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </div>
          )}
        </div>
        <h3 className="course-heading text-2xl font-semibold leading-tight tracking-[-0.04em] lg:text-[2rem]">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
