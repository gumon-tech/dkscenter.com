import React from 'react';
import CourseList from '../../components/courseList';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import HighlightCourse from '../../components/highlightCourse';
import SeoHead from '../../components/seo/seo-head';
import SiteShell from '../../components/layout/site-shell';
import { getActiveLocalizedCourses } from '../../lib/courses/repository';
import { getHomePageSeo } from '../../lib/seo';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Home = () => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  const seo = getHomePageSeo(
    currentLanguage,
    getActiveLocalizedCourses(currentLanguage),
  );

  return (
    <>
      <SeoHead {...seo} />
      <SiteShell i18next={i18next}>
        <HighlightCourse i18next={i18next} />
        <CourseList i18next={i18next} />
      </SiteShell>
    </>
  );
};

export default Home;
