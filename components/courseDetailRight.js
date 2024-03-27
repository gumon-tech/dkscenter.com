import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const CourseDetailRight = ({ courseData, className }) => {
  const router = useRouter();
  const { code } = router.query;
  return (
    <div className={className ? className : "md:w-full xl:basis-4/12"}>
      <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 mb-5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 rounded-t-lg text-xl mt-5 text-blue-700 dark:text-blue-400 font-bold"
            >
              DURATION
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
              Public Training Schedule
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
                const eventStartDate = dayjs(publicSchedule.eventStart).format(
                  "D MMM YYYY"
                );
                const eventEndDate = dayjs(publicSchedule.eventEnd).format(
                  "D MMM YYYY"
                );

                const eventStartTime = dayjs(publicSchedule.eventStart).format(
                  "HH:mm"
                );
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
                    </th>
                    <td className="px-6 py-4 text-center">
                      {courseType === "COMING_SOON" && "COMING SOON!"}
                      {courseType === "ENDED" && (
                        <span className="text-gray-700 dark:text-gray-400 font-bold">
                          ENDED
                        </span>
                      )}
                      {courseType === "SOLD_OUT" && (
                        <span className="text-red-600 font-bold">SOLD OUT</span>
                      )}
                      {courseType === "GET_YOURS" && (
                        <a
                          target="_blank"
                          href={
                            publicSchedule.ticketUrl +
                            (!!code ? "?discount_code=" + code : "")
                          }
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Get Yours!
                        </a>
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
                No schedule is currently available for the public training
                course.
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
                Special offer? Please contact us!
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
                DOCUMENT
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
  );
};

export default CourseDetailRight;
