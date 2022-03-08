import 'reflect-metadata';

import globalContainer from '@containers/global.inversify';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';

import AppBarBuilder from '@core/components/AppBarBuilder';
import BreadcrumbListener from '@core/components/Breadcrumbs/BreadcrumbListener';
import ThemeProvider from '@core/components/ThemeProvider';
import UserListener from '@core/components/UserListener';
import ZodErrorMapBuilder from '@core/components/ZodErrorMapBuilder';

import { AppBar } from '@euk-labs/componentz';

import createEmotionCache from '../createEmotionCache';
import type { HydrationData } from '../types';

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
  import('@core/services/mockService').then((mod) => {
    mod.default();
  });
}

enableStaticRendering(typeof window === 'undefined');

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;
  const showAppBar = pageProps.showAppBar ?? true;
  const isPublicPage = pageProps.isPublic ?? false;
  const hydrationData: HydrationData = pageProps.hydrationData || {};
  const locale = router.locale || router.defaultLocale;
  const container = globalContainer(hydrationData, locale);

  return (
    <CacheProvider value={emotionCache}>
      <Provider container={container}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BreadcrumbListener />
          <UserListener isPublicPage={isPublicPage} />
          <AppBarBuilder />
          <ZodErrorMapBuilder />

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
