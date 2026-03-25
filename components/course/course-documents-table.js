/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseDocumentsTable({ documents, t }) {
  if (!documents || documents.length === 0) return null;

  return (
    <section className="rounded-[30px] border border-border/60 bg-surface/35 px-5 py-5 shadow-soft backdrop-blur-xl sm:px-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
        Documents
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
        {t('course-detail-19')}
      </h3>

      <div className="mt-5 divide-y divide-border/60">
        {documents.map((documentFile, index) => (
          <a
            key={index}
            target="_blank"
            href={documentFile.fileUrl}
            className="flex items-center justify-between gap-4 py-4 text-left transition hover:text-primary"
            rel="noreferrer"
          >
            <span className="text-base font-medium leading-7 text-text">
              {documentFile.title}
            </span>
            <svg
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
