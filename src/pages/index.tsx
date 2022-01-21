import { Box, Button, Typography } from '@mui/material';
import { useThemeStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import React from 'react';

import { Breadcrumb } from '@euk-labs/componentz';

// TODO: make a beautiful design for the homepage
const Home: NextPage = () => {
  const themeStore = useThemeStore();

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
      <Typography>Tema atual: {themeStore.theme}</Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Mudar tema para
      </Button>
    </Box>
  );
};

export default observer(Home);
