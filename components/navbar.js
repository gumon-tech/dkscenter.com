/* eslint-disable react/prop-types */
import React from 'react';
import ThemeChanger from './DarkSwitch';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import Link from '/components/link';
import { useRouter } from 'next/router';
import LanguageSwitchLink from './LanguageSwitchLink';
import { defaultLocale, locales } from '../lib/i18n/config';
import { MAIN_NAVIGATION } from '../lib/content/site';
import PageContainer from './ui/page-container';

export default function Navbar(props) {
  const router = useRouter();
  const i18next = props.i18next;
  const { t } = i18next;

  const currentLocale = router.query.locale || defaultLocale;

  return (
    <div className="w-full border-b border-border/70 bg-surface/95 backdrop-blur">
      <PageContainer className="relative flex flex-wrap items-center justify-between py-6 lg:justify-between">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo_2_sq.png"
                        alt="DKS"
                        width="200"
                        height="32"
                        className="w-20"
                      />
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {MAIN_NAVIGATION.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="w-full px-4 py-2 -ml-4 text-muted rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {t(`nav-${item.key}`)}
                      </Link>
                    ))}

                    {locales.map((locale) => {
                      if (locale === currentLocale) return null;
                      return (
                        <LanguageSwitchLink
                          className={
                            'w-full px-4 py-2 -ml-4 text-muted rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 dark:focus:bg-gray-800 focus:outline-none'
                          }
                          locale={locale}
                          key={locale}
                        />
                      );
                    })}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {MAIN_NAVIGATION.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-base font-medium text-text no-underline rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 focus:outline-none dark:focus:bg-gray-800"
                >
                  {t(`nav-${menu.key}`)}
                </Link>
              </li>
            ))}

            <li className="mr-3 nav__item" key="LanguageSwitchLink">
              {locales.map((locale) => {
                if (locale === currentLocale) return null;
                return (
                  <LanguageSwitchLink
                    className={
                      'inline-block px-4 py-2 text-base font-medium text-text no-underline rounded-md hover:text-primary focus:text-primary focus:bg-primary/10 focus:outline-none dark:focus:bg-gray-800'
                    }
                    locale={locale}
                    key={locale}
                  />
                );
              })}
            </li>
          </ul>

          <ThemeChanger />
        </div>
      </PageContainer>
    </div>
  );
}
