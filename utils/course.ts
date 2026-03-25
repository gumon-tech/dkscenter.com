import { Course } from '../types/course';
import {
  getActiveLocalizedCourses,
  getCoursesWithUpcomingSchedules,
} from '../lib/courses/repository';

export const getActiveCourses = (currentLanguage = 'en'): Course[] => {
  return getActiveLocalizedCourses(currentLanguage) as Course[];
};

export const removeCoursesOutDate = (courses: Course[] = []): Course[] => {
  if (!courses.length) return [];
  return courses
    .map((course) => {
      const upcomingMatch = getCoursesWithUpcomingSchedules(course.locale).find(
        (candidate) => candidate.key === course.key,
      );
      return upcomingMatch || null;
    })
    .filter(Boolean) as Course[];
};
