/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import Link from '/components/link';
import { useRouter } from 'next/router';
import LanguageSwitchLink from './LanguageSwitchLink';
import { defaultLocale, locales } from '../lib/i18n/config';
import { MAIN_NAVIGATION } from '../lib/content/site';
import PageContainer from './ui/page-container';
import Button from './ui/button';

export default function Navbar(props) {
  const router = useRouter();
  const i18next = props.i18next;
  const { t, i18n } = i18next;

  const currentLocale = router.query.locale || defaultLocale;
  const currentLanguage = i18n.language || 'th';
  const brandTagline = t('brand-tagline');
  const safeBrandTagline =
    brandTagline === 'brand-tagline'
      ? currentLanguage === 'th'
        ? 'การเรียนรู้เทคโนโลยีที่นำไปใช้ได้จริง'
        : 'Practical tech learning'
      : brandTagline;

  return (
    <div className="sticky top-0 z-50 w-full">
      <PageContainer className="pt-5">
        <Disclosure>
          {({ open }) => (
            <div className="rounded-[30px] border border-border/70 bg-surface-glass shadow-panel backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-7 lg:py-5">
                <div className="flex items-center gap-4">
                  <Link href="/" className="group">
                    <span className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center">
                        <Image
                          src="/img/logo_2_sq.png"
                          alt="DKS"
                          width="40"
                          height="40"
                          className="h-10 w-10 object-contain"
                        />
                      </span>
                      <span className="hidden min-[420px]:block">
                        <span className="block text-[13px] font-semibold uppercase tracking-[0.28em] text-primary">
                          DKS Center
                        </span>
                        <span className="mt-0.5 block text-sm text-soft">
                          {safeBrandTagline}
                        </span>
                      </span>
                    </span>
                  </Link>
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                  <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-surface/80 p-1.5">
                    {MAIN_NAVIGATION.map((menu, index) => (
                      <Link
                        key={index}
                        href={menu.href}
                        className="rounded-full px-4 py-2.5 text-sm font-medium text-muted hover:bg-surface-elevated hover:text-text"
                      >
                        {t(`nav-${menu.key}`)}
                      </Link>
                    ))}
                  </nav>

                  {locales.map((locale) => {
                    if (locale === currentLocale) return null;
                    return (
                      <LanguageSwitchLink
                        className="rounded-full border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-medium text-muted hover:border-primary/30 hover:text-text"
                        locale={locale}
                        key={locale}
                      />
                    );
                  })}

                </div>

                <div className="flex items-center gap-2 lg:hidden">
                  <Disclosure.Button
                    as={Button}
                    variant="secondary"
                    aria-label="Toggle Menu"
                    className="h-11 w-11 rounded-2xl p-0"
                  >
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open ? (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
              </div>

              <Disclosure.Panel className="border-t border-border/60 px-5 pb-5 pt-4 lg:hidden">
                <div className="grid gap-2">
                  {MAIN_NAVIGATION.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="rounded-2xl border border-transparent bg-surface/70 px-4 py-3 text-sm font-medium text-muted hover:border-primary/15 hover:bg-surface-elevated hover:text-text"
                    >
                      {t(`nav-${item.key}`)}
                    </Link>
                  ))}

                  {locales.map((locale) => {
                    if (locale === currentLocale) return null;
                    return (
                      <LanguageSwitchLink
                        className="rounded-2xl border border-transparent bg-surface/70 px-4 py-3 text-sm font-medium text-muted hover:border-primary/15 hover:bg-surface-elevated hover:text-text"
                        locale={locale}
                        key={locale}
                      />
                    );
                  })}
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </PageContainer>
    </div>
  );
}
