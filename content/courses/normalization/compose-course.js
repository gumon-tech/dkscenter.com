function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeOutline(outline) {
  return normalizeArray(outline).map((section) => ({
    title: section?.title || '',
    descriptions: normalizeArray(section?.descriptions),
  }));
}

function normalizeDocuments(documents) {
  return normalizeArray(documents).map((document) => ({
    title: document?.title || '',
    fileUrl: document?.fileUrl || '',
  }));
}

function normalizeSchedules(courseKey, schedules) {
  return normalizeArray(schedules).map((schedule) => ({
    ...schedule,
    scheduleKey:
      schedule?.scheduleKey || `${courseKey}-${schedule?.eventStart || 'schedule'}`,
    isActive: Boolean(schedule?.isActive),
    isSoldOut: Boolean(schedule?.isSoldOut),
    ticketUrl: schedule?.ticketUrl || '',
    location: schedule?.location || '',
    locationUrl: schedule?.locationUrl || '',
    deliveryMode: schedule?.deliveryMode || '',
  }));
}

function getLocalizedDetailUrl(detailUrl, locale) {
  if (!detailUrl) return null;
  if (typeof detailUrl === 'string') return detailUrl;
  return detailUrl?.[locale] || detailUrl?.en || detailUrl?.th || null;
}

export function composeLocalizedCourse({
  courseKey,
  locale,
  shared = {},
  localized = {},
  schedules = [],
}) {
  const outline = normalizeOutline(localized?.outline);

  return {
    id: shared?.code || courseKey,
    key: shared?.key || courseKey,
    slug: shared?.key || courseKey,
    locale,
    isActive: Boolean(shared?.isActive),
    brand: shared?.brand || 'DKS Center',
    code: shared?.code || '',
    title: localized?.title || '',
    overview: localized?.overview || '',
    duration: localized?.duration || '',
    imageUrl: shared?.imageUrl || null,
    detailUrl: getLocalizedDetailUrl(shared?.detailUrl, locale),
    language: locale,
    lastUpdate: shared?.lastUpdate || null,
    objectives: normalizeArray(localized?.objectives),
    audience: normalizeArray(localized?.whoShouldAttend),
    whoShouldAttend: normalizeArray(localized?.whoShouldAttend),
    prerequisites: normalizeArray(localized?.prerequisites),
    participantsWillReceive: normalizeArray(localized?.participantsWillReceive),
    outline,
    curriculum: outline,
    publicSchedule: normalizeSchedules(courseKey, schedules),
    documents: normalizeDocuments(localized?.documents),
  };
}
