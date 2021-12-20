import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import type { NextPage } from 'next';
import React from 'react';
import { ThemeStoreType } from 'stores/ThemeStore';

import { Breadcrumb } from '@euk-labs/componentz';

const Home: NextPage = () => {
  const themeStore = useInjection<ThemeStoreType>(TYPES.ThemeStore);

  function toggleTheme() {
    if (themeStore.theme === 'light') {
      themeStore.setTheme('dark');
    } else {
      themeStore.setTheme('light');
    }
  }

  return (
    <Box p={3}>
      <Breadcrumb />
      <Typography>Children here</Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Mudar tema
      </Button>
    </Box>
  );
};

export default Home;
