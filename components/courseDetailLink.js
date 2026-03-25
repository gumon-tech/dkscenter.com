import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Link from '/components/link';
import dayjs from 'dayjs';
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
  LineContactButton,
  buildForwardedUrl,
  getLineCtaCopy,
  getPrimarySchedule,
  isLinePrimaryCourse,
  registerScheduleButtonClass,
  registerSecondaryButtonClass,
} from './courseConversionCta';

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
      <div className={className}>
        {isConversionFocusedCourse && registerBottom && (
          <section className="mb-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.72)]">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="mb-2">
                  <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {lineCopy.sidebarBadge}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight text-white">
                  {lineCopy.sidebarPrimary}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {lineCopy.sidebarMicrocopy}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <LineContactButton
                courseData={courseData}
                label={lineCopy.sidebarPrimary}
                trackingLabel="sidebar_line_contact"
                className="w-full"
              />
              <a
                href={featuredRegisterUrl || '#course-registration'}
                target={featuredRegisterUrl ? '_blank' : undefined}
                rel={featuredRegisterUrl ? 'noreferrer' : undefined}
                onClick={() =>
                  featuredSchedule &&
                  onRegisterClick(featuredSchedule, featuredRegisterUrl)
                }
                className={`${registerSecondaryButtonClass} w-full`}
              >
                {lineCopy.registerLabel}
              </a>
            </div>
          </section>
        )}

        {isConversionFocusedCourse && registerRight && (
          <section className="mb-5 rounded-3xl border border-emerald-500/20 bg-slate-900/92 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.72)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white">
                  {lineCopy.bottomPrimary}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-300">
                  {lineCopy.bottomDescription}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LineContactButton
                  courseData={courseData}
                  label={lineCopy.bottomPrimary}
                  trackingLabel="bottom_line_contact"
                />
                <a
                  href={featuredRegisterUrl || '#course-registration'}
                  target={featuredRegisterUrl ? '_blank' : undefined}
                  rel={featuredRegisterUrl ? 'noreferrer' : undefined}
                  onClick={() =>
                    featuredSchedule &&
                    onRegisterClick(featuredSchedule, featuredRegisterUrl)
                  }
                  className={registerSecondaryButtonClass}
                >
                  {lineCopy.registerLabel}
                </a>
              </div>
            </div>
          </section>
        )}

        <div className="mb-5 overflow-hidden rounded-2xl border border-gray-200/90 bg-white/84 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/82 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.55)]">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-slate-800/92 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="rounded-t-lg px-6 py-4 text-xl font-bold text-blue-700 dark:text-blue-400"
                >
                  {t('course-detail-8')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-slate-900/78">
                <th
                  scope="row"
                  className="rounded-b-lg px-6 py-4 text-base font-semibold text-gray-700 dark:text-gray-300"
                >
                  {courseData.duration}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id={sectionId}
          className="mb-5 scroll-mt-28 overflow-hidden rounded-2xl border border-gray-200/90 bg-white/84 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/82 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.55)]"
        >
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-slate-800/92 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  colSpan={2}
                  className="rounded-t-xl border-b border-gray-200 bg-gray-50 px-6 py-4 text-xl font-bold text-blue-700 dark:border-slate-800 dark:bg-slate-800/92 dark:text-blue-400"
                >
                  {t('course-detail-9')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {courseData.publicSchedule &&
              courseData.publicSchedule.filter(
                (publicSchedule) => publicSchedule.isActive,
              ).length > 0 ? (
                courseData.publicSchedule
                  .filter((publicSchedule) => publicSchedule.isActive)
                  .sort(
                    (a, b) =>
                      dayjs(b.eventStart).valueOf() -
                      dayjs(a.eventStart).valueOf(),
                  )
                  .map((publicSchedule, index) => {
                    const eventStartDate = dayjs(
                      publicSchedule.eventStart,
                    ).format('D MMM YYYY');
                    const eventEndDate = dayjs(publicSchedule.eventEnd).format(
                      'D MMM YYYY',
                    );

                    const eventStartTime = dayjs(
                      publicSchedule.eventStart,
                    ).format('HH:mm');
                    const eventEndTime = dayjs(publicSchedule.eventEnd).format(
                      'HH:mm',
                    );

                    const isSaleEnded = dayjs().isAfter(
                      dayjs(publicSchedule.saleEnd),
                    );

                    const isSaleStart = dayjs().isAfter(
                      dayjs(publicSchedule.saleStart),
                    );

                    // ไม่ตรงเงือนไข จะแสดงสิ่งนี้
                    let courseType = 'COMING_SOON';
                    // หมดช่วงเวลาขาย
                    if (isSaleEnded) courseType = 'ENDED';
                    // ยังอยู่ช่วงเวลาขาย + ขายหมดแล้ว
                    if (
                      isSaleStart &&
                      !isSaleEnded &&
                      publicSchedule.isSoldOut
                    ) {
                      courseType = 'SOLD_OUT';
                    }
                    // ยังอยู่ช่วงเวลาขาย + ขายไม่หมด + มีลิ้งขาย
                    if (
                      isSaleStart &&
                      !isSaleEnded &&
                      !publicSchedule.isSoldOut &&
                      publicSchedule.ticketUrl
                    ) {
                      courseType = 'GET_YOURS';
                    }

                    if (
                      isSaleStart &&
                      !isSaleEnded &&
                      !publicSchedule.isSoldOut &&
                      !publicSchedule.ticketUrl &&
                      publicSchedule.scheduleKey
                    ) {
                      courseType = 'GET_YOURS_2';
                    }

                    return (
                      <tr
                        key={index}
                        className="group odd:bg-white even:bg-slate-50/70 transition-colors duration-200 hover:bg-blue-50/70 dark:odd:bg-gray-900 dark:even:bg-gray-800/40 dark:hover:bg-gray-800/70"
                      >
                        <th scope="row" className="px-4 py-5 align-top">
                          <h3 className="text-lg font-bold leading-7 text-gray-700 dark:text-gray-300">
                            {courseType === 'COMING_SOON' && (
                              <>{publicSchedule.title}</>
                            )}
                            {courseType === 'ENDED' && (
                              <>{publicSchedule.title}</>
                            )}
                            {courseType === 'SOLD_OUT' && (
                              <>{publicSchedule.title}</>
                            )}
                            {courseType === 'GET_YOURS' && (
                              <>
                                <a
                                  target="_blank"
                                  href={buildForwardedUrl(
                                    publicSchedule.ticketUrl,
                                    router.query || {},
                                  )}
                                  onClick={() =>
                                    onScheduleTitleClick(
                                      publicSchedule,
                                      buildForwardedUrl(
                                        publicSchedule.ticketUrl,
                                        router.query || {},
                                      ),
                                    )
                                  }
                                  rel="noreferrer"
                                  className="cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  {publicSchedule.title}
                                </a>
                              </>
                            )}
                            {courseType === 'GET_YOURS_2' && (
                              <>
                                <a
                                  className="cursor-pointer"
                                  href="#"
                                  onClick={() =>
                                    openModal(publicSchedule.scheduleKey)
                                  }
                                >
                                  {publicSchedule.title}
                                </a>
                              </>
                            )}
                          </h3>
                          <div className="flex pt-2 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                            <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                              <CalendarIcon />
                            </span>{' '}
                            <p>{eventStartDate}</p>
                            {eventStartDate !== eventEndDate && (
                              <p className="pl-1">- {eventEndDate}</p>
                            )}
                          </div>

                          <div className="flex pt-1 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                            <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                              <ClockIcon />
                            </span>{' '}
                            <p>{eventStartTime}</p>
                            <p className="pl-1">- {eventEndTime}</p>
                          </div>
                          {publicSchedule.location && (
                            <div className="flex pt-1 text-[15px] leading-6 text-gray-700 dark:text-gray-400">
                              <span className="w-5 h-5 mr-1 min-w-[1.25rem]">
                                <MapPinIcon />
                              </span>{' '}
                              <span>{publicSchedule.location}</span>
                            </div>
                          )}

                          {courseType === 'GET_YOURS' && registerBottom && (
                            <a
                              target="_blank"
                              href={buildForwardedUrl(
                                publicSchedule.ticketUrl,
                                router.query || {},
                              )}
                              onClick={() =>
                                onRegisterClick(
                                  publicSchedule,
                                  buildForwardedUrl(
                                    publicSchedule.ticketUrl,
                                    router.query || {},
                                  ),
                                )
                              }
                              className={`mt-2 ${isConversionFocusedCourse ? registerScheduleButtonClass : 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
                              rel="noreferrer"
                            >
                              {isConversionFocusedCourse
                                ? lineCopy.registerLabel
                                : t('course-detail-16')}
                            </a>
                          )}

                          {courseType === 'GET_YOURS_2' && registerBottom && (
                            <>
                              <nav>
                                <button
                                  className={`mt-2 ${isConversionFocusedCourse ? registerScheduleButtonClass : 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
                                  onClick={() =>
                                    openModal(publicSchedule.scheduleKey)
                                  }
                                >
                                  {isConversionFocusedCourse
                                    ? lineCopy.registerLabel
                                    : t('course-detail-16')}
                                </button>
                              </nav>
                            </>
                          )}
                        </th>
                        <th className="px-4 py-5 align-top">
                          {courseType === 'COMING_SOON' && 'COMING SOON!'}
                          {courseType === 'ENDED' && (
                            <span className="text-gray-700 dark:text-gray-400 font-bold whitespace-nowrap">
                              {t('course-detail-14')}
                            </span>
                          )}
                          {courseType === 'SOLD_OUT' && (
                            <span className="text-red-600 font-bold whitespace-nowrap">
                              {t('course-detail-15')}
                            </span>
                          )}

                          {courseType === 'GET_YOURS' && registerRight && (
                            <a
                              target="_blank"
                              href={buildForwardedUrl(
                                publicSchedule.ticketUrl,
                                router.query || {},
                              )}
                              onClick={() =>
                                onRegisterClick(
                                  publicSchedule,
                                  buildForwardedUrl(
                                    publicSchedule.ticketUrl,
                                    router.query || {},
                                  ),
                                )
                              }
                              className={`${isConversionFocusedCourse ? registerScheduleButtonClass : 'whitespace-nowrap mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'} ${isConversionFocusedCourse ? 'mt-2 whitespace-nowrap' : ''}`}
                              rel="noreferrer"
                            >
                              {isConversionFocusedCourse
                                ? lineCopy.registerLabel
                                : t('course-detail-16')}
                            </a>
                          )}

                          {courseType === 'GET_YOURS_2' && registerRight && (
                            <nav>
                              <button
                                className={`${isConversionFocusedCourse ? registerScheduleButtonClass : ' whitespace-nowrap mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'} ${isConversionFocusedCourse ? 'mt-2 whitespace-nowrap' : ''}`}
                                onClick={() =>
                                  openModal(publicSchedule.scheduleKey)
                                }
                              >
                                {isConversionFocusedCourse
                                  ? lineCopy.registerLabel
                                  : t('course-detail-16')}
                              </button>
                            </nav>
                          )}
                        </th>
                      </tr>
                    );
                  })
              ) : (
                <tr className="transition hover:bg-gray-50/60 dark:hover:bg-slate-800/55">
                  <th
                    scope="row"
                    colSpan={2}
                    className="rounded-t-lg px-6 py-5 text-base font-medium leading-7 text-gray-900 dark:text-white"
                  >
                    {t('course-detail-17')}
                  </th>
                </tr>
              )}
              <tr className="bg-white dark:bg-slate-900/78">
                <th
                  scope="row"
                  colSpan={2}
                  className="rounded-b-lg px-6 py-5 text-base font-medium text-gray-900 dark:text-white"
                >
                  <Link
                    href={'/about-us'}
                    className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('course-detail-18')}
                    <svg
                      className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                      />
                    </svg>
                  </Link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {courseData.documents && courseData.documents.length > 0 && (
          <table className="mb-5 w-full overflow-hidden rounded-2xl border border-gray-200/90 bg-white/84 text-left text-sm text-gray-500 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/82 dark:text-gray-400 dark:shadow-[0_20px_50px_-34px_rgba(0,0,0,0.55)]">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-slate-800/92 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="rounded-t-lg px-6 py-4 text-xl font-bold text-blue-700 dark:text-blue-400"
                >
                  {t('course-detail-19')}
                </th>
              </tr>
            </thead>
            <tbody>
              {courseData.documents.map((documentFile, index) => (
                <tr key={index} className="bg-white dark:bg-slate-900/78">
                  <th
                    scope="row"
                    className="px-6 py-4 text-base font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <a
                      target="_blank"
                      href={documentFile.fileUrl}
                      className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
                      rel="noreferrer"
                    >
                      {documentFile.title}
                      <svg
                        className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                        />
                      </svg>
                    </a>
                  </th>
                </tr>
              ))}
              <tr className="bg-white dark:bg-slate-900/78">
                <th
                  scope="row"
                  className="px-6 rounded-b-lg py-4 font-medium text-gray-900 dark:text-white"
                ></th>
              </tr>
            </tbody>
          </table>
        )}
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
