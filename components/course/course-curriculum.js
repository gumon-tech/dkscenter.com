/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseCurriculum({ outline, locale }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-border/60 bg-surface/45 shadow-soft backdrop-blur-xl">
      {outline.map((item, index) => (
        <details
          key={index}
          className="group border-t border-border/60 first:border-t-0"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="inline-flex min-w-[3.25rem] items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary-strong">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0">
                <h3 className="course-heading text-xl font-semibold leading-8 tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-7 text-soft">
                  {item.descriptions?.length || 0}{' '}
                  {locale === 'th' ? 'หัวข้อย่อยในโมดูลนี้' : 'topics inside this module'}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-soft transition group-open:border-primary/20 group-open:text-primary">
              {locale === 'th' ? 'ดูรายละเอียด' : 'View details'}
            </span>
          </summary>

          {item.descriptions && item.descriptions.length > 0 ? (
            <div className="border-t border-border/60 px-5 py-5 sm:px-6">
              <ul className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
                {item.descriptions.map((description, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-3 text-sm leading-7 text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </details>
      ))}
    </div>
  );
}
