import courses from "../datas/courses.json"
import { Course } from "../types/course"


export const getActiveCourses = (): Course[] => {
  return Object.values(courses)
  .filter((course) => course.isActive)
}