import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import globalContainer from 'containers/global.inversify';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import type { HydrationData } from 'types';

import AppBarBuilder from '@components/AppBarBuilder';
import { BreadcrumbListener } from '@components/Breadcrumbs/BreadcrumbListener';
import ThemeProvider from '@components/ThemeProvider';

import { AppBar } from '@euk-labs/componentz/components';

const Snackbar = dynamic(
  () => import('@euk-labs/componentz/components/Snackbar'),
  { ssr: false }
);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const { publicRuntimeConfig } = getConfig();
const clientSideEmotionCache = createEmotionCache();

if (publicRuntimeConfig.useMirage) {
  import('services/mockService').then((mod) => {
    mod.default();
  });
}

enableStaticRendering(typeof window === 'undefined');

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const showAppBar = pageProps.showAppBar ?? true;
  const hydrationData: HydrationData = pageProps.hydrationData || {};

  return (
    <CacheProvider value={emotionCache}>
      <Provider container={globalContainer(hydrationData)}>
        <BreadcrumbListener />
        <AppBarBuilder />

        <ThemeProvider>
          <CssBaseline />
          {showAppBar ? (
            <AppBar>
              <Component {...pageProps} />
            </AppBar>
          ) : (
            <Component {...pageProps} />
          )}

          <Snackbar />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
