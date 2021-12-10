import 'reflect-metadata';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'inversify-react';
import type { AppProps } from 'next/app';

import { globalContainer } from '@euk-labs/componentz';

import lightTheme from '../styles/light.theme';

function buildTheme() {
  return createTheme(lightTheme);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider container={globalContainer}>
      <ThemeProvider theme={buildTheme()}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
