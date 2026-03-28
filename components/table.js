import React from 'react';
import Link from '/components/link';
import {
  getCoursesWithUpcomingSchedules,
  getLocalizedCourseByKey,
} from '../lib/courses/repository';
import Card from './ui/card';
import Badge from './ui/badge';
import { formatCourseDateRange } from '../lib/courses/formatters';

export default function Table(props) {
  const i18next = props.i18next;
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;
  const courses = getCoursesWithUpcomingSchedules(currentLanguage);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative overflow-auto">
        <div className="table-overflow overflow-hidden">
          <table className="w-full border-collapse table-auto text-base">
            <thead>
              <tr className="bg-surface">
                <th className="border-b border-border/70 p-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-soft">
                  {t('schedule-course')}
                </th>
                <th className="border-b border-border/70 p-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-soft">
                  {t('schedule-duration')}
                </th>
                <th className="border-b border-border/70 p-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-soft">
                  {t('schedule-schedule')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {courses.map((course, index) => {
                return (
                  <tr
                    key={course.key + '-' + index}
                    className="align-top odd:bg-transparent even:bg-surface/50"
                  >
                    <td className="border-b border-border/70 p-5 text-left">
                      <Link
                        href={`/course/${course.key}`}
                        className="block text-lg font-semibold tracking-[-0.03em] text-text hover:text-primary"
                      >
                        {course.title}
                      </Link>
                      <div className="mt-3">
                        <Badge variant="neutral">{course.code}</Badge>
                      </div>
                    </td>
                    <td className="border-b border-border/70 p-5 text-sm leading-7 text-muted">
                      {course.duration}
                    </td>

                    <td className="border-b border-border/70 p-5 text-sm text-muted">
                      {course.publicSchedule.map((schedule, index) => {
                        const courseForSchedule = getLocalizedCourseByKey(
                          course.key,
                          currentLanguage,
                        );

                        return (
                          <div
                            key={'schedule-' + index}
                            className="mb-3 rounded-2xl border border-border/70 bg-surface px-4 py-4 last:mb-0"
                          >
                            <Link
                              href={`/course/${course.key}/schedule/${schedule.scheduleKey}`}
                              className="block text-left font-semibold text-text hover:text-primary"
                            >
                              {schedule.title}
                            </Link>
                            <div className="mt-2 text-left leading-7 text-muted">
                              {formatCourseDateRange(
                                schedule.eventStart,
                                schedule.eventEnd,
                                currentLanguage,
                              )}
                            </div>
                            <div className="mt-2 text-left text-sm">
                              <Link
                                href={`/course/${course.key}`}
                                className="text-primary hover:text-primary-strong"
                              >
                                {currentLanguage === 'th'
                                  ? `ดูรายละเอียดคอร์ส ${courseForSchedule?.title || course.title}`
                                  : `View ${courseForSchedule?.title || course.title}`}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
