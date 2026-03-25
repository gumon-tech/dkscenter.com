import React from 'react';
import CourseList from '../../../components/courseList';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Course = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path="/course"
        title={t('course-list-1')}
        description={t('head-content')}
      />
      <SiteShell i18next={i18next}>
        <CourseList breadcrumb={true} i18next={i18next} />
      </SiteShell>
    </>
  );
};

export default Course;
