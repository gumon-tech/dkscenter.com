import dayjs from 'dayjs';

const DELIVERY_MODE_LABELS = {
  onsite: { en: 'Onsite', th: 'Onsite' },
  online: { en: 'Online', th: 'ออนไลน์' },
  hybrid: { en: 'Hybrid', th: 'ไฮบริด' },
};

function normalizeEntityList(value) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  return items
    .map((item) => {
      if (!item) return null;
      if (typeof item === 'string') {
        const name = item.trim();
        return name ? { name, url: '' } : null;
      }

      const name = String(item?.name || '').trim();
      if (!name) return null;

      return {
        ...item,
        name,
        url: typeof item?.url === 'string' ? item.url : '',
      };
    })
    .filter(Boolean);
}

function normalizeScheduleList(course) {
  return Array.isArray(course?.publicSchedule) ? course.publicSchedule : [];
}

function sortByEventStartAsc(a, b) {
  return dayjs(a?.eventStart).valueOf() - dayjs(b?.eventStart).valueOf();
}

function sortByEventStartDesc(a, b) {
  return dayjs(b?.eventStart).valueOf() - dayjs(a?.eventStart).valueOf();
}

export function isActiveSession(schedule) {
  return Boolean(schedule?.isActive);
}

export function isUpcomingSession(schedule) {
  if (!isActiveSession(schedule)) return false;
  if (!schedule?.eventEnd) return false;
  return !dayjs().isAfter(dayjs(schedule.eventEnd));
}

export function isPastSession(schedule) {
  if (!isActiveSession(schedule)) return false;
  if (!schedule?.eventEnd) return false;
  return dayjs().isAfter(dayjs(schedule.eventEnd));
}

export function allActiveSessions(course) {
  return normalizeScheduleList(course)
    .filter(isActiveSession)
    .sort(sortByEventStartAsc);
}

export function upcomingSessions(course) {
  return allActiveSessions(course).filter(isUpcomingSession);
}

export function pastSessions(course) {
  return allActiveSessions(course)
    .filter(isPastSession)
    .sort(sortByEventStartDesc);
}

export function hasAnySessions(course) {
  return normalizeScheduleList(course).length > 0;
}

export function hasUpcomingSessions(course) {
  return upcomingSessions(course).length > 0;
}

export function getPrimaryDisplaySessionData(course) {
  const upcoming = upcomingSessions(course);
  if (upcoming.length > 0) {
    return {
      session: upcoming[0],
      displayState: 'upcoming',
    };
  }

  const past = pastSessions(course);
  if (past.length > 0) {
    return {
      session: past[0],
      displayState: 'past',
    };
  }

  return {
    session: null,
    displayState: 'none',
  };
}

export function getPrimaryDisplaySession(course) {
  return getPrimaryDisplaySessionData(course).session;
}

export function getCourseDefaultOrganizers(course) {
  const defaultOrganizers = normalizeEntityList(
    course?.defaultOrganizers || course?.defaultOrganizer || course?.brand,
  );

  if (defaultOrganizers.length > 0) return defaultOrganizers;
  return normalizeEntityList('DKS Center');
}

export function getSessionOrganizers(schedule, course = null) {
  const sessionOrganizers = normalizeEntityList(
    schedule?.organizers || schedule?.organizer,
  );

  if (sessionOrganizers.length > 0) return sessionOrganizers;
  return getCourseDefaultOrganizers(course);
}

export function getSessionPrimaryOrganizer(schedule, course = null) {
  return getSessionOrganizers(schedule, course)[0] || null;
}

export function getSessionOrganizerLabel(schedule, course = null) {
  return getSessionOrganizers(schedule, course)
    .map((organizer) => organizer?.name)
    .filter(Boolean)
    .join(', ');
}

export function getCoursePrimaryOrganizer(course) {
  const { session } = getPrimaryDisplaySessionData(course);
  return getSessionPrimaryOrganizer(session, course);
}

export function getSessionInstructors(schedule) {
  return normalizeEntityList(schedule?.instructors || schedule?.instructor);
}

export function getSessionInstructorLabel(schedule) {
  return getSessionInstructors(schedule)
    .map((instructor) => instructor?.name)
    .filter(Boolean)
    .join(', ');
}

export function getSessionDeliveryMode(schedule) {
  const explicitMode =
    typeof schedule?.deliveryMode === 'string'
      ? schedule.deliveryMode.trim().toLowerCase()
      : '';

  if (explicitMode) return explicitMode;

  const location =
    typeof schedule?.location === 'string' ? schedule.location : '';
  const normalizedLocation = location.trim().toLowerCase();

  if (!normalizedLocation) return '';
  if (normalizedLocation.includes('hybrid')) return 'hybrid';
  if (normalizedLocation.includes('online')) return 'online';

  return '';
}

export function getDeliveryModeLabel(mode, locale = 'th') {
  const normalizedLocale = locale === 'th' ? 'th' : 'en';
  return DELIVERY_MODE_LABELS[mode]?.[normalizedLocale] || '';
}

export function getSessionDeliveryLabel(schedule, locale = 'th') {
  return getDeliveryModeLabel(getSessionDeliveryMode(schedule), locale);
}

export function getSessionRegistrationState(schedule) {
  if (!schedule) return 'unavailable';

  const isSaleEnded = schedule?.saleEnd
    ? dayjs().isAfter(dayjs(schedule.saleEnd))
    : false;
  const isSaleStarted = schedule?.saleStart
    ? dayjs().isAfter(dayjs(schedule.saleStart))
    : false;

  if (isPastSession(schedule) || isSaleEnded) return 'ended';
  if (isSaleStarted && schedule?.isSoldOut) return 'sold_out';
  if (isSaleStarted && schedule?.ticketUrl) return 'open_external';
  if (isSaleStarted && schedule?.scheduleKey) return 'open_internal';
  if (isUpcomingSession(schedule)) return 'coming_soon';

  return 'unavailable';
}

export function isSessionRegistrationOpen(schedule) {
  const state = getSessionRegistrationState(schedule);
  return state === 'open_external' || state === 'open_internal';
}
