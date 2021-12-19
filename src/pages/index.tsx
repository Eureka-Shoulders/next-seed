import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Breadcrumb } from '@euk-labs/componentz';

const Home: NextPage = () => {
  useEffect(() => console.log('Home'), []);
  return (
    <Box p={3}>
      <Breadcrumb />
      <Typography>Children here</Typography>
    </Box>
  );
};

export default Home;
