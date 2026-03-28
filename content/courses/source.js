import { courseRegistry } from './registry';
import { composeLocalizedCourse } from './normalization/compose-course';

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

export function getCourseContentMap() {
  return getSplitCourseContentMap();
}

export function getRawCourseContent() {
  return courseRegistry;
}

export function getMergedCourseContent() {
  return getCourseContentMap();
}
