import React from 'react';
import Image from 'next/image';
import Link from './link';
import { useState, useEffect } from 'react';
import Section from './ui/section';
import Button from './ui/button';
import Card from './ui/card';
import { getCoursesWithUpcomingSchedules } from '../lib/courses/repository';
import { formatCourseDateRange } from '../lib/courses/formatters';
import {
  getPrimaryDisplaySessionData,
  getSessionDeliveryLabel,
} from '../lib/courses/sessions';

const HighlightCourse = ({ i18next }) => {
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';

  const [highlightCourse, setHighlightCourse] = useState({});
  const [highlightSchedule, setHighlightSchedule] = useState({});
  const [courseRef, setCourseHref] = useState(
    '/course/2024-007-modern-web-frontend-with-react',
  );

  useEffect(() => {
    const courses = getCoursesWithUpcomingSchedules(currentLanguage);
    const [featuredCourse] = courses;

    if (featuredCourse) {
      const { session } = getPrimaryDisplaySessionData(featuredCourse);
      setHighlightCourse(featuredCourse);
      setHighlightSchedule(session || {});
      setCourseHref('/course/' + featuredCourse.key);
    }
  }, [currentLanguage]);

  const deliveryLabel = getSessionDeliveryLabel(
    highlightSchedule,
    currentLanguage,
  );

  const dateRange =
    highlightSchedule?.eventStart && highlightSchedule?.eventEnd
      ? formatCourseDateRange(
          highlightSchedule.eventStart,
          highlightSchedule.eventEnd,
          currentLanguage,
        )
      : null;

  return (
    <Section className="pb-8 pt-section-sm lg:pb-12 lg:pt-section">
      <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-stretch">
        <div className="theme-hero-surface rounded-[38px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 xl:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(120,166,255,0.32),transparent_44%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[rgba(79,209,197,0.16)] blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-strong">
              {t('sectionTitle-pretitle')}
            </span>

            <h1 className="theme-hero-heading mt-5 max-w-4xl text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl xl:text-[4.4rem]">
              {highlightSchedule?.title || t('sectionTitle-title')}
            </h1>

            <p className="theme-hero-copy mt-5 max-w-3xl text-[15px] leading-8 sm:text-lg">
              {highlightCourse?.overview || t('sectionTitle-detail1')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-text">
                {deliveryLabel ||
                  (currentLanguage === 'th'
                    ? 'เวิร์กชอปเชิงปฏิบัติ'
                    : 'Hands-on learning track')}
              </span>
              {highlightCourse?.duration ? (
                <span className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-text">
                  {highlightCourse.duration}
                </span>
              ) : null}
              {dateRange ? (
                <span className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-text">
                  {dateRange}
                </span>
              ) : null}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button as={Link} href={courseRef} className="sm:min-w-[220px]">
                {t('sectionTitle-detail2')}
              </Button>
              <p className="max-w-md text-sm leading-7 text-muted">
                {currentLanguage === 'th'
                  ? 'คอร์สที่ถูกคัดมาเพื่อการอัปสกิลแบบใช้งานได้จริง พร้อมโครงสร้างเนื้อหาที่อ่านง่ายและตัดสินใจได้เร็วขึ้น'
                  : 'A featured training experience curated for practical skill-building, faster evaluation, and stronger conversion clarity.'}
              </p>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden p-4 sm:p-5">
          <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] xl:grid-cols-1">
            <div className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-border/70 bg-background-alt">
              <Image
                src={highlightCourse?.imageUrl || '/img/logo_2_sq.png'}
                alt={highlightCourse?.title || 'DKS Center'}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-border/70 bg-surface px-5 py-5 lg:px-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {currentLanguage === 'th' ? 'คอร์สแนะนำ' : 'Featured course'}
                </div>
                <h3 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.04em] text-text">
                  {highlightCourse?.title || 'DKS Center'}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {highlightSchedule?.location ||
                    (currentLanguage === 'th'
                      ? 'เรียนในรูปแบบ workshop ที่เน้นการนำไปใช้จริง'
                      : 'Workshop-led learning designed for immediate practical use.')}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-2xl border border-border/70 bg-surface-elevated px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                    {currentLanguage === 'th' ? 'รหัสคอร์ส' : 'Course code'}
                  </div>
                  <div className="mt-2 text-base font-semibold text-text">
                    {highlightCourse?.code || 'DKS'}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-surface-elevated px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-soft">
                    {currentLanguage === 'th' ? 'รอบถัดไป' : 'Next cohort'}
                  </div>
                  <div className="mt-2 text-base font-semibold text-text">
                    {dateRange ||
                      (currentLanguage === 'th' ? 'เร็วๆ นี้' : 'Coming soon')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default HighlightCourse;
