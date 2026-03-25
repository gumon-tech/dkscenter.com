/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Container from '../container';
import Heading from '../ui/heading';
import Card from '../ui/card';
import Button from '../ui/button';
import Modal from '../modal';
import TicketSaleModalManage from '../ticketSaleModal/ticketSaleModalManage';

export default function CourseScheduleOverview({
  courseData,
  scheduleData,
  i18next,
  discountCode,
}) {
  const { t } = i18next;
  const [modalOpen, setModalOpen] = useState(false);

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
          </dl>

          <div className="mt-8">
            <Button onClick={() => setModalOpen(true)}>
              {t('ticket-modal-title')}
            </Button>
          </div>
        </Card>
      </Container>

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
    </>
  );
}
