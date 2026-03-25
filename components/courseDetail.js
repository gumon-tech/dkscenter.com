import React, { useEffect } from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';
import dayjs from 'dayjs';
import CourseDetailLink from './courseDetailLink';
import { normalizeBrand } from '/lib/brand';
import {
  trackBeginCheckout,
  trackOutboundClick,
  trackViewItem,
} from '/lib/gtm';
import { useRouter } from 'next/router';
import {
  LineContactButton,
  buildForwardedUrl,
  formatScheduleMeta,
  getLineCtaCopy,
  getPrimarySchedule,
  isLinePrimaryCourse,
  registerSecondaryButtonClass,
} from './courseConversionCta';

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
    <Container className={isConversionFocusedCourse ? 'pb-32 xl:pb-8' : ''}>
      {isConversionFocusedCourse && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.08),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.10),_transparent_28%)]"
        />
      )}
      <Breadcrumb
        paths={[
          { title: 'Training Course', path: '/course' },
          { title: courseData.code, path: `/course/${courseData?.key}` },
        ]}
      />
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-gray-900 lg:mt-5 lg:text-5xl dark:text-white">
        {courseData.title}
      </h2>
      {courseData.lastUpdate && (
        <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-400">
          {t('course-detail-2')}{' '}
          {dayjs(courseData.lastUpdate).format('D MMM YYYY, HH:mm')}
        </div>
      )}

      {isConversionFocusedCourse && (
        <div className="mt-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl shadow-emerald-900/10 lg:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              {lineCopy.heroBadge}
            </span>
            <span className="text-sm text-slate-400">
              LINE สำหรับสอบถามก่อนลงทะเบียน
            </span>
          </div>
          {scheduleMeta.length > 0 && (
            <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-3">
              {scheduleMeta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
                    {item.label}
                  </div>
                  <div className="mt-1.5 text-base font-medium leading-7 text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <LineContactButton
              courseData={courseData}
              label={lineCopy.heroPrimary}
              trackingLabel="hero_line_contact"
              className="w-full md:w-auto"
            />
            <a
              href={registerUrl || '#course-registration'}
              target={registerUrl ? '_blank' : undefined}
              rel={registerUrl ? 'noreferrer' : undefined}
              onClick={onRegisterCtaClick}
              className={`${registerSecondaryButtonClass} w-full md:w-auto`}
            >
              {lineCopy.heroSecondary}
            </a>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            {lineCopy.heroMicrocopy}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap xl:mt-8">
        <div className="md:w-full xl:basis-8/12 lg:pr-5">
          <p className="mb-8 max-w-4xl text-base leading-8 text-gray-700 dark:text-gray-300 lg:text-[17px]">
            {courseData.overview}
          </p>
          {isConversionFocusedCourse && (
            <section className="mb-10 rounded-3xl border border-emerald-500/20 bg-slate-900/92 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.7)] lg:p-7 dark:border-emerald-500/15 dark:bg-slate-900/88">
              <h3 className="text-2xl font-bold leading-tight text-white lg:text-[30px]">
                {lineCopy.midTitle}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-8 text-gray-300">
                {lineCopy.midDescription}
              </p>
              <div className="mt-6">
                <LineContactButton
                  courseData={courseData}
                  label={lineCopy.midPrimary}
                  trackingLabel="midpage_line_contact"
                />
              </div>
            </section>
          )}
          {courseData.imageUrl && (
            <img
              src={courseData.imageUrl}
              className="mb-12 w-full rounded-2xl border border-white/60 shadow-[0_20px_60px_-30px_rgba(30,41,59,0.45)] dark:border-gray-800"
              alt={courseData.title}
            />
          )}
          {courseData.objectives && courseData.objectives.length > 0 && (
            <section className="mb-11">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 max-w-16 bg-blue-300/70 dark:bg-blue-500/40" />
                <h3 className="text-3xl font-bold leading-tight text-blue-700 dark:text-blue-400 lg:text-[34px]">
                  {t('course-detail-3')}
                </h3>
              </div>
              <ul className="list-disc space-y-2 rounded-3xl border border-gray-200/90 bg-white/82 px-6 py-5 pl-10 text-base leading-8 text-gray-700 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.16)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/72 dark:text-gray-300 dark:shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                {courseData.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </section>
          )}
          {courseData.whoShouldAttend &&
            courseData.whoShouldAttend.length > 0 && (
              <section className="mb-11">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 max-w-16 bg-blue-300/70 dark:bg-blue-500/40" />
                  <h3 className="text-3xl font-bold leading-tight text-blue-700 dark:text-blue-400 lg:text-[34px]">
                    {t('course-detail-4')}
                  </h3>
                </div>
                <ul className="list-disc space-y-2 rounded-3xl border border-gray-200/90 bg-white/82 px-6 py-5 pl-10 text-base leading-8 text-gray-700 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.16)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/72 dark:text-gray-300 dark:shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                  {courseData.whoShouldAttend.map((whoShouldAttend, index) => (
                    <li key={index}>{whoShouldAttend}</li>
                  ))}
                </ul>
              </section>
            )}
          {courseData.prerequisites && courseData.prerequisites.length > 0 && (
            <section className="mb-11">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px flex-1 max-w-16 bg-blue-300/70 dark:bg-blue-500/40" />
                <h3 className="text-3xl font-bold leading-tight text-blue-700 dark:text-blue-400 lg:text-[34px]">
                  {t('course-detail-5')}
                </h3>
              </div>
              <ul className="list-disc space-y-2 rounded-3xl border border-gray-200/90 bg-white/82 px-6 py-5 pl-10 text-base leading-8 text-gray-700 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.16)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/72 dark:text-gray-300 dark:shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                {courseData.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </section>
          )}
          {courseData.participantsWillReceive &&
            courseData.participantsWillReceive.length > 0 && (
              <section className="mb-11">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 max-w-16 bg-blue-300/70 dark:bg-blue-500/40" />
                  <h3 className="text-3xl font-bold leading-tight text-blue-700 dark:text-blue-400 lg:text-[34px]">
                    {t('course-detail-6')}
                  </h3>
                </div>
                <ul className="list-disc space-y-2 rounded-3xl border border-gray-200/90 bg-white/82 px-6 py-5 pl-10 text-base leading-8 text-gray-700 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.16)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/72 dark:text-gray-300 dark:shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                  {courseData.participantsWillReceive.map(
                    (participantsWillReceive, index) => (
                      <li key={index}>{participantsWillReceive}</li>
                    ),
                  )}
                </ul>
              </section>
            )}
          {courseData.outline && courseData.outline.length > 0 && (
            <section className="mb-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 max-w-16 bg-blue-300/70 dark:bg-blue-500/40" />
                <h3 className="text-3xl font-bold leading-tight text-blue-700 dark:text-blue-400 lg:text-[34px]">
                  {t('course-detail-7')}
                </h3>
              </div>
              <ol className="space-y-5 pl-0 text-base leading-8 text-gray-700 dark:text-gray-300">
                {courseData.outline.map((outline, index) => (
                  <li
                    key={index}
                    className="rounded-2xl border border-gray-200/90 bg-white/84 px-5 py-4 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.16)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/72 dark:shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm dark:bg-blue-500">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                          {outline.title}
                        </div>

                        {outline.descriptions &&
                          outline.descriptions.length > 0 && (
                            <ul className="mt-2 list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-gray-700 dark:text-gray-300 lg:text-base">
                              {outline.descriptions.map(
                                (description, index) => (
                                  <li key={index}>{description}</li>
                                ),
                              )}
                            </ul>
                          )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
        <CourseDetailLink
          className="md:w-full xl:basis-4/12"
          courseData={courseData}
          i18next={i18next}
          registerBottom
          sectionId="course-registration"
        />
        <CourseDetailLink
          className="hidden xl:block xl:basis-8/12"
          courseData={courseData}
          i18next={i18next}
          registerRight
        />
      </div>

      {isConversionFocusedCourse && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl backdrop-blur xl:hidden">
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
