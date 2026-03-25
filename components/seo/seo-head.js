/* eslint-disable react/prop-types */
import Head from 'next/head';
import React from 'react';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '../../lib/content/site';
import {
  getAlternateLocales,
  normalizeLocale,
  toOpenGraphLocale,
} from '../../lib/i18n/config';

export default function SeoHead({
  locale,
  path,
  title,
  description = SITE_DESCRIPTION,
  image = '/img/main_img.jpg',
}) {
  const normalizedLocale = normalizeLocale(locale);
  const canonicalUrl = `${SITE_URL}/${normalizedLocale}${path || ''}`;
  const imageUrl = image?.startsWith('http') ? image : `${SITE_URL}${image}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />

      {getAlternateLocales(normalizedLocale).map((altLocale) => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={altLocale}
          href={`${SITE_URL}/${altLocale}${path || ''}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta
        property="og:locale"
        content={toOpenGraphLocale(normalizedLocale)}
      />
      {getAlternateLocales(normalizedLocale).map((altLocale) => (
        <meta
          key={`og-${altLocale}`}
          property="og:locale:alternate"
          content={toOpenGraphLocale(altLocale)}
        />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}
