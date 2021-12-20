import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';
import { ThemeStoreType, ThemeType } from 'stores/ThemeStore';

function ThemeProvider({
  children,
  themeType,
}: PropsWithChildren<{ themeType?: ThemeType }>) {
  const themeStore = useInjection<ThemeStoreType>(TYPES.ThemeStore);

  // This will happen on the server side
  if (typeof window === 'undefined' && themeType) {
    themeStore.hydrate(themeType as ThemeType);
  }

  const theme = createTheme(themeStore.themes[themeStore.theme || themeType]);

  useEffect(() => {
    themeStore.hydrate();

    if (!themeType) {
      themeStore.persist();
    }
  }, []); // eslint-disable-line

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default observer(ThemeProvider);
