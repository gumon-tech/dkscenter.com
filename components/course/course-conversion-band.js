/* eslint-disable react/prop-types */
import React from 'react';
import { registerSecondaryButtonClass } from '/lib/courses/cta';
import LineContactButton from './line-contact-button';

export default function CourseConversionBand({
  locale,
  courseData,
  title,
  description,
  badge,
  primaryLabel,
  secondaryLabel,
  registerUrl,
  onRegisterClick,
  trackingLabel,
  compact = false,
}) {
  return (
    <section
      className={`course-theme-contrast rounded-[32px] ${
        compact ? 'mb-12 p-7 lg:p-8' : 'mt-12 rounded-[34px] px-7 py-8 lg:px-10 lg:py-10'
      }`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            {badge || (locale === 'th' ? 'Consult Before Registering' : 'Consult Before Registering')}
          </div>
          <h3
            className={`course-contrast-heading mt-2 font-semibold leading-tight ${
              compact ? 'text-2xl lg:text-[30px]' : 'text-3xl lg:text-[38px]'
            }`}
          >
            {title}
          </h3>
          <p className="course-contrast-copy mt-3 text-base leading-8">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <LineContactButton
            courseData={courseData}
            label={primaryLabel}
            trackingLabel={trackingLabel}
          />
          <a
            href={registerUrl || '#course-registration'}
            target={registerUrl ? '_blank' : undefined}
            rel={registerUrl ? 'noreferrer' : undefined}
            onClick={onRegisterClick}
            className={registerSecondaryButtonClass}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
