import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "/components/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "/components/modal";
import TicketSales from "/components/TicketSales";
import TicketSaleModalManage from "./ticketSaleModal/ticketSaleModalManage";

const CourseDetailLink = ({
  courseData,
  i18next,
  className,
  registerBottom,
  registerRight,
}) => {
  const { t, i18n } = i18next;
  const router = useRouter();
  const { code } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleKey, setScheduleKey] = useState("");

  const openModal = (scheduleKey) => {
    setScheduleKey(scheduleKey);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={className}>
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 mb-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 rounded-t-lg text-xl mt-5 text-blue-700 dark:text-blue-400 font-bold"
              >
                {t("course-detail-8")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="rounded-b-lg px-6 py-4 font-bold text-gray-700 dark:text-gray-400"
              >
                {courseData.duration}
              </th>
            </tr>
          </tbody>
        </table>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                colSpan={2}
                className="px-6 py-3 rounded-t-lg text-xl mt-5 text-blue-700 dark:text-blue-400 font-bold"
              >
                {t("course-detail-9")}
              </th>
            </tr>
          </thead>
          <tbody>
            {courseData.publicSchedule &&
            courseData.publicSchedule.filter(
              (publicSchedule) => publicSchedule.isActive
            ).length > 0 ? (
              courseData.publicSchedule
                .filter((publicSchedule) => publicSchedule.isActive)
                .map((publicSchedule, index) => {
                  const eventStartDate = dayjs(
                    publicSchedule.eventStart
                  ).format("D MMM YYYY");
                  const eventEndDate = dayjs(publicSchedule.eventEnd).format(
                    "D MMM YYYY"
                  );

                  const eventStartTime = dayjs(
                    publicSchedule.eventStart
                  ).format("HH:mm");
                  const eventEndTime = dayjs(publicSchedule.eventEnd).format(
                    "HH:mm"
                  );

                  const isSaleEnded = dayjs().isAfter(
                    dayjs(publicSchedule.saleEnd)
                  );

                  // ไม่ตรงเงือนไข จะแสดงสิ่งนี้
                  let courseType = "COMING_SOON";
                  // หมดช่วงเวลาขาย
                  if (isSaleEnded) courseType = "ENDED";
                  // ยังอยู่ช่วงเวลาขาย + ขายหมดแล้ว
                  if (!isSaleEnded && publicSchedule.isSoldOut) {
                    courseType = "SOLD_OUT";
                  }
                  // ยังอยู่ช่วงเวลาขาย + ขายไม่หมด + มีลิ้งขาย
                  if (
                    !isSaleEnded &&
                    !publicSchedule.isSoldOut &&
                    publicSchedule.ticketUrl
                  ) {
                    courseType = "GET_YOURS";
                  }

                  if (
                    !isSaleEnded &&
                    !publicSchedule.isSoldOut &&
                    !publicSchedule.ticketUrl &&
                    publicSchedule.scheduleKey
                  ) {
                    courseType = "GET_YOURS_2";
                  }

                  return (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4">
                        <h3 className="text-indigo-700 dark:text-indigo-400">
                          {publicSchedule.ticketUrl ? (
                            <a
                              target="_blank"
                              href={
                                publicSchedule.ticketUrl +
                                (!!code ? "?discount_code=" + code : "")
                              }
                            >
                              {publicSchedule.title}
                            </a>
                          ) : publicSchedule.scheduleKey ? (
                            <>
                              <a
                                href="#"
                                onClick={() =>
                                  openModal(publicSchedule.scheduleKey)
                                }
                              >
                                {publicSchedule.title}
                              </a>
                            </>
                          ) : (
                            publicSchedule.title
                          )}
                        </h3>
                        <div className="flex text-gray-700 dark:text-gray-400 font-light">
                          <p className="w-5 h-5 mr-1">
                            <CalendarIcon />
                          </p>{" "}
                          <p>{eventStartDate}</p>
                          {eventStartDate !== eventEndDate && (
                            <p className="pl-1">- {eventEndDate}</p>
                          )}
                        </div>
                        <div className="flex text-gray-700 dark:text-gray-400 font-light">
                          <p className="w-5 h-5 mr-1">
                            <ClockIcon />
                          </p>{" "}
                          <p>{eventStartTime}</p>
                          <p className="pl-1">- {eventEndTime}</p>
                        </div>
                        {publicSchedule.location && (
                          <div className="flex text-gray-700 dark:text-gray-400 font-light">
                            <p className="w-5 h-5 mr-1">
                              <MapPinIcon />
                            </p>{" "}
                            <p>{publicSchedule.location}</p>
                          </div>
                        )}

                        {courseType === "GET_YOURS" && registerBottom && (
                          <a
                            target="_blank"
                            href={
                              publicSchedule.ticketUrl +
                              (!!code ? "?discount_code=" + code : "")
                            }
                            className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {t("course-detail-16")}
                          </a>
                        )}

                        {courseType === "GET_YOURS_2" && registerBottom && (
                          <>
                            <nav>
                              <button
                                className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() =>
                                  openModal(publicSchedule.scheduleKey)
                                }
                              >
                                {t("course-detail-16")}
                              </button>
                            </nav>
                          </>
                        )}
                      </th>
                      <td>
                        {courseType === "COMING_SOON" && "COMING SOON!"}
                        {courseType === "ENDED" && (
                          <span className="text-gray-700 dark:text-gray-400 font-bold">
                            {t("course-detail-14")}
                          </span>
                        )}
                        {courseType === "SOLD_OUT" && (
                          <span className="text-red-600 font-bold">
                            {t("course-detail-15")}
                          </span>
                        )}

                        {courseType === "GET_YOURS" && registerRight && (
                          <a
                            target="_blank"
                            href={
                              publicSchedule.ticketUrl +
                              (!!code ? "?discount_code=" + code : "")
                            }
                            className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {t("course-detail-16")}
                          </a>
                        )}

                        {courseType === "GET_YOURS_2" && registerRight && (
                          <nav>
                            <button
                              className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() =>
                                openModal(publicSchedule.scheduleKey)
                              }
                            >
                              {t("course-detail-16")}
                            </button>
                          </nav>
                        )}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  colSpan={2}
                  className="px-6 rounded-t-lg py-4 font-medium text-gray-900 dark:text-white"
                >
                  {t("course-detail-17")}
                </th>
              </tr>
            )}
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                colSpan={2}
                className="px-6 rounded-b-lg py-4 font-medium text-gray-900 dark:text-white"
              >
                <Link
                  href={"/about-us"}
                  className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("course-detail-18")}
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

        {courseData.documents && courseData.documents.length > 0 && (
          <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 mb-5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 rounded-t-lg text-xl mt-5 text-blue-700 dark:text-blue-400 font-bold"
                >
                  {t("course-detail-19")}
                </th>
              </tr>
            </thead>
            <tbody>
              {courseData.documents.map((documentFile, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400"
                  >
                    <a
                      target="_blank"
                      href={documentFile.fileUrl}
                      className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
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
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 rounded-b-lg py-4 font-medium text-gray-900 dark:text-white"
                ></th>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title="Ticket">
        <TicketSaleModalManage
          courseKey={courseData.key}
          scheduleKey={scheduleKey}
          discountCodeURL={code}
          i18next={i18next}
        />
      </Modal>
    </>
  );
};

export default CourseDetailLink;
