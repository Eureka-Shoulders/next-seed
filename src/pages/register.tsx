import { Grid } from '@mui/material';
import type { NextPage } from 'next';

import LoginBanner from '@modules/login/components/LoginBanner';
import RegisterForm from '@modules/login/components/RegisterForm';

const Register: NextPage = () => {
  return (
    <Grid container height="100vh">
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
        sx={{
          overflowY: 'auto',
        }}
        maxHeight="100vh"
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
    },
  };
};
