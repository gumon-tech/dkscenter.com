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

export default function CourseScheduleTable({
  courseData,
  locale,
  t,
  routerQuery,
  registerBottom,
  registerRight,
  isConversionFocusedCourse,
  lineCopy,
  onScheduleTitleClick,
  onRegisterClick,
  onOpenModal,
}) {
  const activeSchedules = (courseData.publicSchedule || [])
    .filter((publicSchedule) => publicSchedule.isActive)
    .sort((a, b) => dayjs(b.eventStart).valueOf() - dayjs(a.eventStart).valueOf());

  return (
    <div className="course-theme-panel scroll-mt-28 overflow-hidden rounded-[30px]">
      <table className="w-full text-left text-sm text-muted rtl:text-right">
        <thead className="course-theme-table-head text-xs uppercase text-soft">
          <tr>
            <th
              scope="col"
              colSpan={2}
              className="rounded-t-[30px] border-b border-border/70 px-6 py-5 text-xl font-semibold tracking-[-0.03em] text-text"
            >
              {t('course-detail-9')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
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
              const registerButtonClass = isConversionFocusedCourse
                ? registerScheduleButtonClass
                : 'inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-strong focus:outline-none focus:ring-4 focus:ring-primary/20';

              return (
                <tr
                  key={index}
                  className="course-theme-table-row group transition-colors duration-200"
                >
                  <th scope="row" className="px-5 py-5 align-top sm:px-6">
                    <h3 className="max-w-[20rem] text-[1.75rem] font-semibold leading-[1.28] tracking-[-0.04em] text-text sm:max-w-none sm:text-lg sm:leading-7 sm:tracking-[-0.03em]">
                      {(courseType === 'COMING_SOON' ||
                        courseType === 'ENDED' ||
                        courseType === 'SOLD_OUT') && <>{publicSchedule.title}</>}
                      {courseType === 'GET_YOURS' && (
                        <a
                          target="_blank"
                          href={forwardedUrl}
                          onClick={() =>
                            onScheduleTitleClick(publicSchedule, forwardedUrl)
                          }
                          rel="noreferrer"
                          className="cursor-pointer text-primary hover:text-primary-strong"
                        >
                          {publicSchedule.title}
                        </a>
                      )}
                      {courseType === 'GET_YOURS_2' && (
                        <a
                          className="cursor-pointer"
                          href="#"
                          onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                        >
                          {publicSchedule.title}
                        </a>
                      )}
                    </h3>
                    <div className="mt-5 grid gap-3 text-[15px] leading-7 text-muted">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-5 w-5 min-w-[1.25rem] text-soft">
                          <CalendarIcon />
                        </span>
                        <div className="grid gap-1 sm:flex sm:flex-wrap sm:items-center">
                          <p>{eventStartDate}</p>
                          {eventStartDate !== eventEndDate && (
                            <p className="sm:pl-1">- {eventEndDate}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-5 w-5 min-w-[1.25rem] text-soft">
                          <ClockIcon />
                        </span>
                        <div className="grid gap-1 sm:flex sm:flex-wrap sm:items-center">
                          <p>{eventStartTime}</p>
                          <p className="sm:pl-1">- {eventEndTime}</p>
                        </div>
                      </div>

                      {publicSchedule.location && (
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 h-5 w-5 min-w-[1.25rem] text-soft">
                            <MapPinIcon />
                          </span>
                          <span className="max-w-[24rem] sm:max-w-none">
                            {publicSchedule.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {courseType === 'GET_YOURS' && registerBottom && (
                      <a
                        target="_blank"
                        href={forwardedUrl}
                        onClick={() => onRegisterClick(publicSchedule, forwardedUrl)}
                        className={`mt-5 ${registerButtonClass}`}
                        rel="noreferrer"
                      >
                        {isConversionFocusedCourse
                          ? lineCopy.registerLabel
                          : t('course-detail-16')}
                      </a>
                    )}

                    {courseType === 'GET_YOURS_2' && registerBottom && (
                      <nav>
                        <button
                          className={`mt-5 ${registerButtonClass}`}
                          onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                        >
                          {isConversionFocusedCourse
                            ? lineCopy.registerLabel
                            : t('course-detail-16')}
                        </button>
                      </nav>
                    )}
                  </th>

                  <th className="hidden px-4 py-5 align-top md:table-cell">
                    {courseType === 'COMING_SOON' && (
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                        Coming soon
                      </span>
                    )}
                    {courseType === 'ENDED' && (
                      <span className="whitespace-nowrap rounded-full border border-border/70 bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                        {t('course-detail-14')}
                      </span>
                    )}
                    {courseType === 'SOLD_OUT' && (
                      <span className="whitespace-nowrap rounded-full border border-danger/20 bg-danger/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-danger">
                        {t('course-detail-15')}
                      </span>
                    )}

                    {courseType === 'GET_YOURS' && registerRight && (
                      <a
                        target="_blank"
                        href={forwardedUrl}
                        onClick={() => onRegisterClick(publicSchedule, forwardedUrl)}
                        className={`${registerButtonClass} ${
                          isConversionFocusedCourse ? 'mt-2 whitespace-nowrap' : 'whitespace-nowrap mt-2'
                        }`}
                        rel="noreferrer"
                      >
                        {isConversionFocusedCourse
                          ? lineCopy.registerLabel
                          : t('course-detail-16')}
                      </a>
                    )}

                    {courseType === 'GET_YOURS_2' && registerRight && (
                      <nav>
                        <button
                          className={`${registerButtonClass} ${
                            isConversionFocusedCourse ? 'mt-2 whitespace-nowrap' : 'whitespace-nowrap mt-2'
                          }`}
                          onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                        >
                          {isConversionFocusedCourse
                            ? lineCopy.registerLabel
                            : t('course-detail-16')}
                        </button>
                      </nav>
                    )}
                  </th>
                </tr>
              );
            })
          ) : (
            <tr className="course-theme-table-row transition">
              <th
                scope="row"
                colSpan={2}
                className="rounded-t-lg px-6 py-5 text-base font-medium leading-7 text-text"
              >
                {t('course-detail-17')}
              </th>
            </tr>
          )}

          <tr className="bg-transparent">
            <th
              scope="row"
              colSpan={2}
              className="rounded-b-[30px] px-6 py-5 text-base font-medium text-text"
            >
              <Link
                href={'/about-us'}
                className="inline-flex items-center font-medium text-primary hover:text-primary-strong"
              >
                {t('course-detail-18')}
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
              </Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
