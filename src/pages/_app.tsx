import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import globalContainer from 'containers/global.inversify';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import type { HydrationData } from 'types';

import AppBarBuilder from '@components/AppBarBuilder';
import BreadcrumbListener from '@components/Breadcrumbs/BreadcrumbListener';
import ThemeProvider from '@components/ThemeProvider';
import UserListener from '@components/UserListener';

import { AppBar } from '@euk-labs/componentz';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const Snackbar = dynamic(
  () => import('@euk-labs/componentz/components/Snackbar'),
  { ssr: false }
);
const Dialog = dynamic(() => import('@euk-labs/componentz/components/Dialog'), {
  ssr: false,
});

const { publicRuntimeConfig } = getConfig();
const clientSideEmotionCache = createEmotionCache();

if (publicRuntimeConfig.useMirage) {
  import('services/mockService').then((mod) => {
    mod.default();
  });
}

enableStaticRendering(typeof window === 'undefined');

// TODO: inject locale and default locale on inversify container
// TODO: translate this

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const showAppBar = pageProps.showAppBar ?? true;
  const isPublicPage = pageProps.isPublic ?? false;
  const hydrationData: HydrationData = pageProps.hydrationData || {};

  return (
    <CacheProvider value={emotionCache}>
      <Provider container={globalContainer(hydrationData)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BreadcrumbListener />
          <UserListener isPublicPage={isPublicPage} />
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

            <Snackbar autoHideDuration={6000} />
            <Dialog />
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
