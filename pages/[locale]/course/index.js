import React from 'react';
import Head from 'next/head';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import CourseList from '../../../components/courseList';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import { useRouter } from 'next/router';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Course = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;
  const domain = origin;

  let localeNaming = 'en_US';
  if (currentLanguage === 'th') localeNaming = 'TH_TH';
  return (
    <>
      <Head>
        <title>{t('head-title')}</title>
        <meta name="description" content={t('head-content')} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Protocol */}
        <meta property="og:title" content={t('head-title')} />
        <meta property="og:description" content={t('head-content')} />
        <meta property="og:image" content={domain + '/img/main_img.jpg'} />
        <meta property="og:url" content={URL} />
        <meta property="og:site_name" content={domain} />
        <meta property="og:locale" content={localeNaming} />
        <meta property="og:locale:alternate" content="TH_TH" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={t('head-title')} />
        <meta name="twitter:description" content={t('head-content')} />
        <meta name="twitter:image" content={domain + '/img/main_img.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar i18next={i18next} />
      <CourseList breadcrumb={true} i18next={i18next} />
      <Footer i18next={i18next} />
    </>
  );
};

export default Course;
