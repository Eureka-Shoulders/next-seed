import { Breadcrumb } from '@euk-labs/componentz';
import { Box, Button, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { NextPage } from 'next';
import React from 'react';

import useTranslation from '@core/hooks/useTranslation';

import { useThemeStore } from '@hooks/stores';

const Home: NextPage = () => {
  const themeStore = useThemeStore();
  const { translate } = useTranslation();

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
      <Typography>
        {translate('common.currentTheme')}: {themeStore.theme}
      </Typography>
      <Button variant="contained" onClick={toggleTheme}>
        {translate('actions.changeTheme')}
      </Button>
    </Box>
  );
};

export default observer(Home);
