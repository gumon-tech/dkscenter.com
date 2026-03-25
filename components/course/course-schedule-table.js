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
    <div className="course-theme-panel scroll-mt-28 overflow-hidden rounded-2xl">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="course-theme-table-head text-xs uppercase text-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              colSpan={2}
              className="rounded-t-xl border-b border-gray-200 px-6 py-4 text-xl font-bold text-blue-700 dark:border-slate-800 dark:text-blue-400"
            >
              {t('course-detail-9')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
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
                : 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

              return (
                <tr
                  key={index}
                  className="course-theme-table-row group transition-colors duration-200"
                >
                  <th scope="row" className="px-4 py-5 align-top">
                    <h3 className="text-lg font-bold leading-7 text-gray-700 dark:text-gray-300">
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
                          className="cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
                    <div className="flex pt-2 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                      <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                        <CalendarIcon />
                      </span>
                      <p>{eventStartDate}</p>
                      {eventStartDate !== eventEndDate && (
                        <p className="pl-1">- {eventEndDate}</p>
                      )}
                    </div>

                    <div className="flex pt-1 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                      <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                        <ClockIcon />
                      </span>
                      <p>{eventStartTime}</p>
                      <p className="pl-1">- {eventEndTime}</p>
                    </div>

                    {publicSchedule.location && (
                      <div className="flex pt-1 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                        <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                          <MapPinIcon />
                        </span>
                        <span>{publicSchedule.location}</span>
                      </div>
                    )}

                    {courseType === 'GET_YOURS' && registerBottom && (
                      <a
                        target="_blank"
                        href={forwardedUrl}
                        onClick={() => onRegisterClick(publicSchedule, forwardedUrl)}
                        className={`mt-2 ${registerButtonClass}`}
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
                          className={`mt-2 ${registerButtonClass}`}
                          onClick={() => onOpenModal(publicSchedule.scheduleKey)}
                        >
                          {isConversionFocusedCourse
                            ? lineCopy.registerLabel
                            : t('course-detail-16')}
                        </button>
                      </nav>
                    )}
                  </th>

                  <th className="px-4 py-5 align-top">
                    {courseType === 'COMING_SOON' && 'COMING SOON!'}
                    {courseType === 'ENDED' && (
                      <span className="text-gray-700 dark:text-gray-400 font-bold whitespace-nowrap">
                        {t('course-detail-14')}
                      </span>
                    )}
                    {courseType === 'SOLD_OUT' && (
                      <span className="text-red-600 font-bold whitespace-nowrap">
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
                className="rounded-t-lg px-6 py-5 text-base font-medium leading-7 text-gray-900 dark:text-white"
              >
                {t('course-detail-17')}
              </th>
            </tr>
          )}

          <tr className="bg-transparent">
            <th
              scope="row"
              colSpan={2}
              className="rounded-b-lg px-6 py-5 text-base font-medium text-gray-900 dark:text-white"
            >
              <Link
                href={'/about-us'}
                className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
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
