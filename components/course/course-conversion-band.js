/* eslint-disable react/prop-types */
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
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
  const lineTitle = locale === 'th' ? 'สอบถามผ่าน LINE' : 'Ask via LINE';
  const lineHint =
    locale === 'th'
      ? 'เหมาะสำหรับผู้ที่อยากเช็กเนื้อหา ราคา หรือความเหมาะสมของคอร์สก่อนตัดสินใจ'
      : 'A good option if you want to confirm course fit, pricing, or details before deciding.';
  const registerTitle = locale === 'th' ? 'ลงทะเบียนรอบนี้' : 'Register Now';
  const registerHint =
    locale === 'th'
      ? 'ไปยังหน้าลงทะเบียนทันทีเมื่อคุณพร้อม'
      : 'Go straight to the registration page when you are ready.';

  return (
    <section
      className={`course-theme-contrast mt-12 overflow-hidden rounded-[34px] ${
        compact ? 'px-6 py-7 lg:px-8' : 'px-6 py-8 lg:px-10 lg:py-10'
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-strong">
            {badge ||
              (locale === 'th' ? 'สอบถามก่อนลงทะเบียน' : 'Ask Before Registering')}
          </div>
          <h2
            className={`course-contrast-heading mt-3 font-semibold leading-[1.02] tracking-[-0.05em] ${
              compact ? 'text-3xl lg:text-[2.4rem]' : 'text-3xl lg:text-[3rem]'
            }`}
          >
            {title}
          </h2>
          <p className="course-contrast-copy mt-4 max-w-2xl text-base leading-8">
            {description}
          </p>
        </div>

        <div className="grid gap-3">
          <a
            href="https://lin.ee/xyZvMd2"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLineContactClick(courseData, trackingLabel)}
            className="rounded-[24px] border border-secondary/25 bg-secondary px-6 py-5 text-left text-background shadow-[0_22px_60px_-28px_rgba(79,209,197,0.42)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-secondary/25"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold leading-none">{lineTitle}</div>
                <div className="mt-2 text-sm leading-7 text-background/75">{lineHint}</div>
              </div>
              <ArrowRightIcon className="mt-1 h-5 w-5 shrink-0" />
            </div>
          </a>

          <a
            href={registerUrl || '#course-registration'}
            target={registerUrl ? '_blank' : undefined}
            rel={registerUrl ? 'noreferrer' : undefined}
            onClick={onRegisterClick}
            className="rounded-[24px] border border-border/80 bg-surface-elevated px-6 py-5 text-left text-text transition hover:border-primary/30 hover:bg-surface hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold leading-none tracking-[-0.03em]">
                  {registerTitle}
                </div>
                <div className="mt-2 text-sm leading-7 text-soft">{registerHint}</div>
              </div>
              <ArrowRightIcon className="mt-1 h-5 w-5 shrink-0" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
