import React from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Malik - AI API</title>
        <meta name="description" content="Malik menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="keywords" content="Malik, AI, API, Machine Learning, Next.js" />
        <meta name="author" content="Malik" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="Malik - AI API" />
        <meta property="og:description" content="Malik menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Malik" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Malik - AI API" />
        <meta name="twitter:description" content="Malik menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:site" content="@Malik" />
        <meta name="twitter:creator" content="@Malik" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="/" />
      </Head>
      <DefaultSeo
        title="Malik - AI API"
        description="Malik menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi."
        openGraph={{
          url: '/',
          title: 'Malik - AI API',
          description: 'Malik menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi.',
          images: [{ url: '/favicon.png', width: 800, height: 600, alt: 'Malik AI API' }],
          site_name: 'Malik',
        }}
        twitter={{
          handle: '@Malik',
          site: '@Malik',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
