import Container from "./container";
import Link from "next/link";
import Breadcrumb from "./breadcrumb";
import dayjs from "dayjs";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const CourseDetail = ({ courseData }) => {
  return !courseData ? (
    <Container>
      <Breadcrumb paths={[{ title: "Training Course", path: "/course" }]} />
      No data.
    </Container>
  ) : (
    <Container>
      <Breadcrumb
        paths={[
          { title: "Training Course", path: "/course" },
          { title: courseData.code, path: `/course/${courseData.code}` },
        ]}
      />
      <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
        {courseData.title}
      </h2>
      {courseData.lastUpdate && (
        <div className="text-sm font-bold tracking-wider text-indigo-700 dark:text-indigo-400 uppercase mt-2">
          last updated on:{" "}
          {dayjs(courseData.lastUpdate).format("D MMM YYYY, HH:mm")}
        </div>
      )}

      <div className="flex flex-wrap">
        <div className="md:w-full xl:basis-8/12 lg:pr-5">
          <p className="my-5 text-gray-700 dark:text-gray-400">
            {courseData.overview}
          </p>
          {courseData.imageUrl && (
            <img
              src={courseData.imageUrl}
              className="w-full"
              alt={courseData.title}
            />
          )}
          {courseData.objectives && courseData.objectives.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                OBJECTIVES
              </h3>
              <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                {courseData.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </>
          )}
          {courseData.whoShouldAttend &&
            courseData.whoShouldAttend.length > 0 && (
              <>
                <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                  WHO SHOULD ATTEND?
                </h3>
                <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                  {courseData.whoShouldAttend.map((whoShouldAttend, index) => (
                    <li key={index}>{whoShouldAttend}</li>
                  ))}
                </ul>
              </>
            )}
          {courseData.prerequisites && courseData.prerequisites.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                PREREQUISITES
              </h3>
              <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                {courseData.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </>
          )}
          {courseData.participantsWillReceive &&
            courseData.participantsWillReceive.length > 0 && (
              <>
                <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                  ALL PARTICIPANTS WILL RECEIVE
                </h3>
                <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                  {courseData.participantsWillReceive.map(
                    (participantsWillReceive, index) => (
                      <li key={index}>{participantsWillReceive}</li>
                    )
                  )}
                </ul>
              </>
            )}
          {courseData.outline && courseData.outline.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                OUTLINE
              </h3>
              <ol className="list-decimal text-gray-700 dark:text-gray-400 p-5">
                {courseData.outline.map((outline, index) => (
                  <li key={index}>
                    {outline.title}

                    {outline.descriptions &&
                      outline.descriptions.length > 0 && (
                        <ul className="list-disc text-gray-700 dark:text-gray-400 px-5">
                          {outline.descriptions.map((description, index) => (
                            <li key={index}>{description}</li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <div className="md:w-full xl:basis-4/12">
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
                    return (
                      <tr key={index} className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4">
                          <h3 className="text-indigo-700 dark:text-indigo-400">
                            {publicSchedule.ticketUrl ? (
                              <a
                                target="_blank"
                                href={publicSchedule.ticketUrl}
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
                          {publicSchedule.isSoldOut && !isSaleEnded && (
                            <span className="text-red-600 font-bold">
                              SOLD OUT
                            </span>
                          )}

                          {isSaleEnded && (
                            <span className="text-gray-700 dark:text-gray-400 font-bold">
                              ENDED
                            </span>
                          )}

                          {!isSaleEnded &&
                          !publicSchedule.isSoldOut &&
                          publicSchedule.ticketUrl ? (
                            <a
                              target="_blank"
                              href={publicSchedule.ticketUrl}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Get Yours!
                            </a>
                          ) : (
                            "COMING SOON!"
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
      </div>
    </Container>
  );
};

export default CourseDetail;
