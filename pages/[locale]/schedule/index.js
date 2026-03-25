import React from 'react';
import Container from '../../../components/container';
import Table from '../../../components/table';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';
import Heading from '../../../components/ui/heading';
import Badge from '../../../components/ui/badge';

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
        <Container className="pb-section lg:pb-section-lg">
          <section className="pt-section-sm lg:pt-section">
            <div className="rounded-[36px] border border-border/70 bg-surface-glass px-6 py-8 shadow-panel backdrop-blur-2xl sm:px-8 lg:px-10">
              <Badge>{currentLanguage === 'th' ? 'Training Calendar' : 'Training Calendar'}</Badge>
              <Heading
                title={t('nav-schedule')}
                description={
                  currentLanguage === 'th'
                    ? 'รวมรอบอบรมที่เปิดรับทั้งหมดในรูปแบบที่อ่านง่ายขึ้น เปรียบเทียบคอร์ส ระยะเวลา และกำหนดการได้ในหน้าเดียว'
                    : 'A cleaner training calendar for comparing live course rounds, durations, and upcoming dates in one place.'
                }
                className="mt-5 max-w-4xl"
              />
            </div>
          </section>
          <div className="mt-8 w-full text-center">
            <Table i18next={i18next} />
          </div>
        </Container>
      </SiteShell>
    </>
  );
};

export default Schedule;
