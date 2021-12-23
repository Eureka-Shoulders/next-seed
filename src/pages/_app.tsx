import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import globalContainer from 'containers/global.inversify';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'inversify-react';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import createMirageServer from 'services/mockService';
import { HydrationData } from 'types';

import AppBar from '@components/AppBar';
import { BreadcrumbListener } from '@components/Breadcrumbs/BreadcrumbListner';
import ThemeProvider from '@components/ThemeProvider';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const { publicRuntimeConfig } = getConfig();
const clientSideEmotionCache = createEmotionCache();

if (publicRuntimeConfig.useMirage) createMirageServer();
enableStaticRendering(typeof window === 'undefined');

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const showAppBar = pageProps.showAppBar ?? true;
  const hydrationData: HydrationData = pageProps.hydrationData || {};

  return (
    <CacheProvider value={emotionCache}>
      <Provider container={globalContainer(hydrationData)}>
        <BreadcrumbListener />

        <ThemeProvider>
          <CssBaseline />
          {showAppBar ? (
            <AppBar>
              <Component {...pageProps} />
            </AppBar>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
