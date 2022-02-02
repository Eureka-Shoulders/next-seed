import { ThemeOptions, lighten } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import baseTheme from './base.theme';

const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700],
    },
    secondary: {
      main: '#3AA3F8',
    },
    background: {
      default: grey[900],
      paper: lighten(grey[900], 0.05),
    },
    primaryGradient:
      'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: '0.6em',
          backgroundColor: grey[300],
        },
        '::-webkit-scrollbar-thumb': {
          background:
            'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
          borderRadius: 16,
        },
        '::-webkit-scrollbar:horizontal': {
          height: 5,
        },
      },
    },
  },
};
export default darkTheme;
