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
    <Container className="pb-section lg:pb-section-lg">
      {props.breadcrumb && (
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      )}
      <Heading
        eyebrow={currentLanguage === 'th' ? 'Course Catalog' : 'Course Catalog'}
        title={t('course-list-1')}
        description={
          currentLanguage === 'th'
            ? 'หลักสูตรทั้งหมดถูกจัดวางใหม่ให้สแกนง่าย เปรียบเทียบเร็ว และตัดสินใจได้ชัดเจนขึ้นทั้งบนเดสก์ท็อปและมือถือ'
            : 'A clearer course catalog with stronger hierarchy, cleaner comparison, and a sharper path from discovery to registration.'
        }
        className="mt-6"
      />
      <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
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
