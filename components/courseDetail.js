import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  AcademicCapIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
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
  isLinePrimaryCourse,
  registerSecondaryButtonClass,
} from '/lib/courses/cta';
import {
  formatCourseDateRange,
  formatCourseDateTime,
  formatCourseTime,
} from '/lib/courses/formatters';
import {
  getPrimaryDisplaySessionData,
  getSessionDeliveryLabel,
  hasAnySessions,
  isSessionRegistrationOpen,
} from '/lib/courses/sessions';
import LineContactButton from './course/line-contact-button';
import CourseSectionShell from './course/course-section-shell';
import CourseListPanel from './course/course-list-panel';
import CourseCurriculum from './course/course-curriculum';
import CourseTrustGrid from './course/course-trust-grid';
import CourseConversionBand from './course/course-conversion-band';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

function HeroSnapshotPanel({
  locale,
  courseData,
  featuredImage,
  scheduleDateRange,
  scheduleTimeRange,
  featuredSchedule,
  featuredScheduleState,
  featuredDeliveryLabel,
  facts,
  lineCopy,
  registerUrl,
  canShowRegisterCta,
  onRegisterCtaClick,
  audienceHighlights,
  compact = false,
}) {
  return (
    <aside
      className={cx(
        'course-theme-panel relative overflow-hidden rounded-[30px] p-5 sm:p-6',
        compact ? 'xl:hidden' : 'hidden xl:block xl:sticky xl:top-24',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-primary/15 blur-3xl"
      />

      {featuredImage && !compact ? (
        <div className="relative overflow-hidden rounded-[26px] border border-border/60 bg-background-alt">
          <div className="relative aspect-[5/4] w-full">
            <Image
              src={featuredImage}
              alt={courseData.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div
        className={cx('relative z-10', featuredImage && !compact ? 'mt-5' : '')}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
              {locale === 'th' ? 'ข้อมูลคอร์ส' : 'Course Snapshot'}
            </div>
            <h2 className="course-contrast-heading mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
              {scheduleDateRange ||
                (locale === 'th'
                  ? 'ตารางเรียนอัปเดตล่าสุด'
                  : 'Latest course availability')}
            </h2>
          </div>
          {featuredDeliveryLabel ? (
            <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
              {featuredDeliveryLabel}
            </span>
          ) : null}
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          {facts.map((item) => (
            <div
              key={item.label}
              className="border-t border-border/50 pt-4 first:border-t-0 first:pt-0"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                {item.label}
              </dt>
              <dd className="mt-2 text-base font-semibold leading-7 text-text">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {featuredSchedule ? (
          <div className="theme-overlay-card mt-6 rounded-[24px] px-4 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-strong">
              {featuredScheduleState === 'past'
                ? locale === 'th'
                  ? 'รอบล่าสุด'
                  : 'Latest Session'
                : locale === 'th'
                  ? 'รอบถัดไป'
                  : 'Next Session'}
            </div>
            <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
              <div className="flex items-start gap-3">
                <CalendarDaysIcon className="mt-0.5 h-5 w-5 text-primary" />
                <span>{scheduleDateRange}</span>
              </div>
              {scheduleTimeRange ? (
                <div className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <span>{scheduleTimeRange}</span>
                </div>
              ) : null}
              {featuredSchedule.location ? (
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 text-primary" />
                  {featuredSchedule.locationUrl ? (
                    <a
                      href={featuredSchedule.locationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-strong"
                    >
                      {featuredSchedule.location}
                    </a>
                  ) : (
                    <span>{featuredSchedule.location}</span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {compact && audienceHighlights.length > 0 ? (
          <div className="mt-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
              {locale === 'th' ? 'Best For' : 'Best For'}
            </div>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-muted">
              {audienceHighlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {compact && canShowRegisterCta ? (
          <div className="mt-7 flex flex-col gap-3">
            <LineContactButton
              courseData={courseData}
              label={lineCopy.heroPrimary}
              trackingLabel="mobile_snapshot_line_contact"
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
        ) : null}
      </div>
    </aside>
  );
}

const CourseDetail = ({ courseData, i18next }) => {
  const { t } = i18next;
  const router = useRouter();
  const locale = i18next?.i18n?.language || 'th';
  const isConversionFocusedCourse = isLinePrimaryCourse(courseData);
  const lineCopy = getLineCtaCopy(locale);
  const { session: featuredSchedule, displayState: featuredScheduleState } =
    getPrimaryDisplaySessionData(courseData);
  const hasSessionData = hasAnySessions(courseData);
  const featuredDeliveryLabel = getSessionDeliveryLabel(featuredSchedule, locale);
  const canShowRegisterCta =
    featuredScheduleState === 'upcoming' &&
    isSessionRegistrationOpen(featuredSchedule);
  const registerUrl = buildForwardedUrl(
    canShowRegisterCta ? featuredSchedule?.ticketUrl : '',
    router.query || {},
  );
  const heroHighlights = [
    courseData?.participantsWillReceive?.[1],
    courseData?.participantsWillReceive?.[5],
    courseData?.participantsWillReceive?.[6],
  ]
    .filter(Boolean)
    .slice(0, 3);
  const audienceHighlights = (courseData?.whoShouldAttend || []).slice(0, 3);
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

  const overviewFacts = [
    {
      label: locale === 'th' ? 'Format' : 'Format',
      value: featuredDeliveryLabel,
    },
    {
      label: locale === 'th' ? 'Duration' : 'Duration',
      value: courseData?.duration,
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

  const trustItems = [
    {
      title: locale === 'th' ? 'เรียนแบบลงมือทำจริง' : 'Hands-on by design',
      description:
        locale === 'th'
          ? 'ทุกช่วงถูกออกแบบให้ต่อจากภาพรวมไปสู่การลงมือทำจริง เพื่อให้ผู้เรียนกลับไปใช้ต่อได้เร็ว'
          : 'The course moves from principles to practical execution, so learners can apply it immediately after class.',
    },
    {
      title:
        locale === 'th'
          ? 'เนื้อหาจัดลำดับเพื่อคนทำงานจริง'
          : 'Structured for working teams',
      description:
        locale === 'th'
          ? 'จัดลำดับหัวข้อให้เข้าใจง่ายขึ้น ลดความล้าจากเนื้อหาหนัก และช่วยให้จับประเด็นสำคัญได้ไว'
          : 'Topics are sequenced to reduce cognitive overload and help teams identify the most important takeaways quickly.',
    },
    {
      title:
        locale === 'th'
          ? 'ตัดสินใจก่อนซื้อได้อย่างมั่นใจ'
          : 'A clearer decision path',
      description:
        locale === 'th'
          ? 'มีทั้งช่องทางสอบถามและลงทะเบียนที่ชัดเจนในจังหวะสำคัญของหน้า เพื่อช่วยให้ตัดสินใจได้ง่ายขึ้น'
          : 'Consultation and registration are placed at the right moments, creating a more confident conversion path.',
    },
  ];

  useEffect(() => {
    if (!courseData?.title) return;

    const brandOwner = normalizeBrand(courseData?.brand);

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
    if (!featuredSchedule || !courseData?.title || !canShowRegisterCta) return;

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

  if (!courseData) {
    return (
      <Container>
        <Breadcrumb
          homeLabel={locale === 'th' ? 'หน้าแรก' : 'Home'}
          paths={[
            {
              title: locale === 'th' ? 'คอร์ส' : 'Courses',
              path: '/course',
            },
          ]}
        />
        {t('course-detail-1')}
      </Container>
    );
  }

  return (
    <Container
      className={`relative overflow-hidden ${
        isConversionFocusedCourse ? 'pb-32 xl:pb-16' : 'pb-16'
      }`}
    >
      <Breadcrumb
        homeLabel={locale === 'th' ? 'หน้าแรก' : 'Home'}
        paths={[
          {
            title: locale === 'th' ? 'คอร์ส' : 'Courses',
            path: '/course',
          },
          { title: courseData.code, path: `/course/${courseData?.key}` },
        ]}
      />

      <section className="relative mt-4 lg:mt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_360px] xl:items-start">
          <div className="course-theme-hero relative overflow-hidden rounded-[36px] px-6 py-7 sm:px-8 sm:py-9 xl:px-10 xl:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-10%] top-[-12%] h-56 w-56 rounded-full bg-primary/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-18%] left-[-5%] h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
                  {lineCopy.heroBadge}
                </span>
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
                  {locale === 'th' ? 'เวิร์กชอปเรือธง' : 'Signature workshop'}
                </span>
                {courseData.lastUpdate ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-soft">
                    {t('course-detail-2')}{' '}
                    {formatCourseDateTime(courseData.lastUpdate, locale)}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 max-w-4xl">
                <h1 className="course-contrast-heading max-w-[16ch] text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl xl:max-w-[18ch] xl:text-[4.2rem]">
                  {courseData.title}
                </h1>
                <p className="course-contrast-copy mt-5 max-w-[44rem] text-base leading-8 sm:text-[1.05rem]">
                  {courseData.overview}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <LineContactButton
                    courseData={courseData}
                    label={lineCopy.heroPrimary}
                    trackingLabel="hero_line_contact"
                    className="w-full sm:w-auto"
                  />
                  {canShowRegisterCta ? (
                    <a
                      href={registerUrl || '#course-registration'}
                      target={registerUrl ? '_blank' : undefined}
                      rel={registerUrl ? 'noreferrer' : undefined}
                      onClick={onRegisterCtaClick}
                      className={`${registerSecondaryButtonClass} w-full sm:w-auto`}
                    >
                      {lineCopy.heroSecondary}
                    </a>
                  ) : null}
                </div>
                <p className="course-contrast-copy max-w-2xl text-sm leading-7">
                  {featuredScheduleState === 'past'
                    ? t('course-detail-20')
                    : !hasSessionData
                      ? t('course-detail-17')
                      : lineCopy.heroMicrocopy}
                </p>
                {featuredScheduleState === 'past' || !hasSessionData ? (
                  <p className="course-contrast-copy max-w-2xl text-sm leading-7">
                    {featuredScheduleState === 'past'
                      ? t('course-detail-21')
                      : t('course-detail-18')}
                  </p>
                ) : null}
              </div>

              {heroHighlights.length > 0 ? (
                <div className="theme-hero-divider mt-8 border-t pt-6 xl:mt-auto xl:pt-7">
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
                    {locale === 'th' ? 'จุดเด่นของคอร์ส' : 'Why This Course'}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {heroHighlights.map((item, index) => (
                      <article
                        key={index}
                        className="theme-overlay-card rounded-[24px] px-4 py-4 backdrop-blur-sm"
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                          {locale === 'th'
                            ? `จุดเด่น 0${index + 1}`
                            : `Highlight 0${index + 1}`}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {item}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 xl:hidden">
                <HeroSnapshotPanel
                  compact
                  locale={locale}
                  courseData={courseData}
                  featuredImage={featuredImage}
                  scheduleDateRange={scheduleDateRange}
                  scheduleTimeRange={scheduleTimeRange}
                  featuredSchedule={featuredSchedule}
                  featuredScheduleState={featuredScheduleState}
                  featuredDeliveryLabel={featuredDeliveryLabel}
                  facts={overviewFacts}
                  lineCopy={lineCopy}
                  registerUrl={registerUrl}
                  canShowRegisterCta={canShowRegisterCta}
                  onRegisterCtaClick={onRegisterCtaClick}
                  audienceHighlights={audienceHighlights}
                />
              </div>
            </div>
          </div>

          <HeroSnapshotPanel
            locale={locale}
            courseData={courseData}
            featuredImage={featuredImage}
            scheduleDateRange={scheduleDateRange}
            scheduleTimeRange={scheduleTimeRange}
            featuredSchedule={featuredSchedule}
            featuredScheduleState={featuredScheduleState}
            featuredDeliveryLabel={featuredDeliveryLabel}
            facts={overviewFacts}
            lineCopy={lineCopy}
            registerUrl={registerUrl}
            canShowRegisterCta={canShowRegisterCta}
            onRegisterCtaClick={onRegisterCtaClick}
            audienceHighlights={audienceHighlights}
          />
        </div>
      </section>

      <div className="mt-section-sm space-y-section-sm lg:mt-section lg:space-y-section">
        <CourseSectionShell
          eyebrow={locale === 'th' ? 'จุดเด่นของคอร์ส' : 'Why This Course'}
          title={
            locale === 'th'
              ? 'คอร์สนี้ออกแบบมาเพื่อให้เรียนแล้วนำไปใช้ต่อได้จริง'
              : 'Why this course is worth learning'
          }
          description={
            locale === 'th'
              ? 'สรุปเหตุผลสำคัญที่ทำให้คอร์สนี้เหมาะกับคนที่ต้องการอัปสกิลอย่างจริงจังและต่อยอดงานได้ทันที'
              : 'A quick overview of the key reasons this course works well for learners who want practical, job-ready skills.'
          }
        >
          <CourseTrustGrid items={trustItems} locale={locale} />
        </CourseSectionShell>

        {courseData.objectives && courseData.objectives.length > 0 ? (
          <CourseSectionShell
            eyebrow={
              locale === 'th' ? 'Learning Outcomes' : 'Learning Outcomes'
            }
            title={t('course-detail-3')}
            description={
              locale === 'th'
                ? 'สิ่งที่คุณจะเข้าใจและนำไปใช้ต่อได้หลังจบคอร์ส สรุปเป็นรายการที่อ่านเร็วและเห็นภาพชัด'
                : 'A clear summary of what you will understand and be able to apply after the course.'
            }
            meta={
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
                <AcademicCapIcon className="h-4 w-4" />
                <span>
                  {courseData.objectives.length}{' '}
                  {locale === 'th' ? 'เป้าหมายการเรียนรู้' : 'learning goals'}
                </span>
              </div>
            }
          >
            <div className="space-y-8">
              <CourseListPanel items={courseData.objectives} columns={2} />

              {courseData.participantsWillReceive &&
              courseData.participantsWillReceive.length > 0 ? (
                <div className="theme-overlay-card rounded-[28px] px-5 py-5 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                        {locale === 'th' ? 'Included' : 'Included'}
                      </div>
                      <h3 className="course-contrast-heading mt-2 text-xl font-semibold tracking-[-0.03em]">
                        {t('course-detail-6')}
                      </h3>
                    </div>
                    <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                      {courseData.participantsWillReceive.length}{' '}
                      {locale === 'th' ? 'รายการ' : 'items'}
                    </span>
                  </div>
                  <div className="mt-5">
                    <CourseListPanel
                      items={courseData.participantsWillReceive}
                      columns={2}
                      compact
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </CourseSectionShell>
        ) : null}

        {courseData.whoShouldAttend?.length ||
        courseData.prerequisites?.length ? (
          <CourseSectionShell
            eyebrow={
              locale === 'th' ? 'Fit & Preparation' : 'Fit & Preparation'
            }
            title={
              locale === 'th'
                ? 'เหมาะกับใคร และควรเตรียมตัวอย่างไรก่อนเข้าร่วม'
                : 'Who should join, and what should they prepare beforehand'
            }
            description={
              locale === 'th'
                ? 'ดูได้ชัดเจนว่าคอร์สนี้เหมาะกับใคร และควรมีพื้นฐานอะไรบ้างก่อนเข้าเรียน'
                : 'See at a glance who this course is for and what background is recommended before joining.'
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {courseData.whoShouldAttend &&
              courseData.whoShouldAttend.length > 0 ? (
                <section className="theme-overlay-card rounded-[28px] px-5 py-5 sm:px-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-strong">
                    {locale === 'th' ? 'Who Should Join' : 'Who Should Join'}
                  </div>
                  <h3 className="course-contrast-heading mt-2 text-xl font-semibold tracking-[-0.03em]">
                    {t('course-detail-4')}
                  </h3>
                  <div className="mt-5">
                    <CourseListPanel
                      items={courseData.whoShouldAttend}
                      compact
                    />
                  </div>
                </section>
              ) : null}

              {courseData.prerequisites &&
              courseData.prerequisites.length > 0 ? (
                <section className="theme-overlay-card rounded-[28px] px-5 py-5 sm:px-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                    {locale === 'th' ? 'Prerequisites' : 'Prerequisites'}
                  </div>
                  <h3 className="course-contrast-heading mt-2 text-xl font-semibold tracking-[-0.03em]">
                    {t('course-detail-5')}
                  </h3>
                  <div className="mt-5">
                    <CourseListPanel items={courseData.prerequisites} compact />
                  </div>
                </section>
              ) : null}
            </div>
          </CourseSectionShell>
        ) : null}

        {courseData.outline && courseData.outline.length > 0 ? (
          <CourseSectionShell
            eyebrow={locale === 'th' ? 'Curriculum' : 'Curriculum'}
            title={t('course-detail-7')}
            description={
              locale === 'th'
                ? 'โครงสร้างเนื้อหาถูกแบ่งเป็นโมดูล เพื่อให้ดูภาพรวมได้ง่ายและเลือกเปิดอ่านรายละเอียดในส่วนที่สนใจ'
                : 'The curriculum is organized into modules so you can scan the overall structure first, then open the details you care about.'
            }
            meta={
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                <SparklesIcon className="h-4 w-4" />
                <span>
                  {courseData.outline.length}{' '}
                  {locale === 'th' ? 'โมดูลการเรียน' : 'modules'}
                </span>
              </div>
            }
          >
            <CourseCurriculum outline={courseData.outline} locale={locale} />
          </CourseSectionShell>
        ) : null}

        <CourseSectionShell
          eyebrow={
            locale === 'th'
              ? 'รอบอบรมและการลงทะเบียน'
              : 'Schedule & Registration'
          }
          title={t('course-detail-9')}
          description={
            locale === 'th'
              ? 'ตรวจสอบรอบอบรม วันที่ เวลา สถานที่ และรายละเอียดการลงทะเบียนได้ในส่วนเดียว'
              : 'Review upcoming sessions, key logistics, and registration details in one place.'
          }
        >
          <div className="space-y-6">
            {/* {isConversionFocusedCourse ? (
              <CourseInlineCta
                courseData={courseData}
                lineCopy={lineCopy}
                featuredRegisterUrl={registerUrl}
                onRegisterClick={onRegisterCtaClick}
              />
            ) : null} */}

            <CourseDetailLink
              className="min-w-0"
              courseData={courseData}
              i18next={i18next}
              sectionId="course-registration"
            />
          </div>
        </CourseSectionShell>
      </div>

      {isConversionFocusedCourse ? (
        <CourseConversionBand
          locale={locale}
          courseData={courseData}
          badge={locale === 'th' ? 'พร้อมเริ่มแล้วหรือยัง' : 'Ready To Decide?'}
          title={
            locale === 'th'
              ? 'พร้อมลงทะเบียน หรืออยากคุยรายละเอียดก่อน'
              : 'Ready to ask a final question, or ready to secure your seat'
          }
          description={
            locale === 'th'
              ? 'หากอยากเช็กความเหมาะสมของคอร์สก่อนตัดสินใจ สามารถทักมาสอบถามผ่าน LINE ได้ทันที หรือหากพร้อมแล้วก็ลงทะเบียนรอบนี้ได้เลย'
              : 'Choose the path that matches your confidence level. Ask via LINE if you want to confirm fit, or register immediately if this session is right for you.'
          }
          primaryLabel={lineCopy.bottomPrimary}
          secondaryLabel={lineCopy.heroSecondary}
          registerUrl={registerUrl}
          canShowRegisterCta={canShowRegisterCta}
          onRegisterClick={onRegisterCtaClick}
          trackingLabel="final_line_contact"
        />
      ) : null}

      {isConversionFocusedCourse && canShowRegisterCta ? (
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
      ) : null}
    </Container>
  );
};

export default CourseDetail;
