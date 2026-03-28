import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Modal from '/components/modal';
import TicketSaleModalManage from './ticketSaleModal/ticketSaleModalManage';
import { normalizeBrand } from '/lib/brand';
import {
  trackBeginCheckout,
  trackSelectContent,
  trackOutboundClick,
} from '/lib/gtm';
import { getLineCtaCopy, isLinePrimaryCourse } from '/lib/courses/cta';
import {
  getCoursePrimaryOrganizer,
  getSessionPrimaryOrganizer,
} from '/lib/courses/sessions';
import CourseScheduleTable from './course/course-schedule-table';
import CourseDocumentsTable from './course/course-documents-table';

const CourseDetailLink = ({
  courseData,
  i18next,
  className,
  registerBottom: _registerBottom,
  registerRight: _registerRight,
  sectionId,
}) => {
  const { t, i18n } = i18next;
  const router = useRouter();
  const code = router.query?.discount_code || router.query?.code;
  const courseOrganizer = getCoursePrimaryOrganizer(courseData);
  const locale = i18n?.language || 'th';
  const isConversionFocusedCourse = isLinePrimaryCourse(courseData);
  const lineCopy = getLineCtaCopy(locale);
  const baseItem = {
    item_name: courseData?.title,
    item_category: 'course',
    item_id: courseData?.code || courseData?.key,
  };

  const onScheduleTitleClick = (publicSchedule, linkUrl) => {
    if (!courseData?.title) return;
    const scheduleBrandOwner = normalizeBrand(
      getSessionPrimaryOrganizer(publicSchedule, courseData) || courseOrganizer,
    );

    trackSelectContent({
      brandOwner: scheduleBrandOwner,
      item: baseItem,
      content: {
        type: 'schedule',
        id: publicSchedule?.title || '',
        name: publicSchedule?.title || '',
      },
    });

    // ถ้าเป็นลิงก์ออกนอกโดเมน (eventpop) เก็บ outbound ด้วย
    if (linkUrl && /^https?:\/\//.test(linkUrl)) {
      trackOutboundClick({
        brandOwner: scheduleBrandOwner,
        linkUrl,
        label: 'eventpop_ticket',
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleKey, setScheduleKey] = useState('');

  const openModal = (scheduleKey) => {
    setScheduleKey(scheduleKey);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onRegisterClick = (publicSchedule, linkUrl) => {
    if (!courseData?.title) return;
    const scheduleBrandOwner = normalizeBrand(
      getSessionPrimaryOrganizer(publicSchedule, courseData) || courseOrganizer,
    );

    trackBeginCheckout({
      brandOwner: scheduleBrandOwner,
      item: baseItem,
      schedule: publicSchedule,
      linkUrl: linkUrl || '',
    });

    if (linkUrl && /^https?:\/\//.test(linkUrl)) {
      trackOutboundClick({
        brandOwner: scheduleBrandOwner,
        linkUrl,
        label: 'eventpop_ticket',
      });
    }
  };

  return (
    <>
      <div className={(className || '').trim()}>
        <div id={sectionId}>
          <CourseScheduleTable
            courseData={courseData}
            locale={locale}
            t={t}
            routerQuery={router.query || {}}
            isConversionFocusedCourse={isConversionFocusedCourse}
            lineCopy={lineCopy}
            onScheduleTitleClick={onScheduleTitleClick}
            onRegisterClick={onRegisterClick}
            onOpenModal={openModal}
          />
        </div>

        <div className="mt-5">
          <CourseDocumentsTable documents={courseData.documents} t={t} />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={t('ticket-modal-title') + ' ' + courseData.title}
      >
        <TicketSaleModalManage
          courseKey={courseData?.key || ''}
          scheduleKey={scheduleKey}
          discountCodeURL={code}
          i18next={i18next}
        />
      </Modal>
    </>
  );
};

export default CourseDetailLink;
