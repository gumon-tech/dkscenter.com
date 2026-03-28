import React from 'react';
import { RedirectRender } from '/lib/redirect';
import SeoHead from '/components/seo/seo-head';
import {
  getCourseByKey,
  getLocalizedCourseSchedulePaths,
} from '/lib/courses/repository';
import { getLegacyRedirectSeo } from '/lib/seo';

export const getStaticPaths = () => {
  const paths = getLocalizedCourseSchedulePaths().map((path) => ({
    params: {
      courseKey: path.params.courseKey,
      scheduleKey: path.params.scheduleKey,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = (context) => {
  const courseKey = context.params?.courseKey || '';
  const courseData = getCourseByKey(courseKey);
  return { props: { courseData } };
};

const Home = ({ courseData }) => {
  const courseLocaleData = courseData.en;
  const seo = getLegacyRedirectSeo(
    `/course/${courseLocaleData.key}/schedule`,
  );

  return RedirectRender(
    <>
      <SeoHead {...seo} image={courseLocaleData.imageUrl} />
    </>,
  );
};

export default Home;
