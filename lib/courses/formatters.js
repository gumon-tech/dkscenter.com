const COURSE_TIMEZONE = 'Asia/Bangkok';

const getLocaleTag = (locale = 'th') => (locale === 'th' ? 'th-TH' : 'en-US');

export const formatCourseDate = (value, locale = 'th') =>
  new Intl.DateTimeFormat(getLocaleTag(locale), {
    timeZone: COURSE_TIMEZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

export const formatCourseTime = (value, locale = 'th') =>
  new Intl.DateTimeFormat(getLocaleTag(locale), {
    timeZone: COURSE_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));

export const formatCourseDateTime = (value, locale = 'th') =>
  `${formatCourseDate(value, locale)}, ${formatCourseTime(value, locale)}`;

export const formatCourseDateRange = (startValue, endValue, locale = 'th') => {
  const localeTag = getLocaleTag(locale);
  const start = new Date(startValue);
  const end = new Date(endValue);

  const rangeFormatter = new Intl.DateTimeFormat(localeTag, {
    timeZone: COURSE_TIMEZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const startParts = rangeFormatter.formatToParts(start);
  const endParts = rangeFormatter.formatToParts(end);

  const getPart = (parts, type) =>
    parts.find((part) => part.type === type)?.value || '';

  const startDay = getPart(startParts, 'day');
  const startMonth = getPart(startParts, 'month');
  const startYear = getPart(startParts, 'year');
  const endDay = getPart(endParts, 'day');
  const endMonth = getPart(endParts, 'month');
  const endYear = getPart(endParts, 'year');

  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay}-${endDay} ${endMonth} ${endYear}`;
  }

  return `${rangeFormatter.format(start)} - ${rangeFormatter.format(end)}`;
};

export const formatScheduleMeta = (schedule, locale = 'th') => {
  if (!schedule) return [];

  return [
    {
      label: locale === 'th' ? 'วันที่' : 'Date',
      value: formatCourseDateRange(
        schedule.eventStart,
        schedule.eventEnd,
        locale,
      ),
    },
    {
      label: locale === 'th' ? 'เวลา' : 'Time',
      value: `${formatCourseTime(schedule.eventStart, locale)} - ${formatCourseTime(schedule.eventEnd, locale)}`,
    },
    {
      label: locale === 'th' ? 'สถานที่' : 'Location',
      value: schedule.location,
    },
  ].filter((item) => item.value);
};
