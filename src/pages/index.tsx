import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React from 'react';

import { Breadcrumb } from '@euk-labs/componentz';

const Home: NextPage = () => {
  return (
    <>
      <Breadcrumb />
      <Typography>Children here</Typography>
    </>
  );
};

export default Home;
