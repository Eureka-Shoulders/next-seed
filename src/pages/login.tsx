import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';

import LoginBanner from '@components/Login/LoginBanner';
import LoginForm from '@components/Login/LoginForm';

const Login: NextPage = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={6}
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <LoginBanner />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box width={200} height={200}>
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
    },
  };
};
