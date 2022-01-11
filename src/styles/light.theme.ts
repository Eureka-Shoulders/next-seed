import { ThemeOptions } from '@mui/material';

import baseTheme from './base.theme';

const lightTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      '300': '#3AA3F8',
      main: '#184b85',
      '900': '#063060',
    },
    secondary: {
      main: '#3AA3F8',
    },
    background: {
      default: '#f5f5f5',
    },
    primaryGradient:
      'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
  },
};
export default lightTheme;
