import { defaultLocale, locales, normalizeLocale } from '../i18n/config';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../content/site';
import {
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildItemListSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from './schema';

const MAX_DESCRIPTION_LENGTH = 160;

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function trimText(value, maxLength = MAX_DESCRIPTION_LENGTH) {
  const text = cleanText(value);
  if (!text || text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened).trim()}…`;
}

function withLeadingSlash(path = '') {
  if (!path || path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function buildLocalizedPath(locale, path = '') {
  const safeLocale = normalizeLocale(locale);
  const normalizedPath = withLeadingSlash(path);
  return `/${safeLocale}${normalizedPath}`;
}

export function buildAbsoluteUrl(path = '') {
  const normalizedPath = path ? withLeadingSlash(path) : '';
  return `${SITE_URL}${normalizedPath}`;
}

export function toAbsoluteImageUrl(image) {
  if (!image) return `${SITE_URL}/img/main_img.jpg`;
  if (String(image).startsWith('http')) return image;
  return buildAbsoluteUrl(image);
}

export function buildAlternates(path = '', availableLocales = locales) {
  const safeLocales = availableLocales.filter((locale) => locales.includes(locale));

  return {
    languages: Object.fromEntries(
      safeLocales.map((locale) => [
        locale,
        buildAbsoluteUrl(buildLocalizedPath(locale, path)),
      ]),
    ),
    xDefault: buildAbsoluteUrl(buildLocalizedPath(defaultLocale, path)),
  };
}

function joinDescriptionParts(parts) {
  return trimText(
    parts
      .map((part) => cleanText(part))
      .filter(Boolean)
      .join(' '),
  );
}

function getPrimaryAudience(course) {
  return course?.whoShouldAttend?.[0] || course?.audience?.[0] || '';
}

export function buildCourseMetaDescription(course, locale = 'en') {
  const intro = cleanText(course?.overview || '');
  const duration = cleanText(course?.duration || '');
  const audience = cleanText(getPrimaryAudience(course));

  if (locale === 'th') {
    return joinDescriptionParts([
      intro,
      duration ? `ระยะเวลา ${duration}` : '',
      audience ? `เหมาะสำหรับ ${audience}` : '',
    ]);
  }

  return joinDescriptionParts([
    intro,
    duration ? `Duration: ${duration}.` : '',
    audience ? `Best for ${audience}.` : '',
  ]);
}

function buildTitle(title) {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}

function createSeoConfig({
  locale,
  path,
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  canonicalPath,
  availableLocales = locales,
  structuredData = [],
}) {
  const safeLocale = normalizeLocale(locale);
  const preferredPath = canonicalPath || path || '';
  const canonical = buildAbsoluteUrl(buildLocalizedPath(safeLocale, preferredPath));

  return {
    locale: safeLocale,
    title: buildTitle(title),
    description: trimText(description || SITE_DESCRIPTION),
    canonical,
    image: toAbsoluteImageUrl(image),
    type,
    noindex,
    alternates: buildAlternates(preferredPath, availableLocales),
    structuredData: structuredData.filter(Boolean),
  };
}

export function getHomePageSeo(locale, courses = []) {
  const isThai = normalizeLocale(locale) === 'th';
  const path = '';
  const title = isThai
    ? 'คอร์สอบรมเทคโนโลยีเชิงปฏิบัติสำหรับทีมและนักพัฒนา'
    : 'Practical Tech Training Courses for Engineers and Teams';
  const description = isThai
    ? 'DKS Center รวมคอร์สอบรมเทคโนโลยีเชิงปฏิบัติสำหรับนักพัฒนา วิศวกร และทีมดิจิทัล พร้อมหลักสูตรที่เน้น workshop การใช้งานจริง และตารางอบรมที่อัปเดตสม่ำเสมอ'
    : 'DKS Center delivers practical technology training for developers, engineers, and digital teams with hands-on workshops, bilingual course pages, and regularly updated public training schedules.';

  const courseItems = courses.map((course) => ({
    name: course.title,
    path: buildLocalizedPath(locale, `/course/${course.key}`),
  }));

  return createSeoConfig({
    locale,
    path,
    title,
    description,
    image: '/img/main_img.jpg',
    structuredData: [
      buildOrganizationSchema(locale),
      buildWebSiteSchema(locale),
      buildItemListSchema(courseItems, 'Course'),
    ],
  });
}

export function getCourseListingSeo(locale, courses = []) {
  const isThai = normalizeLocale(locale) === 'th';
  const title = isThai
    ? 'หลักสูตรอบรมเทคโนโลยีและเวิร์กชอปทั้งหมด'
    : 'Technology Training Courses and Workshops';
  const description = isThai
    ? 'สำรวจหลักสูตรอบรมของ DKS Center ทั้งด้าน software engineering, cloud, data และ AI พร้อมรายละเอียดคอร์ส ตารางอบรม และลิงก์ไปยังหน้าคอร์สภาษาไทยและอังกฤษ'
    : 'Explore DKS Center training courses across software engineering, cloud, data, and AI with localized detail pages, practical outlines, and direct paths to course schedules.';

  const breadcrumbs = [
    { name: isThai ? 'หน้าแรก' : 'Home', path: buildLocalizedPath(locale) },
    { name: isThai ? 'คอร์ส' : 'Courses', path: buildLocalizedPath(locale, '/course') },
  ];

  const courseItems = courses.map((course) => ({
    name: course.title,
    path: buildLocalizedPath(locale, `/course/${course.key}`),
  }));

  return createSeoConfig({
    locale,
    path: '/course',
    title,
    description,
    structuredData: [
      buildBreadcrumbSchema(breadcrumbs),
      buildItemListSchema(courseItems, 'Course'),
    ],
  });
}

export function getSchedulePageSeo(locale, courses = []) {
  const isThai = normalizeLocale(locale) === 'th';
  const title = isThai
    ? 'ตารางอบรมและรอบเรียนทั้งหมด'
    : 'Training Schedule and Upcoming Course Sessions';
  const description = isThai
    ? 'ติดตามตารางอบรมของ DKS Center เพื่อดูรอบเรียนที่เปิดรับ วันที่จัดอบรม ระยะเวลา และคอร์สที่เปิดลงทะเบียนในแต่ละช่วงเวลา'
    : 'Review the DKS Center training calendar to compare upcoming course sessions, dates, formats, and currently open public training rounds.';

  const breadcrumbs = [
    { name: isThai ? 'หน้าแรก' : 'Home', path: buildLocalizedPath(locale) },
    { name: isThai ? 'ตารางอบรม' : 'Schedule', path: buildLocalizedPath(locale, '/schedule') },
  ];

  const scheduleItems = courses.map((course) => ({
    name: course.title,
    path: buildLocalizedPath(locale, `/course/${course.key}`),
  }));

  return createSeoConfig({
    locale,
    path: '/schedule',
    title,
    description,
    structuredData: [
      buildBreadcrumbSchema(breadcrumbs),
      buildItemListSchema(scheduleItems, 'Course'),
    ],
  });
}

export function getAboutPageSeo(locale) {
  const isThai = normalizeLocale(locale) === 'th';

  return createSeoConfig({
    locale,
    path: '/about-us',
    title: isThai ? 'เกี่ยวกับ DKS Center และช่องทางติดต่อ' : 'About DKS Center and Contact Channels',
    description: isThai
      ? 'รู้จัก DKS Center เพิ่มเติม พร้อมช่องทางติดต่อสำหรับสอบถามคอร์ส ราคา รอบเรียน การอบรม private และ in-house training'
      : 'Learn more about DKS Center and find the best contact channel for course inquiries, pricing, upcoming cohorts, private sessions, and in-house training.',
    image: '/img/assistant1.jpg',
    structuredData: [
      buildBreadcrumbSchema([
        { name: isThai ? 'หน้าแรก' : 'Home', path: buildLocalizedPath(locale) },
        { name: isThai ? 'เกี่ยวกับเรา' : 'About Us', path: buildLocalizedPath(locale, '/about-us') },
      ]),
      buildOrganizationSchema(locale),
    ],
  });
}

export function getPrivacyPageSeo(locale) {
  const isThai = normalizeLocale(locale) === 'th';

  return createSeoConfig({
    locale,
    path: '/privacy',
    title: isThai ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy',
    description: isThai
      ? 'อ่านนโยบายความเป็นส่วนตัวของ DKS Center และ Gumon Technology เพื่อทำความเข้าใจแนวทางการเก็บ ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคล'
      : 'Read the DKS Center and Gumon Technology privacy policy for a clear overview of how personal data is collected, used, disclosed, and protected.',
    structuredData: [
      buildBreadcrumbSchema([
        { name: isThai ? 'หน้าแรก' : 'Home', path: buildLocalizedPath(locale) },
        { name: isThai ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy', path: buildLocalizedPath(locale, '/privacy') },
      ]),
    ],
  });
}

export function getOrderPageSeo(locale, mode = 'success') {
  const isThai = normalizeLocale(locale) === 'th';
  const isSuccess = mode === 'success';

  return createSeoConfig({
    locale,
    path: isSuccess ? '/order/success' : '/order/cancel',
    title: isSuccess
      ? isThai
        ? 'สถานะคำสั่งซื้อ'
        : 'Order Status'
      : isThai
        ? 'สถานะการชำระเงิน'
        : 'Payment Status',
    description: isThai
      ? 'หน้าสรุปสถานะคำสั่งซื้อสำหรับผู้ลงทะเบียนอบรม'
      : 'Order status summary page for training registrations.',
    noindex: true,
    availableLocales: locales,
  });
}

export function getCoursePageSeo(course, locale) {
  const isThai = normalizeLocale(locale) === 'th';
  const title = isThai
    ? `${course.title} คอร์สอบรมโดย DKS Center`
    : `${course.title} Training Course`;
  const description = buildCourseMetaDescription(course, locale);
  const breadcrumbs = [
    { name: isThai ? 'หน้าแรก' : 'Home', path: buildLocalizedPath(locale) },
    { name: isThai ? 'คอร์ส' : 'Courses', path: buildLocalizedPath(locale, '/course') },
    { name: course.title, path: buildLocalizedPath(locale, `/course/${course.key}`) },
  ];

  return createSeoConfig({
    locale,
    path: `/course/${course.key}`,
    title,
    description,
    image: course.imageUrl,
    type: 'article',
    structuredData: [
      buildBreadcrumbSchema(breadcrumbs),
      buildCourseSchema(course, locale),
    ],
  });
}

export function getCourseScheduleIndexSeo(course, locale) {
  const isThai = normalizeLocale(locale) === 'th';

  return createSeoConfig({
    locale,
    path: `/course/${course.key}/schedule`,
    canonicalPath: `/course/${course.key}`,
    title: isThai ? `${course.title} ตารางอบรม` : `${course.title} Schedule`,
    description: buildCourseMetaDescription(course, locale),
    image: course.imageUrl,
    noindex: true,
  });
}

export function getCourseSessionSeo(course, schedule, locale) {
  const isThai = normalizeLocale(locale) === 'th';
  const title = schedule?.title || course?.title;
  const sessionDescription = isThai
    ? `${course.title} รอบอบรม ${title}`
    : `${course.title} session: ${title}`;

  return createSeoConfig({
    locale,
    path: `/course/${course.key}/schedule/${schedule.scheduleKey}`,
    canonicalPath: `/course/${course.key}`,
    title,
    description: trimText(`${sessionDescription}. ${buildCourseMetaDescription(course, locale)}`),
    image: course.imageUrl,
    noindex: true,
  });
}

export function getLegacyRedirectSeo(path = '') {
  const canonicalPath = buildLocalizedPath(defaultLocale, path);

  return {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    canonical: buildAbsoluteUrl(canonicalPath),
    image: toAbsoluteImageUrl('/img/main_img.jpg'),
    type: 'website',
    noindex: true,
    locale: defaultLocale,
    alternates: buildAlternates(path),
    structuredData: [],
  };
}
