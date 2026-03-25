import 'dayjs/locale/th';
import 'dayjs/locale/en';
export {
  LINE_CONTACT_URL,
  LINE_PRIMARY_COURSE_KEY,
  buildForwardedUrl,
  getLineCtaCopy,
  getPrimarySchedule,
  isLinePrimaryCourse,
  linePrimaryButtonClass,
  registerScheduleButtonClass,
  registerSecondaryButtonClass,
} from '/lib/courses/cta';
export {
  formatCourseDate,
  formatCourseDateRange,
  formatCourseDateTime,
  formatCourseTime,
  formatScheduleMeta,
} from '/lib/courses/formatters';
export { trackLineContactClick } from './course/line-contact-button';
export { default as LineContactButton } from './course/line-contact-button';
