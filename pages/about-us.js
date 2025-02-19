import React from 'react';
import { RedirectRender } from '../lib/redirect';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Home = () => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;
  const domain = origin;
  const headTitle = 'DKS Center - Digital Knowledge Sharing Center';
  const headContent =
    'DKS acts as a central hub bridging digital communities and technology enthusiasts, fostering collaboration and knowledge exchange. Our mission includes organizing seminars, knowledge-sharing activities, and collaborative events to constantly update our network with the latest insights.';

  return RedirectRender(
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headContent} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Protocol */}
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headContent} />
        <meta property="og:image" content={domain + '/img/assistant1.jpg'} />
        <meta property="og:url" content={URL} />

        {/* Twitter Card */}
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headContent} />
        <meta name="twitter:image" content={domain + '/img/assistant1.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>,
  );
};

export default Home;
