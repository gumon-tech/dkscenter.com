/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
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

  if (activeSchedules.length === 0) {
    return (
      <section className="rounded-[30px] border border-border/60 bg-surface/45 px-5 py-6 shadow-soft backdrop-blur-xl sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
          {locale === 'th' ? 'รอบอบรม' : 'Available Sessions'}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {locale === 'th'
            ? 'ยังไม่มีรอบที่เปิดแสดงในขณะนี้ สามารถติดต่อผ่าน LINE เพื่อสอบถามรอบถัดไปได้'
            : 'There are no active sessions listed right now. You can still contact us on LINE to ask about upcoming dates.'}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-border/60 bg-surface/45 shadow-soft backdrop-blur-xl">
      <div className="border-b border-border/60 px-5 py-5 sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
          {locale === 'th' ? 'รอบอบรม' : 'Available Sessions'}
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          {activeSchedules.length > 1
            ? locale === 'th'
              ? `ขณะนี้มีรอบอบรมที่เปิดลงทะเบียน ${activeSchedules.length} รอบ`
              : `${activeSchedules.length} sessions are currently available.`
            : locale === 'th'
              ? 'ตรวจสอบรายละเอียดรอบอบรมและลงทะเบียนได้ที่นี่'
              : 'Current session details and registration.'}
        </p>
      </div>

      <div className="divide-y divide-border/60">
        {activeSchedules.map((publicSchedule, index) => {
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
            <article key={index} className="px-6 py-7 sm:px-7 sm:py-8">
              <div className="pb-6 sm:pb-7">
                <div className="flex flex-col gap-5 lg:gap-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <ScheduleBadge
                        courseType={courseType}
                        t={t}
                        locale={locale}
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                        {locale === 'th'
                          ? `Session 0${index + 1}`
                          : `Session 0${index + 1}`}
                      </span>
                    </div>

                    {canRegister ? (
                      <div className="lg:min-w-[220px] lg:pl-6">
                        {courseType === 'GET_YOURS' ? (
                          <a
                            target="_blank"
                            href={forwardedUrl}
                            onClick={() =>
                              onRegisterClick(publicSchedule, forwardedUrl)
                            }
                            rel="noreferrer"
                            className={`${registerButtonClass} w-full px-6 py-4 text-base`}
                          >
                            {isConversionFocusedCourse
                              ? lineCopy.registerLabel
                              : t('course-detail-16')}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenModal(publicSchedule.scheduleKey)
                            }
                            className={`${registerButtonClass} w-full px-6 py-4 text-base`}
                          >
                            {isConversionFocusedCourse
                              ? lineCopy.registerLabel
                              : t('course-detail-16')}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.045em] text-text sm:text-[2.2rem] lg:text-[2.6rem]">
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
                          onClick={() =>
                            onOpenModal(publicSchedule.scheduleKey)
                          }
                          className="text-left transition hover:text-primary"
                        >
                          {publicSchedule.title}
                        </button>
                      ) : (
                        publicSchedule.title
                      )}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-7">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="theme-overlay-card rounded-[24px] px-5 py-5">
                    <div className="flex items-center gap-2 text-soft">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {locale === 'th' ? 'วันที่' : 'Date'}
                      </span>
                    </div>
                    <div className="mt-4 text-lg leading-9 text-text">
                      {eventStartDate}
                      {eventStartDate !== eventEndDate
                        ? ` - ${eventEndDate}`
                        : ''}
                    </div>
                  </div>

                  <div className="theme-overlay-card rounded-[24px] px-5 py-5">
                    <div className="flex items-center gap-2 text-soft">
                      <ClockIcon className="h-5 w-5 text-primary" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {locale === 'th' ? 'เวลา' : 'Time'}
                      </span>
                    </div>
                    <div className="mt-4 text-lg leading-9 text-text">
                      {eventStartTime} - {eventEndTime}
                    </div>
                  </div>

                  {publicSchedule.location ? (
                    <div className="theme-overlay-card rounded-[24px] px-5 py-5 md:col-span-1">
                      <div className="flex items-center gap-2 text-soft">
                        <MapPinIcon className="h-5 w-5 text-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                          {locale === 'th' ? 'สถานที่' : 'Location'}
                        </span>
                      </div>
                      <div className="mt-4 text-lg leading-9">
                        {publicSchedule.locationUrl ? (
                          <a
                            href={publicSchedule.locationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-strong"
                          >
                            {publicSchedule.location}
                          </a>
                        ) : (
                          <span className="text-text">
                            {publicSchedule.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
