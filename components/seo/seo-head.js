/* eslint-disable react/prop-types */
import Head from 'next/head';
import React from 'react';
import JsonLd from './json-ld';
import { SITE_DESCRIPTION, SITE_NAME } from '../../lib/content/site';
import { normalizeLocale, toOpenGraphLocale } from '../../lib/i18n/config';
import {
  buildAbsoluteUrl,
  buildAlternates,
  buildLocalizedPath,
  toAbsoluteImageUrl,
} from '../../lib/seo';

export default function SeoHead({
  locale,
  title,
  description = SITE_DESCRIPTION,
  path = '',
  canonical,
  image = '/img/main_img.jpg',
  type = 'website',
  noindex = false,
  alternates,
  structuredData = [],
}) {
  const normalizedLocale = normalizeLocale(locale);
  const fallbackCanonical = buildAbsoluteUrl(
    buildLocalizedPath(normalizedLocale, path),
  );
  const canonicalUrl = canonical || fallbackCanonical;
  const imageUrl = toAbsoluteImageUrl(image);
  const fullTitle = title || SITE_NAME;
  const alternateLinks = alternates || buildAlternates(path);
  const robots = noindex
    ? 'noindex,follow,max-image-preview:large'
    : 'index,follow,max-image-preview:large';

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={robots} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={fullTitle} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content={type} />
        <meta
          property="og:locale"
          content={toOpenGraphLocale(normalizedLocale)}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        {Object.entries(alternateLinks.languages || {}).map(([hrefLang, href]) => (
          <link
            key={hrefLang}
            rel="alternate"
            hrefLang={hrefLang}
            href={href}
          />
        ))}
        {alternateLinks.xDefault ? (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={alternateLinks.xDefault}
          />
        ) : null}

        {Object.keys(alternateLinks.languages || {})
          .filter((hrefLang) => hrefLang !== normalizedLocale)
          .map((hrefLang) => (
            <meta
              key={`og-${hrefLang}`}
              property="og:locale:alternate"
              content={toOpenGraphLocale(hrefLang)}
            />
          ))}
      </Head>

      {structuredData.map((entry, index) => (
        <JsonLd
          key={`json-ld-${index}`}
          id={`json-ld-${index}`}
          data={entry}
        />
      ))}
    </>
  );
}
