import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppBar } from '@euk-labs/componentz';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { DEFAULT_LOCALE } from '@config/constants';

import ErrorBoundary from '@components/ErrorBoundary';
import CoreListener from '@components/listener/CoreListener';
import AuthLoader from '@components/utility/AuthLoader';
import ZodErrorMapBuilder from '@components/utility/ZodErrorMapBuilder';

import globalContainer from '@containers/global.inversify';

import ThemeProvider from '@providers/ThemeProvider';

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
  const locale = router.locale || DEFAULT_LOCALE;
  const container = globalContainer(locale);

  return (
    <>
      <Head>
        <title>Shoulders Next Seed</title>
      </Head>

      <CacheProvider value={emotionCache}>
        <Provider container={container}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CoreListener />
            <ZodErrorMapBuilder />

            <ThemeProvider>
              <CssBaseline />
              <ErrorBoundary>
                {showAppBar ? (
                  <AppBar>
                    <AuthLoader>
                      <Component {...pageProps} />
                    </AuthLoader>
                  </AppBar>
                ) : (
                  <AuthLoader>
                    <Component {...pageProps} />
                  </AuthLoader>
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
