/* eslint-disable react/prop-types */
import React from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';
import Heading from './ui/heading';
import CourseCard from './course/course-card';
import { getActiveLocalizedCourses } from '../lib/courses/repository';

export default function CourseList(props) {
  const i18next = props.i18next;
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;
  const courses = getActiveLocalizedCourses(currentLanguage);

  return (
    <Container className="py-10 md:py-12">
      {props.breadcrumb && (
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      )}
      <Heading title={t('course-list-1')} className="mt-3" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.key}
            courseData={course}
            ctaLabel={t('course-list-2')}
          />
        ))}
      </div>
    </Container>
  );
}
