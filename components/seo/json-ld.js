/* eslint-disable react/prop-types */
import Head from 'next/head';

export default function JsonLd({ id, data }) {
  if (!data) return null;

  return (
    <Head>
      <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
