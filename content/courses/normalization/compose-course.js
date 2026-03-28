function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeLink(value) {
  return typeof value === 'string' ? value : '';
}

function normalizeNamedEntity(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    const name = value.trim();
    return name ? { name, url: '' } : null;
  }

  if (typeof value !== 'object') return null;

  const name = String(value?.name || '').trim();
  if (!name) return null;

  return {
    ...value,
    name,
    url: normalizeLink(value?.url),
  };
}

function normalizeNamedEntityList(value) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  return items.map((item) => normalizeNamedEntity(item)).filter(Boolean);
}

function normalizeInstructor(value) {
  const entity = normalizeNamedEntity(value);
  if (!entity) return null;

  return {
    ...entity,
    title: typeof value?.title === 'string' ? value.title : '',
    profileUrl: normalizeLink(value?.profileUrl),
  };
}

function normalizeInstructorList(value) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  return items.map((item) => normalizeInstructor(item)).filter(Boolean);
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

function normalizeSchedules(courseKey, schedules, shared = {}) {
  const defaultOrganizers = normalizeNamedEntityList(
    shared?.defaultOrganizers || shared?.defaultOrganizer || shared?.brand,
  );

  return normalizeArray(schedules).map((schedule) => {
    const scheduleOrganizers = normalizeNamedEntityList(
      schedule?.organizers || schedule?.organizer,
    );
    const organizers =
      scheduleOrganizers.length > 0 ? scheduleOrganizers : defaultOrganizers;
    const instructors = normalizeInstructorList(
      schedule?.instructors || schedule?.instructor,
    );

    return {
      ...schedule,
      scheduleKey:
        schedule?.scheduleKey ||
        `${courseKey}-${schedule?.eventStart || 'schedule'}`,
      isActive: Boolean(schedule?.isActive),
      isSoldOut: Boolean(schedule?.isSoldOut),
      ticketUrl: schedule?.ticketUrl || '',
      location: schedule?.location || '',
      locationUrl: schedule?.locationUrl || '',
      deliveryMode: schedule?.deliveryMode || '',
      organizer: organizers[0] || null,
      organizers,
      instructors,
    };
  });
}

export function composeLocalizedCourse({
  courseKey,
  locale,
  shared = {},
  localized = {},
  schedules = [],
}) {
  const outline = normalizeOutline(localized?.outline);
  const defaultOrganizers = normalizeNamedEntityList(
    shared?.defaultOrganizers || shared?.defaultOrganizer || shared?.brand,
  );

  return {
    id: shared?.code || courseKey,
    key: shared?.key || courseKey,
    slug: shared?.key || courseKey,
    locale,
    isActive: Boolean(shared?.isActive),
    defaultOrganizer: defaultOrganizers[0] || null,
    defaultOrganizers,
    code: shared?.code || '',
    title: localized?.title || '',
    overview: localized?.overview || '',
    duration: localized?.duration || '',
    imageUrl: shared?.imageUrl || null,
    detailUrl: `/${locale}/course/${shared?.key || courseKey}`,
    language: locale,
    lastUpdate: shared?.lastUpdate || null,
    objectives: normalizeArray(localized?.objectives),
    audience: normalizeArray(localized?.whoShouldAttend),
    whoShouldAttend: normalizeArray(localized?.whoShouldAttend),
    prerequisites: normalizeArray(localized?.prerequisites),
    participantsWillReceive: normalizeArray(localized?.participantsWillReceive),
    outline,
    curriculum: outline,
    publicSchedule: normalizeSchedules(courseKey, schedules, shared),
    documents: normalizeDocuments(localized?.documents),
  };
}
