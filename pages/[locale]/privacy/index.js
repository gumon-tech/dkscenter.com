import React from 'react';
import SectionTitle from '/components/sectionTitle';
import PrivacyContentEN from '/components/privacy/content-en';
import PrivacyContentTH from '/components/privacy/content-th';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Privacy = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;

  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path="/privacy"
        title={t('nav-privacy')}
        description={t('head-content')}
      />
      <SiteShell i18next={i18next}>
        <SectionTitle pretitle={t('privacy-1')} title={t('privacy-2')}>
          {currentLanguage === 'th' && <PrivacyContentTH />}
          {currentLanguage === 'en' && <PrivacyContentEN />}
        </SectionTitle>
      </SiteShell>
    </>
  );
};

export default Privacy;
