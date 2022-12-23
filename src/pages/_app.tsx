import '../styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import { Provider, Theme } from '@andideve/design-system';

import Progress from '@/components/molecules/progress';
import { ColorSchemeContext } from '@/context/color-scheme';
import globalStyles from '@/styles/globals';
import { UI } from '@/config/globals';

function LoadingPageProgress() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = (asPath: string, { shallow }: { shallow?: boolean }) => {
      if (!shallow) setLoading(true);
    };
    const routeChangeComplete = () => setLoading(false);

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
    <Progress
      label="loading page progress"
      loading={loading}
      percentage={100}
      className="fixed inset-x-0"
      style={{ top: UI.navbarH, zIndex: 10000 }}
    />
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeContext>
      {({ asColorScheme }) => (
        <Provider themeConfig={{ colorMode: asColorScheme }}>
          <Global styles={(theme) => globalStyles(theme as Theme)} />
          <LoadingPageProgress />
          <Component {...pageProps} />
        </Provider>
      )}
    </ColorSchemeContext>
  );
}

export default MyApp;
