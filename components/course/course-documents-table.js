/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseDocumentsTable({ documents, t }) {
  if (!documents || documents.length === 0) return null;

  return (
    <table className="course-theme-panel mb-5 w-full overflow-hidden rounded-[30px] text-left text-sm text-muted">
      <thead className="course-theme-table-head text-xs uppercase text-soft">
        <tr>
          <th
            scope="col"
            className="rounded-t-[30px] px-6 py-5 text-xl font-semibold tracking-[-0.03em] text-text"
          >
            {t('course-detail-19')}
          </th>
        </tr>
      </thead>
      <tbody>
        {documents.map((documentFile, index) => (
          <tr key={index} className="bg-transparent">
            <th
              scope="row"
              className="border-t border-border/70 px-6 py-4 text-base font-semibold text-text"
            >
              <a
                target="_blank"
                href={documentFile.fileUrl}
                className="inline-flex items-center font-medium text-primary hover:text-primary-strong"
                rel="noreferrer"
              >
                {documentFile.title}
                <svg
                  className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
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
            </th>
          </tr>
        ))}
        <tr className="bg-transparent">
          <th
            scope="row"
            className="rounded-b-[30px] px-6 py-4 font-medium text-text"
          ></th>
        </tr>
      </tbody>
    </table>
  );
}
