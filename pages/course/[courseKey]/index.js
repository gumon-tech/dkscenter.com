import React from 'react';
import { RedirectRender } from '/lib/redirect';
import SeoHead from '/components/seo/seo-head';
import { getCourseByKey, getCourseKeys } from '/lib/courses/repository';
import { getLegacyRedirectSeo } from '/lib/seo';

export const getStaticPaths = () => {
  return {
    paths: getCourseKeys().map((courseKey) => ({
      params: { courseKey },
    })),
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const courseKey = context.params?.courseKey || '';
  const courseData = getCourseByKey(courseKey);
  return { props: { courseData } };
};

const Home = ({ courseData }) => {
  const courseLocaleData = courseData.en;
  const seo = getLegacyRedirectSeo(`/course/${courseLocaleData.key}`);

  return RedirectRender(
    <>
      <SeoHead {...seo} image={courseLocaleData.imageUrl} />
    </>,
  );
};

export default Home;
