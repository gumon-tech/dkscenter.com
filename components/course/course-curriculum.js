/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseCurriculum({ outline, locale }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {outline.map((item, index) => (
        <details
          key={index}
          className={`group rounded-[28px] border border-border/70 bg-surface/55 shadow-soft backdrop-blur-xl ${
            index < 2 ? 'lg:col-span-1' : ''
          }`}
          open={index < 2}
        >
          <summary
            className={`flex cursor-pointer list-none items-start gap-4 px-6 py-5 ${
              index < 2 ? 'pb-6' : ''
            }`}
          >
            <span
              className={`inline-flex shrink-0 items-center justify-center font-semibold leading-none text-primary-strong ${
                index < 2 ? 'h-12 min-w-12 text-base' : 'h-11 min-w-11 text-sm'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <h4
                className={`course-heading font-semibold leading-8 ${
                  index < 2 ? 'text-xl' : 'text-lg'
                }`}
              >
                {item.title}
              </h4>
              <p className="mt-1 text-sm leading-6 text-soft">
                {item.descriptions?.length || 0}{' '}
                {locale === 'th' ? 'หัวข้อย่อย' : 'topics'}
              </p>
            </div>
            <span className="mt-1 text-xl text-soft transition group-open:rotate-45 group-open:text-primary">
              +
            </span>
          </summary>
          {item.descriptions && item.descriptions.length > 0 && (
            <div className="px-6 pb-6 pt-1">
              <ul className="course-copy list-disc space-y-1.5 pl-5 text-[15px] leading-7 lg:text-base">
                {item.descriptions.map((description, detailIndex) => (
                  <li key={detailIndex}>{description}</li>
                ))}
              </ul>
            </div>
          )}
        </details>
      ))}
    </div>
  );
}
