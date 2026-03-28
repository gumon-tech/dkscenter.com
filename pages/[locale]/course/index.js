import React from 'react';
import CourseList from '../../../components/courseList';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';
import { getActiveLocalizedCourses } from '../../../lib/courses/repository';
import { getCourseListingSeo } from '../../../lib/seo';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Course = () => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  const seo = getCourseListingSeo(
    currentLanguage,
    getActiveLocalizedCourses(currentLanguage),
  );
  return (
    <>
      <SeoHead {...seo} />
      <SiteShell i18next={i18next}>
        <CourseList breadcrumb={true} i18next={i18next} />
      </SiteShell>
    </>
  );
};

export default Course;
