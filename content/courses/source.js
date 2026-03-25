import { modularCourseEntries } from './entries';

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeDeep(baseValue, overrideValue) {
  if (overrideValue == null) return baseValue;
  if (Array.isArray(overrideValue)) return overrideValue;
  if (!isPlainObject(baseValue) || !isPlainObject(overrideValue)) {
    return overrideValue;
  }

  const keys = new Set([
    ...Object.keys(baseValue || {}),
    ...Object.keys(overrideValue || {}),
  ]);

  return Object.fromEntries(
    Array.from(keys).map((key) => [
      key,
      mergeDeep(baseValue?.[key], overrideValue?.[key]),
    ]),
  );
}

function getMergedCourseSources() {
  return Object.fromEntries(
    Object.entries(modularCourseEntries || {}).map(([courseKey, locales]) => [
      courseKey,
      mergeDeep({}, locales || {}),
    ]),
  );
}

function normalizeLocalizedCourse(courseKey, locale, course = {}) {
  return {
    id: course.code || courseKey,
    key: course.key || courseKey,
    slug: course.key || courseKey,
    locale,
    isActive: Boolean(course.isActive),
    brand: course.brand || 'DKS Center',
    code: course.code || '',
    title: course.title || '',
    overview: course.overview || '',
    duration: course.duration || '',
    imageUrl: course.imageUrl || null,
    detailUrl: course.detailUrl || null,
    language: locale,
    lastUpdate: course.lastUpdate || null,
    objectives: normalizeArray(course.objectives),
    audience: normalizeArray(course.whoShouldAttend),
    whoShouldAttend: normalizeArray(course.whoShouldAttend),
    prerequisites: normalizeArray(course.prerequisites),
    participantsWillReceive: normalizeArray(course.participantsWillReceive),
    outline: normalizeArray(course.outline).map((section) => ({
      title: section?.title || '',
      descriptions: normalizeArray(section?.descriptions),
    })),
    curriculum: normalizeArray(course.outline).map((section) => ({
      title: section?.title || '',
      descriptions: normalizeArray(section?.descriptions),
    })),
    publicSchedule: normalizeArray(course.publicSchedule).map((schedule) => ({
      ...schedule,
      scheduleKey:
        schedule?.scheduleKey ||
        `${course.key || courseKey}-${schedule?.eventStart || 'schedule'}`,
    })),
    documents: normalizeArray(course.documents).map((document) => ({
      title: document?.title || '',
      fileUrl: document?.fileUrl || '',
    })),
  };
}

export function getCourseContentMap() {
  const mergedCourseSources = getMergedCourseSources();

  return Object.fromEntries(
    Object.entries(mergedCourseSources).map(([courseKey, locales]) => [
      courseKey,
      Object.fromEntries(
        Object.entries(locales || {}).map(([locale, course]) => [
          locale,
          normalizeLocalizedCourse(courseKey, locale, course),
        ]),
      ),
    ]),
  );
}

export function getRawCourseContent() {
  return {};
}

export function getMergedCourseContent() {
  return getMergedCourseSources();
}
