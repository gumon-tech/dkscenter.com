import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from '../content/site';

function toArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function toAbsoluteUrl(url) {
  if (!url) return null;
  if (String(url).startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function toCourseAttendanceMode(deliveryMode) {
  if (deliveryMode === 'onsite') {
    return 'https://schema.org/OfflineEventAttendanceMode';
  }

  if (deliveryMode === 'online') {
    return 'https://schema.org/OnlineEventAttendanceMode';
  }

  if (deliveryMode === 'hybrid') {
    return 'https://schema.org/MixedEventAttendanceMode';
  }

  return null;
}

function buildLocation(locationName, locationUrl) {
  if (!locationName) return null;

  return {
    '@type': 'Place',
    name: cleanText(locationName),
    ...(locationUrl ? { url: locationUrl } : {}),
  };
}

export function buildOrganizationSchema() {
  const sameAs = SOCIAL_LINKS.map((item) => item.href).filter(
    (href) => href && !href.startsWith('mailto:'),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: toAbsoluteUrl('/img/logo_2_sq.png'),
    image: toAbsoluteUrl('/img/main_img.jpg'),
    email: 'dkscenter@gumon.io',
    sameAs,
  };
}

export function buildWebSiteSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items = []) {
  const itemListElement = toArray(items).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: cleanText(item?.name),
    item: toAbsoluteUrl(item?.path),
  }));

  if (itemListElement.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function buildCourseSchema(course, locale = 'en') {
  if (!course?.title || !course?.overview) return null;

  const activeSessions = toArray(course.publicSchedule).filter(
    (schedule) => schedule?.isActive && schedule?.scheduleKey,
  );

  const hasCourseInstance = activeSessions
    .map((schedule) => {
      const attendanceMode = toCourseAttendanceMode(schedule.deliveryMode);
      const location = buildLocation(schedule.location, schedule.locationUrl);

      const instance = {
        '@type': 'CourseInstance',
        name: cleanText(schedule.title || course.title),
        startDate: schedule.eventStart,
        endDate: schedule.eventEnd,
        ...(attendanceMode ? { eventAttendanceMode: attendanceMode } : {}),
        ...(location ? { location } : {}),
      };

      if (schedule.deliveryMode) {
        instance.courseMode = cleanText(schedule.deliveryMode);
      }

      return instance;
    })
    .filter((item) => item.startDate && item.endDate);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': toAbsoluteUrl(`/${locale}/course/${course.key}#course`),
    name: cleanText(course.title),
    description: cleanText(course.overview),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    url: toAbsoluteUrl(`/${locale}/course/${course.key}`),
    inLanguage: locale,
    image: toAbsoluteUrl(course.imageUrl || '/img/main_img.jpg'),
    ...(course.code ? { identifier: cleanText(course.code) } : {}),
    ...(hasCourseInstance.length > 0 ? { hasCourseInstance } : {}),
  };
}

export function buildItemListSchema(items = []) {
  const itemListElement = toArray(items).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: toAbsoluteUrl(item?.path || item?.url),
    name: cleanText(item?.name),
  }));

  if (itemListElement.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: itemListElement.length,
    itemListElement,
  };
}
