/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';
import CourseScheduleOverview from '/components/course/course-schedule-overview';
import {
  getCourseByKey,
  getLocalizedCourseSchedulePaths,
  getScheduleByKey,
} from '/lib/courses/repository';

const CourseSchedule = ({ courseData, scheduleData }) => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;
  const router = useRouter();
  const { code } = router.query;
  const currentLanguage = i18n.language || courseData.locale || 'en';

  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path={`/course/${courseData.key}/schedule/${scheduleData.scheduleKey}`}
        title={scheduleData.title || courseData.title}
        description={courseData.overview}
        image={courseData.imageUrl}
      />
      <SiteShell i18next={i18next}>
        <CourseScheduleOverview
          courseData={courseData}
          scheduleData={scheduleData}
          i18next={i18next}
          discountCode={code}
        />
      </SiteShell>
    </>
  );
};

export const getStaticPaths = () => {
  return { paths: getLocalizedCourseSchedulePaths(), fallback: false };
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
  const scheduleKey = ctx?.params?.scheduleKey;
  const courseLocaleData = courseData[locale];
  const scheduleData = getScheduleByKey(courseLocaleData, scheduleKey);
  const props = {
    ...(await serverSideTranslations(locale, ns)),
    courseData: courseLocaleData,
    scheduleData: scheduleData,
  };
  return props;
}

export default CourseSchedule;
