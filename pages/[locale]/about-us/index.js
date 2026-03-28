/* eslint-disable react/prop-types */
import React from 'react';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { faFacebook, faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';
import Container from '../../../components/container';
import Heading from '../../../components/ui/heading';
import Card from '../../../components/ui/card';
import Badge from '../../../components/ui/badge';
import Button from '../../../components/ui/button';
import { getAboutPageSeo } from '../../../lib/seo';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const AboutUs = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  const seo = getAboutPageSeo(currentLanguage);
  return (
    <>
      <SeoHead {...seo} />
      <SiteShell i18next={i18next}>
        <Container className="pb-section lg:pb-section-lg">
          <section className="pt-section-sm lg:pt-section">
            <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="theme-hero-surface rounded-[36px] px-6 py-8 sm:px-8 lg:px-10">
                <Badge className="text-primary-strong">
                  {t('nav-about-us')}
                </Badge>
                <h1 className="theme-hero-heading mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  {currentLanguage === 'th'
                    ? 'คุยกับทีม DKS เพื่อเลือกคอร์สที่เหมาะกับคุณ'
                    : 'Talk to DKS to find the right course for your team or career path.'}
                </h1>
                <p className="theme-hero-copy mt-5 max-w-3xl text-base leading-8 sm:text-lg">
                  {t('about-us-1')}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button as="a" href="mailto:dkscenter@gumon.io">
                    {currentLanguage === 'th' ? 'ส่งอีเมลหาเรา' : 'Email Us'}
                  </Button>
                  <Button
                    as="a"
                    href="https://lin.ee/xyZvMd2"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    LINE Contact
                  </Button>
                </div>
              </div>

              <Card className="p-5 sm:p-6">
                <Heading
                  eyebrow={
                    currentLanguage === 'th'
                      ? 'Contact Channels'
                      : 'Contact Channels'
                  }
                  title={
                    currentLanguage === 'th'
                      ? 'ช่องทางติดต่อทั้งหมด'
                      : 'All the ways to reach us'
                  }
                  description={
                    currentLanguage === 'th'
                      ? 'เหมาะสำหรับสอบถามรายละเอียดคอร์ส รอบเรียน ราคา in-house training หรือคำถามก่อนตัดสินใจ'
                      : 'Use these channels for course details, upcoming cohorts, pricing, in-house training, or pre-enrollment questions.'
                  }
                />
                <div className="mt-6 grid gap-4">
                  <Contact
                    title="dkscenter@gumon.io"
                    href="mailto:dkscenter@gumon.io"
                    description={
                      currentLanguage === 'th'
                        ? 'ตอบกลับรายละเอียดคอร์สและการอบรม'
                        : 'Course inquiries and training coordination'
                    }
                    icon={<AtSymbolIcon />}
                  />
                  <Contact
                    title="DKS Center"
                    href="https://www.facebook.com/dks.share"
                    description={
                      currentLanguage === 'th'
                        ? 'ข่าวสาร คอร์สใหม่ และกิจกรรม'
                        : 'Updates, new courses, and community activity'
                    }
                    icon={
                      <FontAwesomeIcon
                        icon={faFacebook}
                        width={22}
                        height={22}
                      />
                    }
                  />
                  <Contact
                    title="@dks.share"
                    href="https://lin.ee/xyZvMd2"
                    description={
                      currentLanguage === 'th'
                        ? 'สอบถามเร็วที่สุดผ่าน LINE'
                        : 'Fastest support via LINE'
                    }
                    icon={
                      <FontAwesomeIcon icon={faLine} width={22} height={22} />
                    }
                  />
                </div>
              </Card>
            </div>
          </section>
        </Container>
      </SiteShell>
    </>
  );
};

function Contact(props) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-start gap-4 rounded-[28px] border border-border/70 bg-surface px-4 py-4 hover:border-primary/25 hover:bg-surface-elevated"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
        {React.cloneElement(props.icon, {
          className: 'h-6 w-6 text-white',
        })}
      </div>
      <div>
        <h4 className="text-base font-semibold text-text">{props.title}</h4>
        <p className="mt-1 text-sm leading-7 text-muted">{props.description}</p>
      </div>
    </a>
  );
}

export default AboutUs;
