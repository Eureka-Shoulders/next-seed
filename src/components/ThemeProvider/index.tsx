import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';
import { ThemeStoreType } from 'stores/ThemeStore';

function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const themeStore = useInjection<ThemeStoreType>(TYPES.ThemeStore);
  const theme = themeStore.buildTheme();

  useEffect(() => {
    themeStore.hydrate();
    themeStore.persist();
  }, []); // eslint-disable-line

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default observer(ThemeProvider);
