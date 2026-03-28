/**
 * Modular course entries are the primary course content source.
 *
 * Shape:
 * {
 *   [courseKey]: {
 *     [locale]: {
 *       title?: string,
 *       overview?: string,
 *       publicSchedule?: [],
 *       ...
 *     }
 *   }
 * }
 *
 * Keep this object explicit and per-course so new content can be added without
 * touching a large shared blob.
 */
export const legacyCourseEntries = {};

export const modularCourseEntries = legacyCourseEntries;
