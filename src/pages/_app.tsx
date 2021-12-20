import 'reflect-metadata';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import globalContainer from 'containers/global.inversify';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'inversify-react';
import type { AppProps } from 'next/app';

import AppBar from '@components/AppBar';
import { BreadcrumbListener } from '@components/Breadcrumbs/BreadcrumbListner';
import ThemeProvider from '@components/ThemeProvider';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const showAppBar = pageProps.showAppBar ?? true;

  return (
    <CacheProvider value={emotionCache}>
      <Provider container={globalContainer}>
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
