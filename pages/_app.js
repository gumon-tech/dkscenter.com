// pages/_app.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';

import { GTM_ID, trackPageView } from '/lib/gtm';
import { DEFAULT_BRAND, normalizeBrand } from '/lib/brand';

import '../css/tailwind.css';
import '../css/styles.css';
import '../css/fonts.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!GTM_ID) return;

    const getLocale = () => {
      // โปรเจกต์คุณใช้ /[locale]/... ดังนั้นอ่านจาก query ก่อน
      const qLocale = router.query?.locale;
      if (qLocale) return String(qLocale);
      // fallback (บางที next อาจมี router.locale)
      if (router.locale) return String(router.locale);
      return 'en';
    };

    const getBrandOwner = () => {
      // pageProps.brandOwner จะมาจาก getStaticProps ในแต่ละหน้า (เช่น course detail)
      const fromProps = pageProps?.brandOwner;
      return normalizeBrand(fromProps || DEFAULT_BRAND);
    };

    const getPageType = () => pageProps?.pageType || 'page';

    const pushPV = (url) => {
      trackPageView({
        pagePath: url,
        pageType: getPageType(),
        locale: getLocale(),
        brandOwner: getBrandOwner(),
      });
    };

    // initial
    pushPV(window.location.pathname + window.location.search);

    // SPA route changes
    const handleRouteChange = (url) => pushPV(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events, router.query?.locale, pageProps?.brandOwner, pageProps?.pageType]);

  return (
    <>
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
