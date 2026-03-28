import React from 'react';
import { RedirectRender } from '/lib/redirect';
import SeoHead from '/components/seo/seo-head';
import { getLegacyRedirectSeo } from '/lib/seo';

const Home = () => {
  const seo = getLegacyRedirectSeo('/order/success');

  return RedirectRender(
    <>
      <SeoHead {...seo} />
    </>,
  );
};

export default Home;
