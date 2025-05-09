import React from 'react';
import Head from 'next/head';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import Hero from '../../../components/hero';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { faFacebook, faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '/lib/getStatic';
import { getStaticPaths } from '/lib/getStatic';
import { useRouter } from 'next/router';

const getStaticProps = makeStaticProps(['home']);
export { getStaticPaths, getStaticProps };

const AboutUs = () => {
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
        <meta property="og:image" content={domain + '/img/assistant1.jpg'} />
        <meta property="og:url" content={URL} />
        <meta property="og:site_name" content={domain} />
        <meta property="og:locale" content={localeNaming} />
        <meta property="og:locale:alternate" content="TH_TH" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={t('head-title')} />
        <meta name="twitter:description" content={t('head-content')} />
        <meta name="twitter:image" content={domain + '/img/assistant1.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar i18next={i18next} />
      <Hero i18next={i18next}>
        <>
          <p className="py-5 leading-normal text-gray-500  dark:text-gray-300">
            {t('about-us-1')}
          </p>

          <Contact
            title={
              <a target="_blank" href="mailto:dkscenter@gumon.io">
                dkscenter@gumon.io
              </a>
            }
            icon={<AtSymbolIcon />}
          />
          <Contact
            title={
              <>
                <a target="_blank" href="https://www.facebook.com/dks.share">
                  fb.com/dks.share
                </a>
              </>
            }
            icon={<FontAwesomeIcon icon={faFacebook} width={30} height={30} />}
          />
          {/* <Contact
            title={
              <>
                <a target="_blank" href="https://lin.ee/fnl0CuL">
                  @digitalknowledge
                </a>
              </>
            }
            icon={<FontAwesomeIcon icon={faLine} width={30} height={30} />}
          /> */}
        </>
      </Hero>
      <Footer i18next={i18next} />
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
