import React from 'react';
import languageDetector from '/lib/languageDetector';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import 'dayjs/locale/en';

const LanguageSwitchLink = ({ className, locale, ...rest }) => {
  const router = useRouter();

  let href = rest.href || router.asPath;
  let pName = router.pathname;

  const queryIndex = href.indexOf('?');

  let queryString = '';
  if (queryIndex > 0) {
    queryString = href.substring(queryIndex);
  }

  Object.keys(router.query).forEach((k) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k]);
  });

  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;

    // ✅ FIX: ตั้ง locale ให้ถูกภาษา
    if (locale === 'th') dayjs.locale('th');
    if (locale === 'en') dayjs.locale('en');
  }

  if (queryString) {
    href = href + queryString;
  }

  return (
    <Link
      href={href}
      onClick={() => languageDetector.cache(locale)} // ✅ จะ set cookie + cache
      className={className}
    >
      {locale === 'th' && (
        <>
          <span className="text-indigo-500">English</span> | ไทย
        </>
      )}
      {locale === 'en' && (
        <>
          English | <span className="text-indigo-500">ไทย</span>
        </>
      )}
    </Link>
  );
};

export default LanguageSwitchLink;
