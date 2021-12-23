import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import nookies from 'nookies';
import { useEffect } from 'react';
import { ThemeStoreType, ThemeType } from 'stores/ThemeStore';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const themeStore = useInjection<ThemeStoreType>(TYPES.ThemeStore);

  useEffect(() => {
    const cookies = nookies.get(null);

    if (!cookies.theme) {
      themeStore.persist();
    }

    if (!themeStore.theme) {
      themeStore.setTheme(cookies.theme as ThemeType);
    }
  }, [themeStore.theme]); // eslint-disable-line

  return (
    <MuiThemeProvider
      theme={createTheme(themeStore.themes[themeStore.theme || 'light'])}
    >
      {children}
    </MuiThemeProvider>
  );
}

export default observer(ThemeProvider);
