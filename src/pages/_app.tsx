import '../styles/sf-pro-fonts.css';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { Global } from '@emotion/react';
import { Provider, Theme } from '@andideve/design-system';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import globalStyles from '../styles/globals';
import nProgressConfig from '../config/nprogress';

const progress = nProgress.configure(nProgressConfig);

function MyApp({ Component, pageProps }: AppProps) {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

  const router = useRouter();

  useEffect(() => {
    const shouldDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColorMode(shouldDark ? 'dark' : 'light');

    const onRouteChangeStart = (asPath: string, { shallow }: { shallow?: boolean }) => {
      if (!shallow) progress.start();
    };
    const routeChangeComplete = () => progress.done();

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  return (
    <Provider themeConfig={{ colorMode }}>
      <Global styles={(theme) => globalStyles(theme as Theme)} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
