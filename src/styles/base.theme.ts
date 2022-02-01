import { ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGradient: string;
  }

  interface PaletteOptions {
    primaryGradient?: string;
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
  },
};

export default baseTheme;
