/* eslint-disable react/prop-types */
import React from 'react';
import Hero from '../../../components/hero';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { faFacebook, faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import SeoHead from '../../../components/seo/seo-head';
import SiteShell from '../../../components/layout/site-shell';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const AboutUs = () => {
  const i18next = useTranslation('home');
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language || 'th';
  return (
    <>
      <SeoHead
        locale={currentLanguage}
        path="/about-us"
        title={t('nav-about-us')}
        description={t('head-content')}
        image="/img/assistant1.jpg"
      />
      <SiteShell i18next={i18next}>
        <Hero i18next={i18next}>
          <>
            <p className="py-5 leading-normal text-gray-500  dark:text-gray-300">
              {t('about-us-1')}
            </p>

            <Contact
              title={
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:dkscenter@gumon.io"
                >
                  dkscenter@gumon.io
                </a>
              }
              icon={<AtSymbolIcon />}
            />
            <Contact
              title={
                <>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/dks.share"
                  >
                    DKS Center
                  </a>
                </>
              }
              icon={
                <FontAwesomeIcon icon={faFacebook} width={30} height={30} />
              }
            />
            <Contact
              title={
                <>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://lin.ee/xyZvMd2"
                  >
                    @dks.share
                  </a>
                </>
              }
              icon={<FontAwesomeIcon icon={faLine} width={30} height={30} />}
            />
          </>
        </Hero>
      </SiteShell>
    </>
  );
};

function Contact(props) {
  return (
    <>
      <div className="flex items-center mt-2 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: 'w-7 h-7 text-indigo-50',
          })}
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
            {props.title}
          </h4>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
