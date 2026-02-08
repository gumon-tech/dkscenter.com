import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import nextI18nextConfig from '../next-i18next.config';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__?.query?.locale ||
      nextI18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          {/* GTM noscript */}
          {GTM_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
