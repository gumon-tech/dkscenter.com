/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseDocumentsTable({ documents, t }) {
  if (!documents || documents.length === 0) return null;

  return (
    <table className="course-theme-panel mb-5 w-full overflow-hidden rounded-2xl text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="course-theme-table-head text-xs uppercase text-gray-700 dark:text-gray-400">
        <tr>
          <th
            scope="col"
            className="rounded-t-lg px-6 py-4 text-xl font-bold text-blue-700 dark:text-blue-400"
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
              className="px-6 py-4 text-base font-semibold text-gray-700 dark:text-gray-300"
            >
              <a
                target="_blank"
                href={documentFile.fileUrl}
                className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
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
            className="px-6 rounded-b-lg py-4 font-medium text-gray-900 dark:text-white"
          ></th>
        </tr>
      </tbody>
    </table>
  );
}
