import Grid from '@mui/material/Grid';
import ResetPasswordForm from 'modules/login/ResetPasswordForm';
import type { NextPage } from 'next';

import LoginBanner from '@components/Login/LoginBanner';

const ResetPassword: NextPage = () => {
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
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
};

export default ResetPassword;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
      isPublic: true,
    },
  };
};
