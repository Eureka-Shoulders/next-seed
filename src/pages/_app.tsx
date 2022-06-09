import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppBar } from '@euk-labs/componentz';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import CoreListener from '@core/components/CoreListener';
import ErrorBoundary from '@core/components/ErrorBoundary';
import ThemeProvider from '@core/components/ThemeProvider';
import ZodErrorMapBuilder from '@core/components/ZodErrorMapBuilder';

import globalContainer from '@containers/global.inversify';

import createEmotionCache from '../createEmotionCache';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const Snackbar = dynamic(() => import('@euk-labs/componentz/components/Snackbar'), { ssr: false });
const Dialog = dynamic(() => import('@euk-labs/componentz/components/Dialog'), {
  ssr: false,
});

const { publicRuntimeConfig } = getConfig();
const clientSideEmotionCache = createEmotionCache();

if (publicRuntimeConfig.useMirage) {
  import('@services/mock').then((mod) => {
    mod.default();
  });
}

enableStaticRendering(typeof window === 'undefined');

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;
  const showAppBar = pageProps.showAppBar ?? true;
  const isPublicPage = pageProps.isPublic ?? false;
  const locale = router.locale || router.defaultLocale;
  const container = globalContainer(locale);

  return (
    <>
      <Head>
        <title>Shoulders Next Seed</title>
      </Head>

      <CacheProvider value={emotionCache}>
        <Provider container={container}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CoreListener isPublicPage={isPublicPage} />
            <ZodErrorMapBuilder />

            <ThemeProvider>
              <CssBaseline />
              <ErrorBoundary>
                {showAppBar ? (
                  <AppBar>
                    <Component {...pageProps} />
                  </AppBar>
                ) : (
                  <Component {...pageProps} />
                )}

                <Snackbar autoHideDuration={6000} />
                <Dialog />
              </ErrorBoundary>
            </ThemeProvider>
          </LocalizationProvider>
        </Provider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
