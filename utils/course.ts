import courses from "../datas/courses.json";
import { Course, PublicSchedule } from "../types/course";
import dayjs from "dayjs";

export const getActiveCourses = (currentLanguage = "en"): Course[] => {
  return Object.values(courses)
    .map((course) => course[currentLanguage])
    .filter((course) => course.isActive);
};

export const removeCoursesOutDate = (courses: Course[] = []): Course[] => {
  const data: Course[] = [];

  for (const course of courses) {
    const publicSchedules: PublicSchedule[] = [];
    for (const publicSchedule of course.publicSchedule) {
      const isEventEnded = dayjs().isAfter(dayjs(publicSchedule.eventEnd));
      if (!isEventEnded && publicSchedule && publicSchedule.isActive) {
        publicSchedules.push(publicSchedule);
      }
    }
    if (publicSchedules.length > 0) {
      data.push({
        ...course,
        publicSchedule: publicSchedules,
      });
    }
  }
  return data;
};
