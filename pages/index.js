import Head from 'next/head';
import { useEffect } from 'react';

const DEFAULT_LOCALE = 'th';
const SUPPORTED = new Set(['en', 'th']);

function mapLocale(v) {
  if (!v) return null;
  const s = String(v).toLowerCase();
  if (s.startsWith('th')) return 'th';
  if (s.startsWith('en')) return 'en';
  return null;
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

export default function Home() {
  useEffect(() => {
    // 1) cookie: locale=th_TH / en_US (ตามที่คุณมีอยู่)
    const cookieLocale = mapLocale(getCookie('locale'));

    // 2) browser language: th-TH / en-US
    const browserLocale = mapLocale(navigator.language);

    const target = cookieLocale || browserLocale || DEFAULT_LOCALE;
    const finalTarget = SUPPORTED.has(target) ? target : DEFAULT_LOCALE;

    window.location.replace('/' + finalTarget);
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
    </>
  );
}
