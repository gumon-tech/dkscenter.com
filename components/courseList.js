import courses from "../datas/courses.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Dotdotdot from "react-dotdotdot";
import Container from "./container";
import Link from "/components/link";
import Breadcrumb from "./breadcrumb";

export default function CourseList(props) {
  const i18next = props.i18next;
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;

  return (
    <Container>
      {props.breadcrumb && (
        <Breadcrumb paths={[{ title: "Training Course", path: "course" }]} />
      )}
      <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
        {t("course-list-1")}
      </h2>
      <div className="flex flex-wrap mt-5">
        {Object.values(courses)
          .map((course) => course[currentLanguage])
          .filter((course) => course.isActive)
          .map((course, index) => (
            <CourseCard key={index} courseData={course} i18next={i18next} />
          ))}
      </div>
    </Container>
  );
}

const CourseCard = ({ courseData, i18next }) => {
  const { t, i18n } = i18next;
  return (
    <div className="sm:w-full md:basis-1/2 lg:basis-1/3 p-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div
          className="rounded-t-lg h-60 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              courseData.imageUrl
                ? courseData.imageUrl
                : "/img/DKS_01_Logo_Ori.png"
            })`,
          }}
        ></div>
        <div className="p-5">
          <Link href={`/course/${courseData.key}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {courseData.title}
            </h5>
          </Link>
          <div className="text-sm font-bold tracking-wider text-indigo-700 dark:text-indigo-400 uppercase mb-2">
            {courseData.code}{" "}
            <FontAwesomeIcon
              className="inline"
              icon={faCircle}
              width={10}
              height={10}
            />{" "}
            {courseData.duration}
          </div>

          <Dotdotdot clamp={4}>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {courseData.overview}
            </p>
          </Dotdotdot>

          <Link
            href={`/course/${courseData.key}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t("course-list-2")}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
