/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Button from '../ui/button';
import Card from '../ui/card';
import Link from '../link';
import CourseFactGrid from './course-fact-grid';

function Summary({ children }) {
  return (
    <p
      className="max-w-2xl text-[0.98rem] leading-7 text-muted"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {children}
    </p>
  );
}

export default function FeaturedCourseCard({
  title,
  image,
  imageAlt,
  badges,
  meta,
  summary,
  facts,
  primaryCta,
  secondaryCta,
}) {
  return (
    <Card className="group overflow-hidden rounded-[30px] border-border/90 bg-surface-elevated/95 p-3 shadow-panel transition duration-300 hover:-translate-y-0.5 hover:shadow-floating sm:p-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,4.5fr)_minmax(0,7.5fr)] md:items-stretch lg:gap-5">
        <div className="relative min-h-[210px] overflow-hidden rounded-[24px] border border-border/75 bg-background-alt sm:min-h-[250px] md:min-h-full">
          <Image
            src={image || '/img/logo_2_sq.png'}
            alt={imageAlt || title || 'DKS Center'}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-slate-950/10 to-transparent" />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4 px-1 py-1 sm:px-2 sm:py-2">
          <div className="space-y-3.5">
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-2.5">
              <h2 className="text-[clamp(1.9rem,3.25vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-text">
                {title}
              </h2>
              <p className="text-sm font-medium leading-6 text-primary sm:text-[0.96rem]">
                {meta}
              </p>
              <Summary>{summary}</Summary>
            </div>

            <CourseFactGrid items={facts} className="pt-1" />
          </div>

          <div className="flex flex-col gap-3 border-t border-border/60 pt-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              as={primaryCta.external ? 'a' : Link}
              href={primaryCta.href}
              target={primaryCta.external ? '_blank' : undefined}
              rel={primaryCta.external ? 'noreferrer' : undefined}
              className="min-w-[152px] shadow-soft"
            >
              {primaryCta.label}
            </Button>
            <Button
              as={Link}
              href={secondaryCta.href}
              variant="secondary"
              className="min-w-[184px] border-border/70 bg-surface text-muted shadow-none hover:bg-surface-elevated hover:text-text"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
