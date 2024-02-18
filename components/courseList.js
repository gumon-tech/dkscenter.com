import courses from "../datas/courses.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function CourseList(props) {
  return (
    <div className="container mx-auto">
      <h2 className="max-w-2xl px-7 mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
        Course
      </h2>
      <div className="w-full px-7 ">
        {Object.values(courses)
          .filter((course) => course.isActive)
          .map((course, index) => (
            <CourseCard key={index} courseData={course} />
          ))}
      </div>
    </div>
  );
}

const CourseCard = ({ courseData }) => {
  return (
    <>
      <div className="flex mt-10 flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div
          className="basis-3/4 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              courseData.imageUrl
                ? courseData.imageUrl
                : "/img/DKS_01_Logo_Ori.png"
            })`,
          }}
        ></div>

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {courseData.title}
          </h5>
          <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase mb-2">
            {courseData.code}{" "}
            <FontAwesomeIcon
              className="inline"
              icon={faCircle}
              width={10}
              height={10}
            />{" "}
            {courseData.duration}
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {courseData.overview}
          </p>
          <div>
            <a
              target="_blank"
              href={courseData.detailUrl}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
