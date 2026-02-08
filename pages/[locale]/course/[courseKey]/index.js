import React from 'react';
import Head from 'next/head';
import Navbar from '/components/navbar';
import Footer from '/components/footer';
import CourseDetail from '/components/courseDetail';
import courses from '/datas/courses.json';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { normalizeBrand } from '/lib/brand';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dkscenter.gumon.io';

const Course = ({ courseData, courseKey }) => {
  const i18next = useTranslation('home');
  const { i18n } = i18next;

  const currentLanguage = i18n.language; // 'en' | 'th'
  const courseLocaleData = courseData[currentLanguage];

  const localeNaming = currentLanguage === 'th' ? 'th_TH' : 'en_US';

  const canonicalUrl = `${SITE_URL}/${currentLanguage}/course/${courseKey}`;
  const ogImage = courseLocaleData.imageUrl
    ? `${SITE_URL}${courseLocaleData.imageUrl}`
    : undefined;

  return (
    <>
      <Head>
        {/* Title & Description */}
        <title>
          {`${courseLocaleData.title} | DKS Center - Digital Knowledge Sharing Center`}
        </title>
        <meta
          name="description"
          content={`${courseLocaleData.title} | ${courseLocaleData.overview}`}
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* hreflang */}
        <link
          rel="alternate"
          hrefLang="en"
          href={`${SITE_URL}/en/course/${courseKey}`}
        />
        <link
          rel="alternate"
          hrefLang="th"
          href={`${SITE_URL}/th/course/${courseKey}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_URL}/en/course/${courseKey}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={courseLocaleData.title} />
        <meta
          property="og:description"
          content={courseLocaleData.overview}
        />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="DKS Center" />
        <meta property="og:locale" content={localeNaming} />
        <meta
          property="og:locale:alternate"
          content={localeNaming === 'th_TH' ? 'en_US' : 'th_TH'}
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={courseLocaleData.title} />
        <meta
          name="twitter:description"
          content={courseLocaleData.overview}
        />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>

      <Navbar i18next={i18next} />
      <CourseDetail courseData={courseLocaleData} i18next={i18next} />
      <Footer i18next={i18next} />
    </>
  );
};

export const getStaticPaths = () => {
  const courseKeyList = Object.keys(courses);
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
    const courseData = courses[courseKey];

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
    courseKey,              // ✅ STEP 2.2
    pageType: 'course_detail',
    brandOwner,
  };
}

export default Course;
