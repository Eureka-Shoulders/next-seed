import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useThemeStore } from '@hooks/stores';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const themeStore = useThemeStore();

  return (
    <MuiThemeProvider theme={createTheme(themeStore.themes[themeStore.theme])}>
      {children}
    </MuiThemeProvider>
  );
}

export default observer(ThemeProvider);
