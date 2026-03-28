/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Container from '../container';
import Heading from '../ui/heading';
import Card from '../ui/card';
import Button from '../ui/button';
import Modal from '../modal';
import TicketSaleModalManage from '../ticketSaleModal/ticketSaleModalManage';
import {
  getSessionDeliveryLabel,
  getSessionInstructorLabel,
  getSessionOrganizerLabel,
  isSessionRegistrationOpen,
} from '/lib/courses/sessions';

export default function CourseScheduleOverview({
  courseData,
  scheduleData,
  i18next,
  discountCode,
}) {
  const { t } = i18next;
  const [modalOpen, setModalOpen] = useState(false);
  const locale = i18next?.i18n?.language || 'th';
  const deliveryLabel = getSessionDeliveryLabel(scheduleData, locale);
  const organizerLabel = getSessionOrganizerLabel(scheduleData, courseData);
  const instructorLabel = getSessionInstructorLabel(scheduleData);
  const canRegister = isSessionRegistrationOpen(scheduleData);

  return (
    <>
      <Container className="py-10 md:py-12">
        <Heading
          eyebrow={courseData.code}
          title={scheduleData.title}
          description={courseData.overview}
          className="mb-8"
        />

        <Card className="p-6 md:p-8">
          <dl className="grid gap-5 md:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                {t('schedule-course')}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-text">
                {courseData.title}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                {t('schedule-schedule')}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-text">
                {scheduleData.title}
              </dd>
            </div>
            {deliveryLabel ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {locale === 'th' ? 'รูปแบบ' : 'Delivery'}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-text">
                  {deliveryLabel}
                </dd>
              </div>
            ) : null}
            {organizerLabel ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {locale === 'th' ? 'ผู้จัดรอบอบรม' : 'Organizer'}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-text">
                  {organizerLabel}
                </dd>
              </div>
            ) : null}
            {instructorLabel ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {locale === 'th' ? 'วิทยากร' : 'Instructor'}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-text">
                  {instructorLabel}
                </dd>
              </div>
            ) : null}
            {scheduleData.location ? (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  {t('order-label-location')}
                </dt>
                <dd className="mt-2 text-lg font-semibold">
                  {scheduleData.locationUrl ? (
                    <a
                      href={scheduleData.locationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline decoration-primary/35 underline-offset-4 transition hover:text-primary-strong"
                    >
                      {scheduleData.location}
                    </a>
                  ) : (
                    <span className="text-text">{scheduleData.location}</span>
                  )}
                </dd>
              </div>
            ) : null}
          </dl>

          {canRegister ? (
            <div className="mt-8">
              <Button onClick={() => setModalOpen(true)}>
                {t('ticket-modal-title')}
              </Button>
            </div>
          ) : (
            <p className="mt-8 text-sm leading-7 text-muted">
              {t('course-detail-20')} {t('course-detail-21')}
            </p>
          )}
        </Card>
      </Container>

      {canRegister ? (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`${t('ticket-modal-title')} ${courseData.title}`}
        >
          <TicketSaleModalManage
            courseKey={courseData.key}
            scheduleKey={scheduleData.scheduleKey}
            discountCodeURL={discountCode}
            i18next={i18next}
          />
        </Modal>
      ) : null}
    </>
  );
}
