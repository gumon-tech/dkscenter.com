import React from 'react';
import { RedirectRender } from '../lib/redirect';
import SeoHead from '../components/seo/seo-head';
import { getLegacyRedirectSeo } from '../lib/seo';

const Home = () => {
  const seo = getLegacyRedirectSeo('/about-us');

  return RedirectRender(
    <>
      <SeoHead {...seo} image="/img/assistant1.jpg" />
    </>,
  );
};

export default Home;
