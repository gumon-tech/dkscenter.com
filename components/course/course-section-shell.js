/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function CourseSectionShell({
  eyebrow,
  title,
  description,
  meta,
  children,
  className,
  contentClassName,
}) {
  return (
    <section className={cx('relative pt-8 lg:pt-10', className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <header className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="course-title-line h-px w-10" />
            {eyebrow ? (
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </div>
            ) : null}
          </div>
          <h2 className="course-heading mt-4 text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] lg:text-[2.6rem]">
            {title}
          </h2>
          {description ? (
            <p className="course-copy mt-4 max-w-[34rem] text-base leading-8">
              {description}
            </p>
          ) : null}
          {meta ? <div className="mt-5">{meta}</div> : null}
        </header>

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
