/* eslint-disable react/prop-types */
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { registerSecondaryButtonClass } from '/lib/courses/cta';
import LineContactButton from './line-contact-button';

export default function CourseInlineCta({
  courseData,
  lineCopy,
  featuredRegisterUrl,
  onRegisterClick,
}) {
  return (
    <section className="course-theme-contrast overflow-hidden rounded-[30px] px-6 py-6 lg:px-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
            Conversion Point
          </div>
          <h3 className="course-contrast-heading mt-3 text-2xl font-semibold tracking-[-0.04em] lg:text-[2rem]">
            {lineCopy.bottomPrimary}
          </h3>
          <p className="course-contrast-copy mt-3 text-base leading-8">
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
            className={`${registerSecondaryButtonClass} group`}
          >
            <span>{lineCopy.registerLabel}</span>
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
