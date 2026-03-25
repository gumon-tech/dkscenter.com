/* eslint-disable react/prop-types */
import React from 'react';
import { trackLineContactClick } from './line-contact-button';

export default function CourseConversionBand({
  locale,
  courseData,
  title,
  description,
  badge,
  primaryLabel: _primaryLabel,
  secondaryLabel: _secondaryLabel,
  registerUrl,
  onRegisterClick,
  trackingLabel,
  compact = false,
}) {
  const lineTitle = locale === 'th' ? 'แอด LINE' : 'Add LINE';
  const lineHint =
    locale === 'th' ? 'สอบถามรายละเอียดก่อนตัดสินใจ' : 'Ask before you decide';
  const registerTitle = locale === 'th' ? 'ลงทะเบียนทันที' : 'Register now';
  const registerHint =
    locale === 'th' ? 'เปิดหน้าลงทะเบียนของรอบนี้' : 'Open this session';

  return (
    <section
      className={`course-theme-contrast rounded-[32px] ${
        compact ? 'mb-12 p-7 lg:p-8' : 'mt-12 rounded-[34px] px-7 py-8 lg:px-10 lg:py-10'
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="max-w-4xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
            {badge || (locale === 'th' ? 'Consult Before Registering' : 'Consult Before Registering')}
          </div>
          <h3
            className={`course-contrast-heading mt-2 font-semibold leading-tight ${
              compact ? 'text-2xl lg:text-[30px]' : 'text-3xl lg:text-[38px]'
            }`}
          >
            {title}
          </h3>
          <p className="course-contrast-copy mt-3 text-base leading-8">
            {description}
          </p>
        </div>
        <div className="border-t border-border/60 pt-6">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
            {locale === 'th' ? 'Choose Your Next Step' : 'Choose Your Next Step'}
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:max-w-3xl">
            <a
              href="https://lin.ee/xyZvMd2"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLineContactClick(courseData, trackingLabel)}
              className="rounded-[24px] border border-secondary/25 bg-secondary px-7 py-5 text-left text-background shadow-[0_22px_60px_-28px_rgba(79,209,197,0.42)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-secondary/25"
            >
              <div className="text-xl font-semibold leading-none">{lineTitle}</div>
              <div className="mt-2 text-sm leading-7 text-background/75">{lineHint}</div>
            </a>
            <a
              href={registerUrl || '#course-registration'}
              target={registerUrl ? '_blank' : undefined}
              rel={registerUrl ? 'noreferrer' : undefined}
              onClick={onRegisterClick}
              className="rounded-[24px] border border-border/80 bg-surface-elevated px-7 py-5 text-left text-text transition hover:border-primary/30 hover:bg-surface hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
            >
              <div className="text-xl font-semibold leading-none tracking-[-0.03em]">
                {registerTitle}
              </div>
              <div className="mt-2 text-sm leading-7 text-soft">{registerHint}</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
