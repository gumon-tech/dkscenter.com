import React from 'react';
import PrivacyContentEN from '/components/privacy/content-en';
import PrivacyContentTH from '/components/privacy/content-th';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '/components/seo/seo-head';
import SiteShell from '/components/layout/site-shell';
import Container from '/components/container';
import Heading from '/components/ui/heading';
import Card from '/components/ui/card';
import Badge from '/components/ui/badge';

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
        <Container className="pb-section lg:pb-section-lg">
          <section className="pt-section-sm lg:pt-section">
            <div className="rounded-[36px] border border-border/70 bg-surface-glass px-6 py-8 shadow-panel backdrop-blur-2xl sm:px-8 lg:px-10">
              <Badge>{t('privacy-1')}</Badge>
              <Heading
                title={t('privacy-2')}
                description={
                  currentLanguage === 'th'
                    ? 'สรุปแนวทางการเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลในรูปแบบที่อ่านง่ายขึ้น โดยคงเนื้อหาหลักครบถ้วน'
                    : 'A cleaner, more readable presentation of how personal data is collected, used, disclosed, and protected.'
                }
                className="mt-5 max-w-4xl"
              />
            </div>
          </section>

          <Card className="mt-8 p-6 sm:p-8 lg:p-10">
            <div className="[&_b]:font-semibold [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:!text-primary [&_li]:leading-8 [&_li]:text-muted [&_p]:leading-8 [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
              {currentLanguage === 'th' && <PrivacyContentTH />}
              {currentLanguage === 'en' && <PrivacyContentEN />}
            </div>
          </Card>
        </Container>
      </SiteShell>
    </>
  );
};

export default Privacy;
