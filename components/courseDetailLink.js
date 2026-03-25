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
import {
  buildForwardedUrl,
  getLineCtaCopy,
  getPrimarySchedule,
  isLinePrimaryCourse,
} from '/lib/courses/cta';
import {
  formatCourseDateRange,
  formatCourseTime,
} from '/lib/courses/formatters';
import CourseSidebarCta from './course/course-sidebar-cta';
import CourseInlineCta from './course/course-inline-cta';
import CourseScheduleTable from './course/course-schedule-table';
import CourseDocumentsTable from './course/course-documents-table';

const CourseDetailLink = ({
  courseData,
  i18next,
  className,
  registerBottom,
  registerRight,
  sectionId,
}) => {
  const { t, i18n } = i18next;
  const router = useRouter();
  const code = router.query?.discount_code || router.query?.code;
  const brandOwner = normalizeBrand(courseData?.brand);
  const locale = i18n?.language || 'th';
  const isConversionFocusedCourse = isLinePrimaryCourse(courseData);
  const lineCopy = getLineCtaCopy(locale);
  const featuredSchedule = getPrimarySchedule(courseData);
  const featuredRegisterUrl = buildForwardedUrl(
    featuredSchedule?.ticketUrl,
    router.query || {},
  );
  const scheduleDateRange = featuredSchedule
    ? formatCourseDateRange(
        featuredSchedule.eventStart,
        featuredSchedule.eventEnd,
        locale,
      )
    : null;
  const scheduleTimeRange = featuredSchedule
    ? `${formatCourseTime(featuredSchedule.eventStart, locale)} - ${formatCourseTime(featuredSchedule.eventEnd, locale)}`
    : null;
  const baseItem = {
    item_name: courseData?.title,
    item_category: 'course',
    item_id: courseData?.code || courseData?.key,
  };

  const onScheduleTitleClick = (publicSchedule, linkUrl) => {
    if (!courseData?.title) return;

    trackSelectContent({
      brandOwner,
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
        brandOwner,
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

    trackBeginCheckout({
      brandOwner,
      item: baseItem,
      schedule: publicSchedule,
      linkUrl: linkUrl || '',
    });

    if (linkUrl && /^https?:\/\//.test(linkUrl)) {
      trackOutboundClick({
        brandOwner,
        linkUrl,
        label: 'eventpop_ticket',
      });
    }
  };

  return (
    <>
      <div
        className={`${className || ''} ${
          registerBottom ? 'xl:sticky xl:top-24 xl:self-start' : ''
        }`.trim()}
      >
        {isConversionFocusedCourse && registerBottom && (
          <CourseSidebarCta
            courseData={courseData}
            lineCopy={lineCopy}
            locale={locale}
            featuredSchedule={featuredSchedule}
            scheduleDateRange={scheduleDateRange}
            scheduleTimeRange={scheduleTimeRange}
            featuredRegisterUrl={featuredRegisterUrl}
            onRegisterClick={() =>
              featuredSchedule &&
              onRegisterClick(featuredSchedule, featuredRegisterUrl)
            }
          />
        )}

        {isConversionFocusedCourse && registerRight && (
          <CourseInlineCta
            courseData={courseData}
            lineCopy={lineCopy}
            featuredRegisterUrl={featuredRegisterUrl}
            onRegisterClick={() =>
              featuredSchedule &&
              onRegisterClick(featuredSchedule, featuredRegisterUrl)
            }
          />
        )}

        <div className="space-y-5">
          <div className="course-theme-panel overflow-hidden rounded-[30px]">
            <table className="w-full text-left text-sm text-muted rtl:text-right">
              <thead className="course-theme-table-head text-xs uppercase text-soft">
                <tr>
                  <th
                    scope="col"
                    className="rounded-t-[30px] px-6 py-5 text-xl font-semibold tracking-[-0.03em] text-text"
                  >
                    {t('course-detail-8')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-transparent">
                  <th
                    scope="row"
                    className="rounded-b-[30px] border-t border-border/70 px-6 py-5 text-base font-semibold text-text"
                  >
                    {courseData.duration}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div id={sectionId}>
            <CourseScheduleTable
              courseData={courseData}
              locale={locale}
              t={t}
              routerQuery={router.query || {}}
              registerBottom={registerBottom}
              registerRight={registerRight}
              isConversionFocusedCourse={isConversionFocusedCourse}
              lineCopy={lineCopy}
              onScheduleTitleClick={onScheduleTitleClick}
              onRegisterClick={onRegisterClick}
              onOpenModal={openModal}
            />
          </div>
        </div>

        <CourseDocumentsTable documents={courseData.documents} t={t} />
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
