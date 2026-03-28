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
  const [copyStatus, setCopyStatus] = React.useState('idle');
  const currentLocale = router.query.locale || defaultLocale;
  const currentLanguage = i18n.language || 'th';
  const emailAddress = 'dkscenter@gumon.io';
  const footerHeading = t('footer-heading');
  const footerColumn1 = t('footer-column-1');
  const footerColumn2 = t('footer-column-2');
  const safeFooterHeading =
    footerHeading === 'footer-heading'
      ? currentLanguage === 'th'
        ? 'ประสบการณ์การเรียนรู้ที่ออกแบบมาเพื่อการลงมือทำจริง'
        : 'Learning experiences built for real-world execution.'
      : footerHeading;
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
  const sectionLabelClassName =
    'text-[11px] font-semibold uppercase tracking-[0.24em] text-soft';
  const footerLinkClassName =
    'rounded-2xl px-3.5 py-2.5 text-sm leading-6 text-muted hover:bg-surface hover:text-text';
  const copySuccessLabel =
    currentLanguage === 'th' ? 'คัดลอกอีเมลแล้ว' : 'Email copied';
  const copyIdleLabel =
    currentLanguage === 'th' ? 'กดเพื่อคัดลอกอีเมล' : 'Tap to copy email';
  const copyErrorLabel =
    currentLanguage === 'th'
      ? 'คัดลอกไม่สำเร็จ ลองอีกครั้ง'
      : 'Copy failed, please try again';

  React.useEffect(() => {
    if (copyStatus !== 'copied' && copyStatus !== 'error') return undefined;

    const timeoutId = window.setTimeout(() => {
      setCopyStatus('idle');
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = emailAddress;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopyStatus('copied');
    } catch (error) {
      setCopyStatus('error');
    }
  };

  return (
    <footer className="relative z-10 pb-10 pt-section-sm">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-surface-glass px-6 py-7 shadow-panel backdrop-blur-2xl sm:px-7 sm:py-8 lg:px-8 lg:py-9">
          <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="pointer-events-none absolute -right-16 top-8 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(9.5rem,0.78fr)_minmax(9.5rem,0.78fr)_minmax(0,0.92fr)] lg:gap-x-8">
            <div className="lg:pr-6">
              <Link href="/" className="inline-flex max-w-xl items-start gap-4">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-border/60 bg-surface/80 shadow-soft">
                  <Image
                    src="/img/logo_2_sq.png"
                    alt="DKS"
                    width="44"
                    height="44"
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <span className="pt-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                    DKS Center
                  </span>
                  <span className="mt-2 block max-w-md text-[1.6rem] font-semibold leading-[1.22] tracking-[-0.04em] text-text sm:text-[1.72rem]">
                    {safeFooterHeading}
                  </span>
                </span>
              </Link>

              <div className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
                {t('footer')}
              </div>
            </div>

            <div className="space-y-4 lg:pt-2">
              <div className={sectionLabelClassName}>{safeFooterColumn1}</div>
              <div className="flex flex-col gap-1.5">
                {FOOTER_NAVIGATION.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={footerLinkClassName}
                  >
                    {t(`nav-${item.key}`)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:pt-2">
              <div className={sectionLabelClassName}>{safeFooterColumn2}</div>
              <div className="flex flex-col gap-1.5">
                {LEGAL_NAVIGATION.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={footerLinkClassName}
                  >
                    {t(`nav-${item.key}`)}
                  </Link>
                ))}
                {locales.map((locale) => {
                  if (locale === currentLocale) return null;
                  return (
                    <LanguageSwitchLink
                      className={footerLinkClassName}
                      locale={locale}
                      key={locale}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 lg:pl-2 lg:pt-2">
              <div className={sectionLabelClassName}>
                {t('footer-follow-us')}
              </div>
              <div className="flex flex-wrap gap-3 text-soft">
                <a
                  target="_blank"
                  href="https://www.facebook.com/dks.share"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:bg-surface-elevated hover:text-primary"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} width={18} height={18} />
                </a>
                <a
                  target="_blank"
                  href="https://lin.ee/xyZvMd2"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:bg-surface-elevated hover:text-primary"
                  aria-label="LINE"
                >
                  <FontAwesomeIcon icon={faLine} width={18} height={18} />
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/@dkscenter"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:bg-surface-elevated hover:text-primary"
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
                  href={`mailto:${emailAddress}`}
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-surface hover:border-primary/25 hover:bg-surface-elevated hover:text-primary"
                  aria-label="Email"
                >
                  <FontAwesomeIcon icon={faEnvelope} width={18} height={18} />
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group block w-full rounded-2xl border border-border/70 bg-surface/80 px-4 py-3.5 text-left shadow-soft transition hover:border-primary/20 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-live="polite"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-soft">
                  {currentLanguage === 'th' ? 'ติดต่อ' : 'Contact'}
                </p>
                <p className="mt-2 text-sm font-medium text-text">
                  {emailAddress}
                </p>
                <p
                  className={`mt-2 text-xs font-medium transition ${
                    copyStatus === 'copied'
                      ? 'text-primary'
                      : copyStatus === 'error'
                        ? 'text-rose-400'
                        : 'text-soft'
                  }`}
                >
                  {copyStatus === 'copied'
                    ? copySuccessLabel
                    : copyStatus === 'error'
                      ? copyErrorLabel
                      : copyIdleLabel}
                </p>
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-border/70 pt-5 text-sm text-soft md:flex md:items-center md:justify-between md:gap-6">
            <div className="md:flex-1 md:pr-4">
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
            <div className="mt-4 md:mt-0 md:flex md:justify-end">
              <ThemeSwitcher language={currentLanguage} />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
