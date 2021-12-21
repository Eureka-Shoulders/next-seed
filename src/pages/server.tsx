import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import type { GetServerSideProps, NextPage } from 'next';
import nookies from 'nookies';
import React from 'react';
import { ThemeStoreType } from 'stores/ThemeStore';

import { Breadcrumb } from '@euk-labs/componentz';

const Server: NextPage = () => {
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
      <Typography>Tema atual: {themeStore.theme}</Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Mudar tema para
      </Button>
    </Box>
  );
};

export default observer(Server);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  return {
    props: {
      hydrationData: {
        theme: cookies.theme,
      },
    },
  };
};
