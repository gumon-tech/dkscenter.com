/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Link from '/components/link';
import {
  buildForwardedUrl,
  registerScheduleButtonClass,
} from '/lib/courses/cta';
import { formatCourseDate, formatCourseTime } from '/lib/courses/formatters';

function getCourseType(publicSchedule) {
  const isSaleEnded = dayjs().isAfter(dayjs(publicSchedule.saleEnd));
  const isSaleStart = dayjs().isAfter(dayjs(publicSchedule.saleStart));

  if (isSaleEnded) return 'ENDED';
  if (isSaleStart && !isSaleEnded && publicSchedule.isSoldOut) {
    return 'SOLD_OUT';
  }
  if (
    isSaleStart &&
    !isSaleEnded &&
    !publicSchedule.isSoldOut &&
    publicSchedule.ticketUrl
  ) {
    return 'GET_YOURS';
  }
  if (
    isSaleStart &&
    !isSaleEnded &&
    !publicSchedule.isSoldOut &&
    !publicSchedule.ticketUrl &&
    publicSchedule.scheduleKey
  ) {
    return 'GET_YOURS_2';
  }
  return 'COMING_SOON';
}

function ScheduleBadge({ courseType, t, locale }) {
  if (courseType === 'COMING_SOON') {
    return (
      <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
        {locale === 'th' ? 'เร็ว ๆ นี้' : 'Coming soon'}
      </span>
    );
  }

  if (courseType === 'ENDED') {
    return (
      <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
        {t('course-detail-14')}
      </span>
    );
  }

  if (courseType === 'SOLD_OUT') {
    return (
      <span className="rounded-full border border-danger/20 bg-danger/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-danger">
        {t('course-detail-15')}
      </span>
    );
  }

  return (
    <span className="rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-success">
      {locale === 'th' ? 'เปิดรับสมัคร' : 'Open'}
    </span>
  );
}

export default function CourseScheduleTable({
  courseData,
  locale,
  t,
  routerQuery,
  isConversionFocusedCourse,
  lineCopy,
  onScheduleTitleClick,
  onRegisterClick,
  onOpenModal,
}) {
  const activeSchedules = (courseData.publicSchedule || [])
    .filter((publicSchedule) => publicSchedule.isActive)
    .sort(
      (a, b) => dayjs(b.eventStart).valueOf() - dayjs(a.eventStart).valueOf(),
    );

  const registerButtonClass = isConversionFocusedCourse
    ? registerScheduleButtonClass
    : 'inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-strong focus:outline-none focus:ring-4 focus:ring-primary/20';

  return (
    <section className="course-theme-panel scroll-mt-28 overflow-hidden rounded-[30px]">
      <div className="border-b border-border/70 px-6 py-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
          {locale === 'th' ? 'Schedule Overview' : 'Schedule Overview'}
        </div>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-text">
          {t('course-detail-9')}
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          {activeSchedules.length > 1
            ? locale === 'th'
              ? `มีรอบอบรม ${activeSchedules.length} รอบที่เปิดแสดงอยู่ตอนนี้`
              : `${activeSchedules.length} available sessions are listed below.`
            : locale === 'th'
              ? 'รายละเอียดรอบอบรมปัจจุบันและการลงทะเบียน'
              : 'Current schedule details and registration.'}
        </p>
      </div>

      <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
        {activeSchedules.length > 0 ? (
          activeSchedules.map((publicSchedule, index) => {
            const eventStartDate = formatCourseDate(
              publicSchedule.eventStart,
              locale,
            );
            const eventEndDate = formatCourseDate(
              publicSchedule.eventEnd,
              locale,
            );
            const eventStartTime = formatCourseTime(
              publicSchedule.eventStart,
              locale,
            );
            const eventEndTime = formatCourseTime(
              publicSchedule.eventEnd,
              locale,
            );
            const courseType = getCourseType(publicSchedule);
            const forwardedUrl = buildForwardedUrl(
              publicSchedule.ticketUrl,
              routerQuery || {},
            );

            const canRegister =
              courseType === 'GET_YOURS' || courseType === 'GET_YOURS_2';

            return (
              <article
                key={index}
                className="rounded-[24px] border border-border/70 bg-surface px-5 py-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3">
                        <ScheduleBadge
                          courseType={courseType}
                          t={t}
                          locale={locale}
                        />
                      </div>
                      <h4 className="text-xl font-semibold leading-8 tracking-[-0.03em] text-text">
                        {courseType === 'GET_YOURS' ? (
                          <a
                            target="_blank"
                            href={forwardedUrl}
                            onClick={() =>
                              onScheduleTitleClick(publicSchedule, forwardedUrl)
                            }
                            rel="noreferrer"
                            className="transition hover:text-primary"
                          >
                            {publicSchedule.title}
                          </a>
                        ) : courseType === 'GET_YOURS_2' ? (
                          <button
                            type="button"
                            onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                            className="text-left transition hover:text-primary"
                          >
                            {publicSchedule.title}
                          </button>
                        ) : (
                          publicSchedule.title
                        )}
                      </h4>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-background/40 px-4 py-4">
                        <div className="mb-2 flex items-center gap-2 text-soft">
                          <CalendarIcon className="h-5 w-5" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                            {locale === 'th' ? 'วันที่' : 'Date'}
                          </span>
                        </div>
                        <div className="text-base font-medium leading-7 text-text">
                          {eventStartDate}
                          {eventStartDate !== eventEndDate ? ` - ${eventEndDate}` : ''}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-background/40 px-4 py-4">
                        <div className="mb-2 flex items-center gap-2 text-soft">
                          <ClockIcon className="h-5 w-5" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                            {locale === 'th' ? 'เวลา' : 'Time'}
                          </span>
                        </div>
                        <div className="text-base font-medium leading-7 text-text">
                          {eventStartTime} - {eventEndTime}
                        </div>
                      </div>
                    </div>

                    {publicSchedule.location && (
                      <div className="rounded-2xl bg-background/40 px-4 py-4">
                        <div className="mb-2 flex items-center gap-2 text-soft">
                          <MapPinIcon className="h-5 w-5" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                            {locale === 'th' ? 'สถานที่' : 'Location'}
                          </span>
                        </div>
                        {publicSchedule.locationUrl ? (
                          <a
                            href={publicSchedule.locationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base font-medium leading-7 text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-strong"
                          >
                            {publicSchedule.location}
                          </a>
                        ) : (
                          <div className="text-base font-medium leading-7 text-text">
                            {publicSchedule.location}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {canRegister && (
                    <div className="pt-1">
                      {courseType === 'GET_YOURS' ? (
                        <a
                          target="_blank"
                          href={forwardedUrl}
                          onClick={() =>
                            onRegisterClick(publicSchedule, forwardedUrl)
                          }
                          className={`${registerButtonClass} w-full sm:w-auto`}
                          rel="noreferrer"
                        >
                          {isConversionFocusedCourse
                            ? lineCopy.registerLabel
                            : t('course-detail-16')}
                        </a>
                      ) : (
                        <button
                          type="button"
                          className={`${registerButtonClass} w-full sm:w-auto`}
                          onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                        >
                          {isConversionFocusedCourse
                            ? lineCopy.registerLabel
                            : t('course-detail-16')}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="px-2 py-2 text-base leading-7 text-text">
            {t('course-detail-17')}
          </div>
        )}
      </div>

      <div className="border-t border-border/70 px-6 py-5">
        <Link
          href="/about-us"
          className="inline-flex items-center font-medium text-primary hover:text-primary-strong"
        >
          {t('course-detail-18')}
          <svg
            className="ms-2.5 h-3 w-3 rtl:rotate-[270deg]"
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
        </Link>
      </div>
    </section>
  );
}
