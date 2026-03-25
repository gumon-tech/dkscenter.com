import React, { useEffect } from 'react';
import Image from 'next/image';
import Container from './container';
import Breadcrumb from './breadcrumb';
import CourseDetailLink from './courseDetailLink';
import { normalizeBrand } from '/lib/brand';
import {
  trackBeginCheckout,
  trackOutboundClick,
  trackViewItem,
} from '/lib/gtm';
import { useRouter } from 'next/router';
import {
  buildForwardedUrl,
  getLineCtaCopy,
  getPrimarySchedule,
  isLinePrimaryCourse,
  registerSecondaryButtonClass,
} from '/lib/courses/cta';
import {
  formatCourseDateRange,
  formatCourseDateTime,
  formatScheduleMeta,
  formatCourseTime,
} from '/lib/courses/formatters';
import LineContactButton from './course/line-contact-button';
import CourseSectionShell from './course/course-section-shell';
import CourseListPanel from './course/course-list-panel';
import CourseCurriculum from './course/course-curriculum';
import CourseTrustGrid from './course/course-trust-grid';
import CourseConversionBand from './course/course-conversion-band';

const CourseDetail = ({ courseData, i18next }) => {
  const { t } = i18next;
  const router = useRouter();
  const locale = i18next?.i18n?.language || 'th';
  const isConversionFocusedCourse = isLinePrimaryCourse(courseData);
  const lineCopy = getLineCtaCopy(locale);
  const featuredSchedule = getPrimarySchedule(courseData);
  const scheduleMeta = formatScheduleMeta(featuredSchedule, locale);
  const registerUrl = buildForwardedUrl(
    featuredSchedule?.ticketUrl,
    router.query || {},
  );
  const heroHighlights = [
    courseData?.participantsWillReceive?.[1],
    courseData?.participantsWillReceive?.[5],
    courseData?.participantsWillReceive?.[6],
  ].filter(Boolean);
  const audienceHighlights = (courseData?.whoShouldAttend || []).slice(0, 3);
  const overviewCards = [
    {
      label: locale === 'th' ? 'Format' : 'Format',
      value: locale === 'th' ? 'Onsite Workshop' : 'Onsite Workshop',
    },
    {
      label: locale === 'th' ? 'Organizer' : 'Organizer',
      value: courseData?.brand || 'DKS Center',
    },
    {
      label: locale === 'th' ? 'Course Code' : 'Course Code',
      value: courseData?.code,
    },
  ].filter((item) => item.value);
  const featuredImage = courseData?.imageUrl;
  const scheduleDateRange = featuredSchedule
    ? formatCourseDateRange(
        featuredSchedule.eventStart,
        featuredSchedule.eventEnd,
        locale,
      )
    : null;
  const scheduleTimeRange = featuredSchedule
    ? `${formatCourseTime(featuredSchedule.eventStart, locale)} - ${formatCourseTime(featuredSchedule.eventEnd, locale)}`
    : null;
  const trustItems = [
    {
      title: locale === 'th' ? 'เรียนแบบลงมือทำจริง' : 'Hands-on Learning',
      description:
        locale === 'th'
          ? 'เน้น workshop และการลงมือปฏิบัติ เพื่อให้ผู้เรียนสามารถนำไปใช้ต่อได้จริง'
          : 'A workshop-led format designed for immediate practical application.',
    },
    {
      title:
        locale === 'th'
          ? 'เหมาะกับสาย Developer / DevOps'
          : 'Built for Developers',
      description:
        locale === 'th'
          ? 'เหมาะสำหรับผู้ที่ต้องการต่อยอดระบบ container และ workflow สมัยใหม่'
          : 'Tailored for developers, DevOps engineers, and modern infrastructure teams.',
    },
    {
      title:
        locale === 'th' ? 'สอบถามก่อนตัดสินใจได้' : 'Consult Before You Buy',
      description:
        locale === 'th'
          ? 'ติดต่อผ่าน LINE เพื่อเช็กความเหมาะสม เนื้อหา และที่นั่งว่างก่อนลงทะเบียน'
          : 'Use LINE to ask about fit, syllabus, and seat availability before registering.',
    },
  ];

  useEffect(() => {
    if (!courseData?.title) return;

    const brandOwner = normalizeBrand(courseData?.brand); // brand ใน courses.json (ระดับ locale)

    trackViewItem({
      brandOwner,
      item: {
        item_name: courseData.title,
        item_category: 'course',
        item_id: courseData?.code || courseData?.key,
      },
    });
  }, [courseData?.title, courseData?.code, courseData?.key, courseData?.brand]);

  const onRegisterCtaClick = () => {
    if (!featuredSchedule || !courseData?.title) return;

    const brandOwner = normalizeBrand(courseData?.brand);
    const baseItem = {
      item_name: courseData?.title,
      item_category: 'course',
      item_id: courseData?.code || courseData?.key,
    };

    trackBeginCheckout({
      brandOwner,
      item: baseItem,
      schedule: featuredSchedule,
      linkUrl: registerUrl || '',
    });

    if (registerUrl && /^https?:\/\//.test(registerUrl)) {
      trackOutboundClick({
        brandOwner,
        linkUrl: registerUrl,
        label: 'eventpop_ticket',
      });
    }
  };

  return !courseData ? (
    <Container>
      <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      {t('course-detail-1')}
    </Container>
  ) : (
    <Container
      className={`relative overflow-hidden ${
        isConversionFocusedCourse ? 'pb-32 xl:pb-10' : ''
      }`}
    >
      <Breadcrumb
        paths={[
          { title: 'Training Course', path: '/course' },
          { title: courseData.code, path: `/course/${courseData?.key}` },
        ]}
      />
      <section className="relative mt-4 grid gap-6 xl:mt-6 xl:grid-cols-[minmax(0,1.2fr)_420px] xl:items-start">
        <div className="course-theme-hero relative overflow-hidden rounded-[36px] p-7 sm:p-8 xl:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-10%] top-[-12%] h-56 w-56 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-18%] left-[-5%] h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
                {lineCopy.heroBadge}
              </span>
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-primary-strong">
                {locale === 'th' ? 'เวิร์กชอปเรือธง' : 'Signature workshop'}
              </span>
              {courseData.lastUpdate && (
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft">
                  {t('course-detail-2')}{' '}
                  {formatCourseDateTime(courseData.lastUpdate, locale)}
                </span>
              )}
            </div>

            <h1 className="max-w-4xl text-[3.45rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl xl:text-[3.7rem]">
              {courseData.title}
            </h1>

            <p className="course-contrast-copy mt-5 max-w-[52rem] text-base leading-8 sm:text-lg">
              {courseData.overview}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {scheduleMeta.map((item) => (
                <div
                  key={item.label}
                  className="course-theme-subtle rounded-2xl px-4 py-4 backdrop-blur-sm"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
                    {item.label}
                  </div>
                  <div className="course-contrast-heading mt-2 text-[17px] font-medium leading-7">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LineContactButton
                courseData={courseData}
                label={lineCopy.heroPrimary}
                trackingLabel="hero_line_contact"
                className="w-full sm:w-auto"
              />
              <a
                href={registerUrl || '#course-registration'}
                target={registerUrl ? '_blank' : undefined}
                rel={registerUrl ? 'noreferrer' : undefined}
                onClick={onRegisterCtaClick}
                className={`${registerSecondaryButtonClass} w-full sm:w-auto`}
              >
                {lineCopy.heroSecondary}
              </a>
            </div>

            <p className="course-contrast-copy mt-4 max-w-3xl text-sm leading-7 md:text-base">
              {lineCopy.heroMicrocopy}
            </p>

            <div className="mt-8">
              <div className="course-theme-soft-panel rounded-[30px] p-6 lg:p-7">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
                  {locale === 'th' ? 'Why This Course' : 'Why This Course'}
                </div>
                <div className="mt-5 space-y-4">
                  {heroHighlights.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[24px] border border-border/60 bg-surface/70 px-5 py-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary-strong">
                          0{index + 1}
                        </div>
                        <div className="min-w-0 flex-1 border-l border-border/60 pl-4">
                          <p className="course-copy max-w-3xl text-[1.05rem] leading-8 lg:text-[1.1rem] lg:leading-9">
                            {item}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-strong">
                {locale === 'th' ? 'Hands-on Workshop' : 'Hands-on Workshop'}
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-strong">
                {locale === 'th' ? 'Onsite Training' : 'Onsite Training'}
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-strong">
                {locale === 'th'
                  ? 'Certificate Included'
                  : 'Certificate Included'}
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-strong">
                {locale === 'th' ? 'Developer Focused' : 'Developer Focused'}
              </span>
            </div>
          </div>
        </div>

        {featuredImage && (
          <aside className="course-theme-panel relative overflow-hidden rounded-[32px] p-4 sm:p-5 xl:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {locale === 'th' ? 'Next Session' : 'Next Session'}
                </div>
                <div className="course-heading mt-1 text-lg font-semibold">
                  {scheduleDateRange}
                </div>
              </div>
              <span className="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                {locale === 'th' ? 'Onsite' : 'Onsite'}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-[26px] border border-border/70 bg-background-alt">
              <div className="relative aspect-[5/3] w-full">
                <Image
                  src={featuredImage}
                  alt={courseData.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
                  {locale === 'th' ? 'Quick Facts' : 'Quick Facts'}
                </div>
                <dl className="mt-3 space-y-0">
                  {overviewCards.map((item) => (
                    <div
                      key={item.label}
                      className="border-b border-border/60 py-4 first:pt-1 last:border-b-0 last:pb-1"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                        {item.label}
                      </dt>
                      <dd className="mt-2 text-lg font-semibold leading-7 text-text">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                  {locale === 'th' ? 'Schedule' : 'Schedule'}
                </div>
                <div className="course-copy mt-2 text-sm leading-7">
                  <div>{scheduleDateRange}</div>
                  <div>{scheduleTimeRange}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                  {locale === 'th' ? 'Best For' : 'Best For'}
                </div>
                <ul className="course-copy mt-2 space-y-2 text-sm leading-6">
                  {audienceHighlights.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
          </aside>
        )}
      </section>

      <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
        <div className="min-w-0">
          <CourseSectionShell
            eyebrow={locale === 'th' ? 'Course Overview' : 'Course Overview'}
            title={locale === 'th' ? 'ภาพรวมของคอร์ส' : 'Course Overview'}
          >
            <div className="course-theme-soft-panel rounded-[30px] p-7">
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="course-copy text-base leading-8 lg:text-[17px]">
                    {courseData.overview}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {heroHighlights.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-border/70 bg-surface px-4 py-4 text-sm leading-7 text-muted"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CourseSectionShell>

          <CourseSectionShell
            eyebrow={locale === 'th' ? 'Why Join' : 'Why Join'}
            title={
              locale === 'th'
                ? 'เหตุผลที่คอร์สนี้เหมาะสำหรับการอัปสกิลจริง'
                : 'Why This Course Works for Serious Upskilling'
            }
          >
            <CourseTrustGrid items={trustItems} locale={locale} />
          </CourseSectionShell>

          {isConversionFocusedCourse && (
            <CourseConversionBand
              compact
              locale={locale}
              courseData={courseData}
              title={lineCopy.midTitle}
              description={lineCopy.midDescription}
              primaryLabel={lineCopy.midPrimary}
              secondaryLabel={lineCopy.heroSecondary}
              registerUrl={registerUrl}
              onRegisterClick={onRegisterCtaClick}
              trackingLabel="midpage_line_contact"
            />
          )}

          <div className="grid gap-12">
            {courseData.objectives && courseData.objectives.length > 0 && (
              <CourseSectionShell
                eyebrow={locale === 'th' ? 'Outcomes' : 'Outcomes'}
                title={t('course-detail-3')}
              >
                <CourseListPanel items={courseData.objectives} />
              </CourseSectionShell>
            )}

            {courseData.whoShouldAttend &&
              courseData.whoShouldAttend.length > 0 && (
                <CourseSectionShell
                  eyebrow={locale === 'th' ? 'Audience' : 'Audience'}
                  title={t('course-detail-4')}
                >
                  <CourseListPanel items={courseData.whoShouldAttend} />
                </CourseSectionShell>
              )}

            {courseData.prerequisites &&
              courseData.prerequisites.length > 0 && (
                <CourseSectionShell
                  eyebrow={locale === 'th' ? 'Preparation' : 'Preparation'}
                  title={t('course-detail-5')}
                >
                  <CourseListPanel items={courseData.prerequisites} />
                </CourseSectionShell>
              )}

            {courseData.participantsWillReceive &&
              courseData.participantsWillReceive.length > 0 && (
                <CourseSectionShell
                  eyebrow={locale === 'th' ? 'Included' : 'Included'}
                  title={t('course-detail-6')}
                >
                  <CourseListPanel items={courseData.participantsWillReceive} />
                </CourseSectionShell>
              )}

            {courseData.outline && courseData.outline.length > 0 && (
              <CourseSectionShell
                eyebrow={locale === 'th' ? 'Curriculum' : 'Curriculum'}
                title={t('course-detail-7')}
              >
                <CourseCurriculum outline={courseData.outline} locale={locale} />
              </CourseSectionShell>
            )}
          </div>
        </div>

        <CourseDetailLink
          className="min-w-0"
          courseData={courseData}
          i18next={i18next}
          registerBottom
          sectionId="course-registration"
        />
      </div>

      <div className="mt-8">
        <CourseDetailLink
          className="hidden xl:block"
          courseData={courseData}
          i18next={i18next}
          registerRight
        />
      </div>

      {isConversionFocusedCourse && (
        <CourseConversionBand
          locale={locale}
          courseData={courseData}
          badge={locale === 'th' ? 'Ready To Decide?' : 'Ready To Decide?'}
          title={
            locale === 'th'
              ? 'พร้อมลงทะเบียน หรืออยากสอบถามก่อนตัดสินใจ?'
              : 'Ready to register, or do you want to ask a few questions first?'
          }
          description={
            locale === 'th'
              ? 'ทัก LINE เพื่อเช็กความเหมาะสมของคอร์ส รายละเอียดเนื้อหา และที่นั่งว่าง หรือกดลงทะเบียนได้ทันทีหากคุณพร้อมเรียนในรอบนี้'
              : 'Use LINE to check course fit, content details, and seat availability, or register immediately if you are ready for this session.'
          }
          primaryLabel={lineCopy.bottomPrimary}
          secondaryLabel={lineCopy.heroSecondary}
          registerUrl={registerUrl}
          onRegisterClick={onRegisterCtaClick}
          trackingLabel="final_line_contact"
        />
      )}

      {isConversionFocusedCourse && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-surface-glass px-4 py-3 shadow-floating backdrop-blur-2xl xl:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-2">
            <LineContactButton
              courseData={courseData}
              label={lineCopy.heroPrimary}
              trackingLabel="sticky_line_contact"
              className="w-full"
            />
            <a
              href={registerUrl || '#course-registration'}
              target={registerUrl ? '_blank' : undefined}
              rel={registerUrl ? 'noreferrer' : undefined}
              onClick={onRegisterCtaClick}
              className={`${registerSecondaryButtonClass} w-full`}
            >
              {lineCopy.heroSecondary}
            </a>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CourseDetail;
