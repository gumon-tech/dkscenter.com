import React from 'react';
import {
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  UsersIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Card from './ui/card';
import Badge from './ui/badge';
import Button from './ui/button';
import Link from './link';

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
  });

const detailRowClass = 'flex items-start gap-3 text-sm leading-7 text-muted';

const SuccessDetail = ({ orderData, i18next, mode = 'success' }) => {
  const { t } = i18next;
  if (!orderData) return <></>;

  const isCancel = mode === 'cancel';
  const statusLabel = isCancel
    ? t('order-cancel-badge')
    : t('order-success-badge');
  const bannerTitle = isCancel
    ? t('order-cancel-title')
    : t('order-success-title');
  const bannerDescription = isCancel
    ? t('order-cancel-description')
    : t('order-success-description');
  const StatusIcon = isCancel ? XCircleIcon : CheckCircleIcon;

  return (
    <div className="pb-section">
      <section className="theme-hero-surface mt-6 rounded-[36px] px-6 py-8 sm:px-8 lg:px-10">
        <Badge variant={isCancel ? 'warning' : 'success'}>{statusLabel}</Badge>
        <div className="mt-5 flex flex-wrap items-start gap-4">
          <div className="theme-hero-muted-panel flex h-14 w-14 items-center justify-center rounded-2xl">
            <StatusIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="theme-hero-heading text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {bannerTitle}
            </h1>
            <p className="theme-hero-copy mt-4 max-w-3xl text-base leading-8 sm:text-lg">
              {bannerDescription}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} href="/course">
            {t('nav-course')}
          </Button>
          <Button as={Link} href="/about-us" variant="secondary">
            {t('nav-about-us')}
          </Button>
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <TicketIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
              {t('order-summary-title')}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={detailRowClass}>
              <TagIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-order-id')}
                </div>
                <div className="text-text">#{orderData?.orderId}</div>
              </div>
            </div>
            <div className={detailRowClass}>
              <TagIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-status')}
                </div>
                <div className="text-text">{orderData?.orderStatus}</div>
              </div>
            </div>
            <div className={detailRowClass}>
              <EnvelopeIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-email')}
                </div>
                <div className="text-text">{orderData?.userEmail}</div>
              </div>
            </div>
            <div className={detailRowClass}>
              <CalendarIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-purchase-time')}
                </div>
                <div className="text-text">
                  {new Date(orderData?.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            <div className={detailRowClass}>
              <TagIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-total')}
                </div>
                <div className="text-text">
                  {formatCurrency(orderData?.totalPrice)}
                </div>
              </div>
            </div>
            <div className={detailRowClass}>
              <TagIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-unit-total')}
                </div>
                <div className="text-text">
                  {formatCurrency(orderData?.totalUnitPrice)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <DocumentTextIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
              {t('order-ticket-title')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className={detailRowClass}>
              <TicketIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-event')}
                </div>
                <div className="text-text">
                  {orderData?.ticketDetail?.eventName}
                </div>
              </div>
            </div>
            <div className={detailRowClass}>
              <TicketIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-ticket-type')}
                </div>
                <div className="text-text">{orderData?.ticketDetail?.name}</div>
              </div>
            </div>
            <div className={detailRowClass}>
              <MapPinIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-location')}
                </div>
                <div className="text-text">
                  {orderData?.ticketDetail?.eventLocation}
                </div>
              </div>
            </div>
            <div className={detailRowClass}>
              <CalendarIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-date-time')}
                </div>
                <div className="text-text">
                  {orderData?.ticketDetail?.eventDate}{' '}
                  {orderData?.ticketDetail?.eventTime}
                </div>
              </div>
            </div>
            <div className={detailRowClass}>
              <TagIcon className="mt-1 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-ticket-amount')}
                </div>
                <div className="text-text">{orderData?.ticketAmount}</div>
              </div>
            </div>
            {orderData?.ticketDetail?.detailLink ? (
              <a
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-strong"
                href={orderData?.ticketDetail?.detailLink}
                rel="noreferrer"
              >
                {t('order-open-course-link')}
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <UsersIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
              {t('order-attendees-title')}
            </h2>
          </div>
          <div className="space-y-4">
            {orderData?.attendees?.map((attendee, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/70 bg-surface px-4 py-4"
              >
                <div className="font-medium text-text">
                  {attendee.firstName} {attendee.lastName}
                </div>
                <div className="mt-1 text-sm text-muted">{attendee.email}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <TagIcon className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
                {t('order-reference-title')}
              </h2>
            </div>
            <div className="space-y-4">
              <div className={detailRowClass}>
                <TagIcon className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                    {t('order-label-schedule-key')}
                  </div>
                  <div className="text-text break-all">
                    {orderData?.scheduleKey}
                  </div>
                </div>
              </div>
              <div className={detailRowClass}>
                <TagIcon className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                    {t('order-label-reserve-id')}
                  </div>
                  <div className="text-text break-all">
                    {orderData?.reserveId}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {orderData?.discountDetail ? (
            <Card className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <TagIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-text">
                  {t('order-discount-title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className={detailRowClass}>
                  <TagIcon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                      {t('order-label-discount-code')}
                    </div>
                    <div className="text-text">
                      {orderData?.discountDetail?.discountCode}
                    </div>
                  </div>
                </div>
                <div className={detailRowClass}>
                  <TagIcon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                      {t('order-label-discount-type')}
                    </div>
                    <div className="text-text">
                      {orderData?.discountDetail?.discountType}
                    </div>
                  </div>
                </div>
                <div className={detailRowClass}>
                  <TagIcon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                      {t('order-label-discount-value')}
                    </div>
                    <div className="text-text">
                      {orderData?.discountDetail?.discountValue}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SuccessDetail;
