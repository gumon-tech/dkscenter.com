import React from 'react';
import CourseList from '../../components/courseList';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import HighlightCourse from '../../components/highlightCourse';
import SeoHead from '../../components/seo/seo-head';
import SiteShell from '../../components/layout/site-shell';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Home = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';

  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path=""
        title={t('head-title')}
        description={t('head-content')}
      />
      <SiteShell i18next={i18next}>
        <HighlightCourse i18next={i18next} />
        <CourseList i18next={i18next} />
      </SiteShell>
    </>
  );
};

export default Home;
