import Grid from '@mui/material/Grid';
import RegisterForm from 'modules/login/RegisterForm';
import type { NextPage } from 'next';

import LoginBanner from '@components/Login/LoginBanner';

const Register: NextPage = () => {
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
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default Register;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
      isPublic: true,
    },
  };
};
