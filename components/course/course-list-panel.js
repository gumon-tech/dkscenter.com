/* eslint-disable react/prop-types */
import React from 'react';

export default function CourseListPanel({ items }) {
  return (
    <div className="course-theme-soft-panel rounded-[28px] px-6 py-6 lg:px-7">
      <ul className="course-copy list-disc space-y-2.5 pl-5 text-[15px] leading-8 lg:text-base">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
