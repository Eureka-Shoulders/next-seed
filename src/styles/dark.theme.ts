import { ThemeOptions } from '@mui/material';

import baseTheme from './base.theme';

const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      '300': '#3AA3F8',
      main: '#184b85',
      '900': '#063060',
    },
    secondary: {
      main: '#3AA3F8',
    },
    primaryGradient:
      'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
  },
};
export default darkTheme;
