import courses from "../datas/courses.json";
import { Course } from "../types/course";

export const getActiveCourses = (currentLanguage = "en"): Course[] => {
  return Object.values(courses)
    .map((course) => course[currentLanguage])
    .filter((course) => course.isActive);
};
