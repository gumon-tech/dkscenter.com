/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CourseDetail from '/components/courseDetail';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';
import { getCourseByKey, getCourseKeys } from '/lib/courses/repository';
import { getCourseScheduleIndexSeo } from '/lib/seo';

const CourseSchedule = ({ courseData }) => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;
  const currentLanguage = i18n.language;
  const courseLocaleData = courseData[currentLanguage];
  const seo = getCourseScheduleIndexSeo(courseLocaleData, currentLanguage);

  return (
    <>
      <SeoHead {...seo} />
      <SiteShell i18next={i18next}>
        <CourseDetail courseData={courseLocaleData} i18next={i18next} />
      </SiteShell>
    </>
  );
};

export const getStaticPaths = () => {
  const courseKeyList = getCourseKeys();
  const paths = [];
  const locales = ['en', 'th'];
  for (const courseKey of courseKeyList) {
    for (const locale of locales) {
      paths.push({
        params: { courseKey: courseKey, locale: locale },
      });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = makeStaticProps(['home']);

function makeStaticProps(ns = {}) {
  return async function getStaticProps(ctx) {
    const courseKey = ctx.params?.courseKey || '';
    const courseData = getCourseByKey(courseKey);
    return {
      props: await getI18nProps(ctx, ns, courseData),
    };
  };
}

async function getI18nProps(ctx, ns = ['home'], courseData) {
  const locale = ctx?.params?.locale;
  const props = {
    ...(await serverSideTranslations(locale, ns)),
    courseData: courseData,
  };
  return props;
}

export default CourseSchedule;
