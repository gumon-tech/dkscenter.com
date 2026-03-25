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
import ThemeSwitcher from './theme-switcher';

export default function Footer(props) {
  const router = useRouter();
  const i18next = props.i18next;
  let { t, i18n } = i18next;
  const currentLocale = router.query.locale || defaultLocale;
  const currentLanguage = i18n.language || 'th';
  const footerHeading = t('footer-heading');
  const footerChip1 = t('footer-chip-1');
  const footerChip2 = t('footer-chip-2');
  const footerColumn1 = t('footer-column-1');
  const footerColumn2 = t('footer-column-2');
  const safeFooterHeading =
    footerHeading === 'footer-heading'
      ? currentLanguage === 'th'
        ? 'ประสบการณ์การเรียนรู้ที่ออกแบบมาเพื่อการลงมือทำจริง'
        : 'Learning experiences built for real-world execution.'
      : footerHeading;
  const safeFooterChip1 =
    footerChip1 === 'footer-chip-1'
      ? currentLanguage === 'th'
        ? 'เวิร์กชอปเชิงปฏิบัติ'
        : 'Hands-on workshops'
      : footerChip1;
  const safeFooterChip2 =
    footerChip2 === 'footer-chip-2'
      ? currentLanguage === 'th'
        ? 'ออกแบบเพื่อสายเทค'
        : 'Built for engineers'
      : footerChip2;
  const safeFooterColumn1 =
    footerColumn1 === 'footer-column-1'
      ? currentLanguage === 'th'
        ? 'สำรวจ'
        : 'Explore'
      : footerColumn1;
  const safeFooterColumn2 =
    footerColumn2 === 'footer-column-2'
      ? currentLanguage === 'th'
        ? 'ข้อมูลบริษัท'
        : 'Company'
      : footerColumn2;
  return (
    <footer className="relative z-10 pb-10 pt-section-sm">
      <Container>
        <div className="rounded-[32px] border border-border/70 bg-surface-glass px-6 py-8 shadow-panel backdrop-blur-2xl lg:px-8 lg:py-9">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center">
                  <Image
                    src="/img/logo_2_sq.png"
                    alt="DKS"
                    width="44"
                    height="44"
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                    DKS Center
                  </span>
                  <span className="mt-1 block max-w-sm text-[1.75rem] font-semibold leading-tight tracking-[-0.04em] text-text">
                    {safeFooterHeading}
                  </span>
                </span>
              </Link>

              <div className="mt-5 max-w-lg text-[15px] leading-8 text-muted">
                {t('footer')}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-soft">
                <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5">
                  {safeFooterChip1}
                </span>
                <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5">
                  {safeFooterChip2}
                </span>
                <span className="rounded-full border border-border/70 bg-surface px-3 py-1.5">
                  {currentLanguage === 'th'
                    ? 'เรียนรู้แบบนำไปใช้ได้จริง'
                    : 'Practical learning'}
                </span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-soft">
                {safeFooterColumn1}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {FOOTER_NAVIGATION.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="rounded-2xl px-3 py-2 text-muted hover:bg-surface hover:text-text"
                  >
                    {t(`nav-${item.key}`)}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-soft">
                {safeFooterColumn2}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {LEGAL_NAVIGATION.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="rounded-2xl px-3 py-2 text-muted hover:bg-surface hover:text-text"
                  >
                    {t(`nav-${item.key}`)}
                  </Link>
                ))}
                {locales.map((locale) => {
                  if (locale === currentLocale) return null;
                  return (
                    <LanguageSwitchLink
                      className="rounded-2xl px-3 py-2 text-muted hover:bg-surface hover:text-text"
                      locale={locale}
                      key={locale}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-soft">
                {t('footer-follow-us')}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-soft">
                <a
                  target="_blank"
                  href="https://www.facebook.com/dks.share"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:text-primary"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} width={18} height={18} />
                </a>
                <a
                  target="_blank"
                  href="https://lin.ee/xyZvMd2"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:text-primary"
                  aria-label="LINE"
                >
                  <FontAwesomeIcon icon={faLine} width={18} height={18} />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/@dkscenter"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:text-primary"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon
                    icon={faSquareYoutube}
                    width={18}
                    height={18}
                  />
                </a>
                <a
                  target="_blank"
                  href="mailto:dkscenter@gumon.io"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:text-primary"
                  aria-label="Email"
                >
                  <FontAwesomeIcon icon={faEnvelope} width={18} height={18} />
                </a>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">
                dkscenter@gumon.io
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border/70 pt-5 text-sm text-soft md:flex md:items-end md:justify-between md:gap-6">
            <div className="md:flex-1">
              {t('footer-copyright')} © {new Date().getFullYear()} DKS Center.
              <a
                href="https://gumon.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-muted hover:text-primary"
              >
                Built with Gumon.io
              </a>
            </div>
            <ThemeSwitcher language={currentLanguage} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
