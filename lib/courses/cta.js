import { getPrimaryDisplaySessionData } from './sessions';

export const LINE_CONTACT_URL = 'https://lin.ee/xyZvMd2';
export const LINE_PRIMARY_COURSE_KEY =
  '2025-001-orchestrate-docker-kubernetes-bootcamp';

export const linePrimaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-secondary/25 bg-secondary px-5 py-3 text-sm font-semibold text-background shadow-[0_22px_60px_-28px_rgba(79,209,197,0.42)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-secondary/25';

export const registerSecondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-surface-elevated px-5 py-3 text-sm font-semibold text-text transition hover:border-primary/30 hover:bg-surface hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/15';

export const registerScheduleButtonClass =
  'inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_22px_50px_-28px_rgba(36,88,255,0.48)] transition hover:bg-primary-strong focus:outline-none focus:ring-4 focus:ring-primary/20';

export const isLinePrimaryCourse = (courseData) =>
  courseData?.key === LINE_PRIMARY_COURSE_KEY;

export const getPrimarySchedule = (courseData) => {
  return getPrimaryDisplaySessionData(courseData).session;
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
