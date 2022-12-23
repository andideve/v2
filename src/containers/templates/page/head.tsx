import NextHead from 'next/head';
import React, { memo } from 'react';

const Head = memo<{ title: string; description: string }>(function ({ title, description }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicons/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  );
});

export default Head;
