/* eslint-disable react/prop-types */
import React from 'react';
import CourseDetail from '/components/courseDetail';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { normalizeBrand } from '/lib/brand';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';
import { getCourseByKey, getCourseKeys } from '/lib/courses/repository';

const Course = ({ courseData, courseKey }) => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;

  const currentLanguage = i18n.language; // 'en' | 'th'
  const courseLocaleData = courseData[currentLanguage];

  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path={`/course/${courseKey}`}
        title={courseLocaleData.title}
        description={courseLocaleData.overview}
        image={courseLocaleData.imageUrl}
      />

      <SiteShell i18next={i18next}>
        <CourseDetail courseData={courseLocaleData} i18next={i18next} />
      </SiteShell>
    </>
  );
};

export const getStaticPaths = () => {
  const courseKeyList = getCourseKeys();
  const locales = ['en', 'th'];

  const paths = [];
  for (const courseKey of courseKeyList) {
    for (const locale of locales) {
      paths.push({
        params: { courseKey, locale },
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
      props: await getI18nProps(ctx, ns, courseData, courseKey),
    };
  };
}

async function getI18nProps(ctx, ns = ['home'], courseData, courseKey) {
  const locale = ctx?.params?.locale;

  const localized = courseData?.[locale] || null;
  const brandOwner = normalizeBrand(localized?.brand);

  return {
    ...(await serverSideTranslations(locale, ns)),
    courseData,
    courseKey,
    pageType: 'course_detail',
    brandOwner,
  };
}

export default Course;
