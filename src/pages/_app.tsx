import '../styles/sf-pro-fonts.css';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { Provider, Theme } from '@andideve/design-system';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { ColorSchemeContext } from '@/context/color-scheme';
import globalStyles from '@/styles/globals';
import nProgressConfig from '@/config/nprogress';

const progress = nProgress.configure(nProgressConfig);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
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
    <ColorSchemeContext>
      {({ asColorScheme }) => (
        <Provider themeConfig={{ colorMode: asColorScheme }}>
          <Global styles={(theme) => globalStyles(theme as Theme)} />
          <Component {...pageProps} />
        </Provider>
      )}
    </ColorSchemeContext>
  );
}

export default MyApp;
