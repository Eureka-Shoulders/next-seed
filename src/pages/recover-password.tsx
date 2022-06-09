import { Box, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useTranslation } from '@hooks/services';

import LoginBanner from '@modules/login/components/LoginBanner';
import RecoverPasswordForm from '@modules/login/components/RecoverPasswordForm';

// TODO: Add project image
// import GPLogoImage from '@components/GPLogoImage';

const RecoverPassword: NextPage = () => {
  const { translate } = useTranslation();
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{translate('pages.recoverPassword.title')}</title>
      </Head>
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
          <Box p={4}>
            <Grid container component="main" spacing={2} justifyContent="center">
              {/* <Grid item xs="auto">
                <GPLogoImage height={350} />
              </Grid> */}
              <Grid item xs={12}>
                <Typography align="center" variant="h4" component="h1" fontWeight={700}>
                  {translate('actions.recoverPassword')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <RecoverPasswordForm onSuccess={goToLogin} onCancel={goToLogin} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RecoverPassword;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
      isPublic: true,
    },
  };
};
