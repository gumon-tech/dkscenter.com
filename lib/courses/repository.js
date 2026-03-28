import { defaultLocale, normalizeLocale } from '../i18n/config';
import { getCourseContentMap } from '../../content/courses/source';
import { upcomingSessions } from './sessions';

const courses = getCourseContentMap();

function getLocalizedEntry(entry, locale = defaultLocale) {
  const normalizedLocale = normalizeLocale(locale);
  return entry?.[normalizedLocale] || entry?.[defaultLocale] || null;
}

export function getCourseKeys() {
  return Object.keys(courses);
}

export function getCourseCollection() {
  return courses;
}

export function getLocalizedCourses(locale = defaultLocale) {
  return Object.values(courses)
    .map((course) => getLocalizedEntry(course, locale))
    .filter(Boolean);
}

export function getActiveLocalizedCourses(locale = defaultLocale) {
  return getLocalizedCourses(locale).filter((course) => course.isActive);
}

export function getLocalizedCourseByKey(courseKey, locale = defaultLocale) {
  const entry = courses[courseKey];
  return getLocalizedEntry(entry, locale);
}

export function getCourseByKey(courseKey) {
  return courses[courseKey] || null;
}

export function getLocalizedCourseCollectionWithLocales() {
  return Object.values(courses).flatMap((entry) =>
    Object.entries(entry)
      .map(([locale, value]) => ({
        ...value,
        locale,
      }))
      .filter(Boolean),
  );
}

export function getUpcomingSchedules(course) {
  return upcomingSessions(course);
}

export function getScheduleByKey(course, scheduleKey) {
  return (
    course?.publicSchedule?.find(
      (schedule) => String(schedule.scheduleKey) === String(scheduleKey),
    ) || null
  );
}

export function getLocalizedCourseSchedulePaths() {
  return getLocalizedCourseCollectionWithLocales().flatMap((course) =>
    (course.publicSchedule || [])
      .filter((schedule) => schedule.isActive && schedule.scheduleKey)
      .map((schedule) => ({
        params: {
          locale: course.locale || defaultLocale,
          courseKey: course.key,
          scheduleKey: schedule.scheduleKey,
        },
      })),
  );
}

export function getCoursesWithUpcomingSchedules(locale = defaultLocale) {
  return getActiveLocalizedCourses(locale)
    .map((course) => ({
      ...course,
      publicSchedule: getUpcomingSchedules(course),
    }))
    .filter((course) => course.publicSchedule.length > 0);
}
