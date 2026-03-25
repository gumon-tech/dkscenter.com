/* eslint-disable react/prop-types */
import Link from '/components/link';
import Image from 'next/image';
import React from 'react';
import Container from './container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faSquareYoutube,
  faLine,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import LanguageSwitchLink from './LanguageSwitchLink';
import { FOOTER_NAVIGATION, LEGAL_NAVIGATION } from '../lib/content/site';
import { defaultLocale, locales } from '../lib/i18n/config';

export default function Footer(props) {
  const router = useRouter();
  const i18next = props.i18next;
  let { t } = i18next;
  const currentLocale = router.query.locale || defaultLocale;
  return (
    <div className="relative">
      <Container className="pt-12">
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-border lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {' '}
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-primary dark:text-gray-100"
              >
                <Image
                  src="/img/logo_2_sq.png"
                  alt="DKS"
                  width="200"
                  height="32"
                  className="w-20"
                />
              </Link>
            </div>

            <div className="max-w-md mt-4 text-muted">{t('footer')}</div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {FOOTER_NAVIGATION.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-muted rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {t(`nav-${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {LEGAL_NAVIGATION.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-muted rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {t(`nav-${item.key}`)}
                </Link>
              ))}
              {locales.map((locale) => {
                if (locale === currentLocale) return null;
                return (
                  <LanguageSwitchLink
                    className={
                      'w-full px-4 py-2 text-muted rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 focus:outline-none dark:focus:bg-trueGray-700'
                    }
                    locale={locale}
                    key={locale}
                  />
                );
              })}
            </div>
          </div>

          <div className="">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-soft">
              {t('footer-follow-us')}
            </div>

            <div className="flex mt-5 space-x-5 text-soft">
              <a
                target="_blank"
                href="https://www.facebook.com/dks.share"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} width={30} height={30} />
              </a>
              <a target="_blank" href="https://lin.ee/fnl0CuL" rel="noreferrer">
                <FontAwesomeIcon icon={faLine} width={30} height={30} />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@dkscenter"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faSquareYoutube}
                  width={30}
                  height={30}
                />
              </a>
              <a
                target="_blank"
                href="mailto:sales@dkscenter.com"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faEnvelope} width={30} height={30} />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-soft">
          {t('footer-copyright')} © {new Date().getFullYear()}. Made with ♥ by{' '}
          <a href="https://gumon.io/" target="_blank" rel="noopener noreferrer">
            Gumon.io
          </a>
        </div>
      </Container>
    </div>
  );
}
