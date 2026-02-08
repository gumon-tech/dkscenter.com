import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../public/gtag';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import '../css/tailwind.css';
import '../css/styles.css';
import '../css/fonts.css';
import { appWithTranslation } from 'next-i18next';

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // GA: track SPA route changes (Static-safe)
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        gtag.pageview(url);
      }
      // FB Pixel PageView on route change
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Google Analytics (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', { page_path: window.location.pathname });
          `,
        }}
      />

      {/* Facebook Pixel (Static-safe) */}
      {FB_PIXEL_ID ? (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          {/* noscript แบบ pixel image (optional แต่ดี) */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
