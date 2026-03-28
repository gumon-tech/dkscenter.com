/* eslint-disable react/prop-types */
import React from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';
import Heading from './ui/heading';
import CourseCard from './course/course-card';
import Link from './link';
import { getActiveLocalizedCourses } from '../lib/courses/repository';

export default function CourseList(props) {
  const i18next = props.i18next;
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;
  const courses = getActiveLocalizedCourses(currentLanguage);

  return (
    <Container className="pb-[clamp(4rem,8vw,6.5rem)] lg:pb-[clamp(5rem,10vw,7.5rem)]">
      {props.breadcrumb && (
        <Breadcrumb
          homeLabel={currentLanguage === 'th' ? 'หน้าแรก' : 'Home'}
          paths={[
            {
              title: currentLanguage === 'th' ? 'คอร์ส' : 'Courses',
              path: '/course',
            },
          ]}
        />
      )}
      <section className="mt-7 rounded-[32px] border border-border/65 bg-[linear-gradient(180deg,var(--section-surface),var(--section-surface-alt))] px-5 py-7 shadow-soft backdrop-blur-sm sm:px-6 lg:mt-8 lg:px-8 lg:py-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading
            eyebrow={
              currentLanguage === 'th' ? 'Course Catalog' : 'Course Catalog'
            }
            title={t('course-list-1')}
            description={
              currentLanguage === 'th'
                ? 'สำรวจหลักสูตรอบรมที่คัดสรรมาเพื่อช่วยต่อยอดทักษะ และเปิดโอกาสใหม่ให้กับการทำงานของคุณ'
                : 'A clearer course catalog with stronger hierarchy, cleaner comparison, and a sharper path from discovery to registration.'
            }
            className="max-w-2xl gap-2"
          />
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:text-primary-strong"
          >
            {currentLanguage === 'th' ? 'ดูตารางอบรม' : 'View schedule'}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.key}
              courseData={course}
              ctaLabel={t('course-list-2')}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
