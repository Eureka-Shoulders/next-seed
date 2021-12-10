import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import LoginBanner from '@components/LoginBanner';

const Home: NextPage = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <LoginBanner>oioiooio</LoginBanner>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default Home;
