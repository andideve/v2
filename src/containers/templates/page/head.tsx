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

      <link
        rel="prefetch"
        href="/assets/fonts/sf-pro-display_regular.woff2"
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href="/assets/fonts/sf-pro-display_semibold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/assets/fonts/sf-pro-text_regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/assets/fonts/sf-pro-text_semibold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </NextHead>
  );
});

export default Head;
