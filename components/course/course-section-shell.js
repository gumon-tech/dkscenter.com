/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseSectionShell({ eyebrow, title, children }) {
  return (
    <section className="relative mb-12">
      <div className="mb-6 lg:mb-7">
        <div className="mb-2 flex items-center gap-3">
          <span className="course-title-line h-px flex-1 max-w-14" />
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400/75">
              {eyebrow}
            </div>
          )}
        </div>
        <h3 className="course-heading text-2xl font-semibold leading-tight lg:text-[30px]">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
