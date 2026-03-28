/* eslint-disable react/prop-types */
import React from 'react';
import Heading from '../ui/heading';
import Link from '../link';
import Section from '../ui/section';
import FeaturedCourseCard from './featured-course-card';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function FeaturedCourseSection({
  eyebrow,
  title,
  description,
  viewAllLabel,
  viewAllHref,
  course,
}) {
  return (
    <Section
      className="pb-6 pt-6 sm:pt-8 lg:pb-8 lg:pt-10"
      containerClassName="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-4 h-[22rem] rounded-[2rem] bg-[radial-gradient(circle_at_top_left,var(--hero-tint),transparent_58%)]"
      />

      <div className="relative z-10 space-y-5 lg:space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-border/60 bg-surface/35 px-4 py-4 shadow-soft backdrop-blur-sm sm:px-5 lg:flex-row lg:items-end lg:justify-between lg:px-6">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <span
              aria-hidden="true"
              className="h-px w-16 bg-[linear-gradient(90deg,var(--color-primary),transparent)]"
            />
            <Heading
              eyebrow={eyebrow}
              title={title}
              description={description}
              className="max-w-2xl gap-2"
            />
          </div>

          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className={cx(
                'inline-flex items-center gap-2 self-start rounded-full border border-border/80 bg-surface-elevated/90 px-4 py-2.5 text-sm font-semibold text-text shadow-soft backdrop-blur-sm transition duration-200',
                'hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary',
              )}
            >
              {viewAllLabel}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        <FeaturedCourseCard {...course} />
      </div>
    </Section>
  );
}
