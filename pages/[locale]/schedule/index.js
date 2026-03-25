import React from 'react';
import Container from '../../../components/container';
import Table from '../../../components/table';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';
import Heading from '../../../components/ui/heading';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const Schedule = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';

  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path="/schedule"
        title={t('nav-schedule')}
        description={t('head-content')}
      />
      <SiteShell i18next={i18next}>
        <Container className="py-10 md:py-12">
          <Heading title={t('nav-schedule')} className="mb-8" />
          <div className="w-full text-center">
            <Table i18next={i18next} />
          </div>
        </Container>
      </SiteShell>
    </>
  );
};

export default Schedule;
