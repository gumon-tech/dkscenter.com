/* eslint-disable react/prop-types */
import React from 'react';
import { registerSecondaryButtonClass } from '/lib/courses/cta';
import LineContactButton from './line-contact-button';

export default function CourseInlineCta({
  courseData,
  lineCopy,
  featuredRegisterUrl,
  onRegisterClick,
}) {
  return (
    <section className="course-theme-contrast mb-5 rounded-[32px] p-6 lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="course-contrast-heading text-2xl font-semibold tracking-[-0.03em]">
            {lineCopy.bottomPrimary}
          </h3>
          <p className="course-contrast-copy mt-2 text-base leading-7">
            {lineCopy.bottomDescription}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LineContactButton
            courseData={courseData}
            label={lineCopy.bottomPrimary}
            trackingLabel="bottom_line_contact"
          />
          <a
            href={featuredRegisterUrl || '#course-registration'}
            target={featuredRegisterUrl ? '_blank' : undefined}
            rel={featuredRegisterUrl ? 'noreferrer' : undefined}
            onClick={onRegisterClick}
            className={registerSecondaryButtonClass}
          >
            {lineCopy.registerLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
