import dayjs from 'dayjs';

export const LINE_CONTACT_URL = 'https://lin.ee/ZE7tUrR';
export const LINE_PRIMARY_COURSE_KEY =
  '2025-001-orchestrate-docker-kubernetes-bootcamp';

export const linePrimaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-400 dark:hover:bg-emerald-300';

export const registerSecondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-400/60 hover:bg-blue-500/10 focus:outline-none focus:ring-4 focus:ring-blue-400/30 dark:border-gray-600 dark:bg-gray-900/70';

export const registerScheduleButtonClass =
  'inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-blue-400 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:border-slate-500 dark:bg-slate-800 dark:hover:bg-slate-700';

export const isLinePrimaryCourse = (courseData) =>
  courseData?.key === LINE_PRIMARY_COURSE_KEY;

export const getPrimarySchedule = (courseData) => {
  const schedules =
    courseData?.publicSchedule
      ?.filter((schedule) => schedule?.isActive)
      .sort(
        (a, b) => dayjs(a.eventStart).valueOf() - dayjs(b.eventStart).valueOf(),
      ) || [];

  return (
    schedules.find((schedule) => dayjs(schedule.eventEnd).isAfter(dayjs())) ||
    schedules[0] ||
    null
  );
};

export const buildForwardedUrl = (ticketUrl, query = {}) => {
  if (!ticketUrl) return '';

  const forwardQuery = { ...query };
  delete forwardQuery.slug;
  delete forwardQuery.id;

  const extra = new URLSearchParams();
  Object.entries(forwardQuery).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => item != null && extra.append(key, String(item)));
      return;
    }
    extra.set(key, String(value));
  });

  const extraStr = extra.toString();
  if (!extraStr) return ticketUrl;

  if (/^https?:\/\//.test(ticketUrl)) {
    const url = new URL(ticketUrl);
    extra.forEach((value, key) => url.searchParams.set(key, value));
    return url.toString();
  }

  const glue = ticketUrl.includes('?') ? '&' : '?';
  return `${ticketUrl}${glue}${extraStr}`;
};

export const getLineCtaCopy = (locale = 'th') => {
  if (locale === 'th') {
    return {
      heroPrimary: 'จองที่นั่ง / สอบถามผ่าน LINE',
      heroSecondary: 'ลงทะเบียนทันที',
      heroMicrocopy:
        'ยังไม่แน่ใจ? ทัก LINE เพื่อถามราคา เนื้อหา และที่นั่งว่างได้ทันที',
      heroBadge: 'ตอบกลับเร็ว',
      sidebarPrimary: 'จองผ่าน LINE',
      sidebarMicrocopy:
        'ทัก LINE เพื่อเช็กราคา ที่นั่งว่าง และความเหมาะสมของคอร์ส',
      sidebarBadge: 'สอบถามก่อนตัดสินใจ',
      midTitle: 'สนใจก่อนลงทะเบียน?',
      midDescription:
        'คอร์ส Onsite สำหรับผู้ที่ต้องการเรียนแบบลงมือทำจริง ทัก LINE เพื่อสอบถามความเหมาะสมของคอร์ส เนื้อหา ราคา และที่นั่งว่างได้',
      midPrimary: 'แอด LINE เพื่อสอบถาม',
      bottomPrimary: 'สอบถามผ่าน LINE ก่อน',
      bottomDescription:
        'เหมาะสำหรับผู้ที่อยากเช็กความเหมาะสม ราคา และที่นั่งก่อนตัดสินใจ',
      registerLabel: 'ลงทะเบียนทันที',
    };
  }

  return {
    heroPrimary: 'Ask or Reserve via LINE',
    heroSecondary: 'Register Now',
    heroMicrocopy:
      'Not fully sure yet? Ask about the course, pricing, and seat availability via LINE.',
    heroBadge: 'Fast reply',
    sidebarPrimary: 'Reserve via LINE',
    sidebarMicrocopy:
      'Chat with us on LINE for seat availability and course details.',
    sidebarBadge: 'Ask before you decide',
    midTitle: 'Interested before registering?',
    midDescription:
      'This onsite course is designed for hands-on learners. You can chat with us on LINE to ask about fit, syllabus, pricing, and seat availability before registering.',
    midPrimary: 'Add LINE to Ask',
    bottomPrimary: 'Ask via LINE First',
    bottomDescription:
      'Best for learners who want a little more detail before making a purchase decision.',
    registerLabel: 'Register Now',
  };
};
