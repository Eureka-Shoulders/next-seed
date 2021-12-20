import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';
import { ThemeStoreType, ThemeType } from 'stores/ThemeStore';

function ThemeProvider({
  children,
  theme,
}: PropsWithChildren<{ theme?: string }>) {
  const themeStore = useInjection<ThemeStoreType>(TYPES.ThemeStore);

  if (typeof window === 'undefined' && theme) {
    themeStore.hydrate(theme as ThemeType);
  }

  useEffect(() => {
    if (!theme) {
      themeStore.hydrate();
      themeStore.persist();
    }
  }, []); // eslint-disable-line

  return (
    <MuiThemeProvider theme={themeStore.theme}>{children}</MuiThemeProvider>
  );
}

export default observer(ThemeProvider);
