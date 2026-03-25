/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Card from '../ui/card';
import Button from '../ui/button';
import Link from '../link';
import { getPrimarySchedule } from '/lib/courses/cta';
import { formatCourseDateRange } from '/lib/courses/formatters';

export default function CourseCard({ courseData, ctaLabel }) {
  const featuredSchedule = getPrimarySchedule(courseData);
  const locale = courseData?.locale || 'th';
  const nextDate =
    featuredSchedule?.eventStart && featuredSchedule?.eventEnd
      ? formatCourseDateRange(
          featuredSchedule.eventStart,
          featuredSchedule.eventEnd,
          locale,
        )
      : locale === 'th'
        ? 'ประกาศรอบถัดไปเร็วๆ นี้'
        : 'Next schedule coming soon';

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={courseData.imageUrl || '/img/logo_2_sq.png'}
          alt={courseData.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {courseData.code}
          </span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {courseData.duration}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="space-y-3">
          <Link href={`/course/${courseData.key}`}>
            <h3 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-text transition hover:text-primary">
              {courseData.title}
            </h3>
          </Link>
          <p
            className="min-h-[8.75rem] text-sm leading-7 text-muted"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {courseData.overview}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                {locale === 'th' ? 'รูปแบบ' : 'Delivery'}
              </div>
              <div className="mt-2 text-sm font-medium text-text">
                {locale === 'th' ? 'เวิร์กชอปออนไซต์' : 'Onsite workshop'}
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                {locale === 'th' ? 'รอบถัดไป' : 'Next session'}
              </div>
              <div className="mt-2 text-sm font-medium text-text">
                {nextDate}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-soft">
            {locale === 'th' ? 'หลักสูตรแนะนำ' : 'Curated learning track'}
          </div>
          <Button
            as={Link}
            href={`/course/${courseData.key}`}
            className="min-w-[152px]"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
