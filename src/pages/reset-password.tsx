import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import LoginBanner from '@components/Login/LoginBanner';

import { useUsersRepository } from '@hooks/repositories';
import useTranslation from '@hooks/useTranslation';

import {
  ResetPasswordSchema,
  getResetPasswordSchema,
} from '@modules/login/login.schema';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import { FXPasswordField, FXSubmitButton } from '@euk-labs/formix-mui';

interface ResetPasswordProps {
  token: string;
}

const initialValues = {
  password: '',
};

const ResetPassword: NextPage<ResetPasswordProps> = () => {
  const uiStore = useUIStore();
  const router = useRouter();
  const usersRepository = useUsersRepository();
  const { translate } = useTranslation();

  async function handleSubmit(values: ResetPasswordSchema) {
    try {
      const params = new URLSearchParams(window.location.search);

      await usersRepository.resetPassword({
        token: params.get('token') || '',
        password: values.password,
      });

      uiStore.snackbar.show({
        message: translate('feedbacks.changePassword'),
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.changePassword'),
          severity: 'error',
        });
    }
  }

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
        <Box p={4}>
          <Grid container component="main" spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography
                align="center"
                variant="h4"
                component="h1"
                fontWeight={700}
              >
                {translate('actions.changePassword')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Formix
                initialValues={initialValues}
                zodSchema={getResetPasswordSchema(translate)}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FXPasswordField
                      name="password"
                      label={translate('common.password')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FXPasswordField
                      name="confirmPassword"
                      label={translate('actions.confirmPassword')}
                    />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <FXSubmitButton
                      fullWidth
                      label={translate('actions.change')}
                    />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      href="/login"
                    >
                      {translate('actions.goBack')}
                    </Button>
                  </Grid>
                </Grid>
              </Formix>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
      isPublic: true,
    },
  };
};
