import dayjs from 'dayjs';
import { defaultLocale, normalizeLocale } from '../i18n/config';
import { getCourseContentMap } from '../../content/courses/source';
import { allActiveSessions, upcomingSessions } from './sessions';

const courses = getCourseContentMap();

function toTimestamp(value, fallback = Number.POSITIVE_INFINITY) {
  if (!value) return fallback;

  const parsed = dayjs(value).valueOf();
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getCourseSortBucket(course) {
  const upcoming = upcomingSessions(course);
  if (upcoming.length > 0) return 0;
  return 1;
}

function getLatestScheduleTimestamp(course) {
  const sessions = allActiveSessions(course);
  const latestSession = sessions[sessions.length - 1];
  return toTimestamp(latestSession?.eventStart, Number.NEGATIVE_INFINITY);
}

function getCourseRecencyTimestamp(course) {
  const latestSchedule = getLatestScheduleTimestamp(course);
  const latestUpdate = toTimestamp(course?.lastUpdate, Number.NEGATIVE_INFINITY);

  return Math.max(latestSchedule, latestUpdate);
}

function compareCoursesForDisplay(a, b) {
  const bucketA = getCourseSortBucket(a);
  const bucketB = getCourseSortBucket(b);

  if (bucketA !== bucketB) return bucketA - bucketB;

  if (bucketA === 0) {
    const nextA = toTimestamp(upcomingSessions(a)[0]?.eventStart);
    const nextB = toTimestamp(upcomingSessions(b)[0]?.eventStart);
    if (nextA !== nextB) return nextA - nextB;
  }

  const recencyA = getCourseRecencyTimestamp(a);
  const recencyB = getCourseRecencyTimestamp(b);
  if (recencyA !== recencyB) return recencyB - recencyA;

  return String(a?.code || a?.key || '').localeCompare(
    String(b?.code || b?.key || ''),
  );
}

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
    .filter(Boolean)
    .sort(compareCoursesForDisplay);
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
