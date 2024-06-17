import SectionTitle from "./sectionTitle";
import Link from "next/link";
import { getActiveCourses, removeCoursesOutDate } from "../utils/course";
import { useState, useEffect } from "react";
import { Course, PublicSchedule } from "../types/course";

const HighlightCourse = ({ i18next }) => {
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || "th";

  const [highlightCourse, setHighlightCourse] = useState({});
  const [highlightSchedule, setHighlightSchedule] = useState({});
  const [courseRef, setCourseHref] = useState(
    "/course/2024-007-modern-web-frontend-with-react"
  );

  useEffect(() => {
    let highlightCourse;
    let highlightSchedule;
    let courses = getActiveCourses(currentLanguage);
    courses = removeCoursesOutDate(courses);
    let minDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );

    for (const course of courses) {
      for (const publicSchedule of course.publicSchedule) {
        const isMinDate = new Date(publicSchedule.eventStart) - minDate < 0;
        if (isMinDate && publicSchedule) {
          highlightCourse = course;
          highlightSchedule = publicSchedule;
          minDate = new Date(publicSchedule.eventStart);
        }
      }
    }

    setHighlightCourse(highlightCourse);
    setHighlightSchedule(highlightSchedule);
    setCourseHref("/course/" + highlightCourse.key);
  }, [i18n.language]);

  return (
    <>
      <SectionTitle
        pretitle={t("sectionTitle-pretitle")}
        title={highlightSchedule?.title || t("sectionTitle-title")}
      >
        {highlightCourse?.overview || t("sectionTitle-detail1")}
        <p className="pt-8">
          <Link
            href={courseRef}
            className="mt-8 px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
          >
            {t("sectionTitle-detail2")}
          </Link>
        </p>
      </SectionTitle>
    </>
  );
};

export default HighlightCourse;
