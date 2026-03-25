/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseCurriculum({ outline, locale }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {outline.map((item, index) => (
        <details
          key={index}
          className={`course-theme-soft-panel group rounded-[28px] p-0 ${
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
              className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-semibold text-slate-950 ${
                index < 2 ? 'h-11 min-w-11' : 'h-10 min-w-10'
              }`}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h4
                className={`course-heading font-semibold leading-8 ${
                  index < 2 ? 'text-xl' : 'text-lg'
                }`}
              >
                {item.title}
              </h4>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.descriptions?.length || 0}{' '}
                {locale === 'th' ? 'หัวข้อย่อย' : 'topics'}
              </p>
            </div>
            <span className="mt-1 text-xl text-slate-400 transition group-open:rotate-45 group-open:text-cyan-300">
              +
            </span>
          </summary>
          {item.descriptions && item.descriptions.length > 0 && (
            <div className="border-t border-white/8 px-6 pb-6 pt-4">
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
