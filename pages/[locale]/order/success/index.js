import React from 'react';
import FetchSuccessDetail from '/components/fetchSuccessDetail';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import { useRouter } from 'next/router';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';
import { getOrderPageSeo } from '/lib/seo';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Success = () => {
  const router = useRouter();
  const { order } = router.query;

  const i18next = useTranslation('home');
  const { i18n } = i18next;
  const currentLanguage = i18n.language || 'en';
  const seo = getOrderPageSeo(currentLanguage, 'success');
  return (
    <>
      <SeoHead {...seo} />
      <SiteShell i18next={i18next}>
        <FetchSuccessDetail i18next={i18next} orderId={order} mode="success" />
      </SiteShell>
    </>
  );
};

export default Success;
