import React from 'react';
import { useTranslation } from 'react-i18next';
import languageDetector from '/lib/languageDetector';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    languageDetector.cache(newLang);

    let href = router.asPath;
    let pName = router.pathname;

    // หาตำแหน่งของสตริงคิวรี่ใน URL
    const queryIndex = href.indexOf('?');

    // ตัดสตริงคิวรี่ออกมา
    let queryString = '';
    if (queryIndex > 0) {
      queryString = href.substring(queryIndex);
    }

    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, newLang);
        return;
      }
      pName = pName.replace(`[${k}]`, router.query[k]);
    });
    if (newLang) {
      href = pName;
    }
    if (queryString) {
      href = href + queryString;
    }
    router.replace(href);
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="th">ภาษาไทย</option>
    </select>
  );
};

export default LanguageSwitcher;
