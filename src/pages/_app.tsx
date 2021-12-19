import 'reflect-metadata';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'inversify-react';
import type { AppProps } from 'next/app';

import AppBar from '@components/AppBar';
import { BreadcrumbListener } from '@components/Breadcrumbs/BreadcrumbListner';

import { globalContainer } from '@euk-labs/componentz';

import lightTheme from '../styles/light.theme';

function buildTheme() {
  return createTheme(lightTheme);
}

function MyApp({ Component, pageProps }: AppProps) {
  const showAppBar = pageProps.showAppBar ?? true;

  return (
    <Provider container={globalContainer}>
      <BreadcrumbListener />

      <ThemeProvider theme={buildTheme()}>
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
  );
}

export default MyApp;
