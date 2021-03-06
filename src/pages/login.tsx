import { Grid } from '@mui/material';
import type { NextPage } from 'next';

import LoginBanner from '@modules/login/components/LoginBanner';
import LoginForm from '@modules/login/components/LoginForm';

const Login: NextPage = () => {
  return (
    <Grid container minHeight="100vh">
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
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <LoginForm />
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
