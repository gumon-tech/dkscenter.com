import { courseRegistry } from './registry';
import {
  composeLocalizedCourse,
  normalizeLegacyCourseCollection,
} from './normalization/compose-course';

function getSplitCourseContentMap() {
  return Object.fromEntries(
    Object.entries(courseRegistry || {})
      .filter(([, entry]) => entry?.mode === 'split')
      .map(([courseKey, entry]) => [
        courseKey,
        {
          en: composeLocalizedCourse({
            courseKey,
            locale: 'en',
            shared: entry?.shared,
            localized: entry?.locales?.en,
            schedules: entry?.schedules,
          }),
          th: composeLocalizedCourse({
            courseKey,
            locale: 'th',
            shared: entry?.shared,
            localized: entry?.locales?.th,
            schedules: entry?.schedules,
          }),
        },
      ]),
  );
}

function getLegacyCourseContentMap() {
  const legacyEntries = Object.fromEntries(
    Object.entries(courseRegistry || {})
      .filter(([, entry]) => entry?.mode === 'legacy')
      .map(([courseKey, entry]) => [courseKey, entry?.legacy || {}]),
  );

  return normalizeLegacyCourseCollection(legacyEntries);
}

export function getCourseContentMap() {
  return {
    ...getLegacyCourseContentMap(),
    ...getSplitCourseContentMap(),
  };
}

export function getRawCourseContent() {
  return courseRegistry;
}

export function getMergedCourseContent() {
  return getCourseContentMap();
}
