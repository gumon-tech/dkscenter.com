/* eslint-disable react/prop-types */
import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { registerSecondaryButtonClass } from '/lib/courses/cta';
import LineContactButton from './line-contact-button';

export default function CourseSidebarCta({
  courseData,
  lineCopy,
  locale,
  featuredSchedule,
  scheduleDateRange,
  scheduleTimeRange,
  featuredRegisterUrl,
  onRegisterClick,
}) {
  return (
    <section className="course-theme-contrast mb-6 overflow-hidden rounded-[32px] p-6 lg:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-secondary/12 blur-3xl"
      />
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-3 text-secondary">
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </div>
        <div>
          <div className="mb-2">
            <span className="inline-flex rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              {lineCopy.sidebarBadge}
            </span>
          </div>
          <h3 className="course-contrast-heading text-xl font-semibold leading-tight tracking-[-0.03em]">
            {lineCopy.sidebarPrimary}
          </h3>
          <p className="course-contrast-copy mt-2 text-sm leading-7">
            {lineCopy.sidebarMicrocopy}
          </p>
        </div>
      </div>

      {featuredSchedule && (
        <div className="mt-5 grid gap-3">
          <div className="course-theme-subtle rounded-2xl px-4 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
              {locale === 'th' ? 'Next Session' : 'Next Session'}
            </div>
            <div className="course-contrast-heading mt-2 text-base font-medium leading-7">
              {scheduleDateRange}
            </div>
            <div className="course-contrast-copy text-sm">
              {scheduleTimeRange}
            </div>
          </div>
          {featuredSchedule.location && (
            <div className="course-theme-subtle course-contrast-copy rounded-2xl px-4 py-4 text-sm leading-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
                {locale === 'th' ? 'Location' : 'Location'}
              </div>
              <div className="mt-2">
                {featuredSchedule.locationUrl ? (
                  <a
                    href={featuredSchedule.locationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-strong"
                  >
                    {featuredSchedule.location}
                  </a>
                ) : (
                  featuredSchedule.location
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <LineContactButton
          courseData={courseData}
          label={lineCopy.sidebarPrimary}
          trackingLabel="sidebar_line_contact"
          className="w-full"
        />
        <a
          href={featuredRegisterUrl || '#course-registration'}
          target={featuredRegisterUrl ? '_blank' : undefined}
          rel={featuredRegisterUrl ? 'noreferrer' : undefined}
          onClick={onRegisterClick}
          className={`${registerSecondaryButtonClass} w-full`}
        >
          {lineCopy.registerLabel}
        </a>
      </div>
    </section>
  );
}
