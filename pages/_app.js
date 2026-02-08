import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DEFAULT_BRAND, normalizeBrand } from '/lib/brand';
import { GTM_ID } from '/lib/gtm';

import '../css/tailwind.css';
import '../css/styles.css';
import '../css/fonts.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!GTM_ID) return;

    const pushPageView = (url) => {
      window.dataLayer = window.dataLayer || [];

      const brandOwner = normalizeBrand(pageProps?.brandOwner);
      const brandEffective = brandOwner || DEFAULT_BRAND;

      window.dataLayer.push({
        event: 'page_view',
        page_path: url,
        page_title: document?.title || '',
        brand_default: DEFAULT_BRAND,
        brand_owner: brandOwner,
        brand_effective: brandEffective,
        page_type: pageProps?.pageType || 'page',
      });
    };

    // initial
    pushPageView(window.location.pathname + window.location.search);

    // SPA route changes
    const handleRouteChange = (url) => pushPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* GTM head script */}
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
