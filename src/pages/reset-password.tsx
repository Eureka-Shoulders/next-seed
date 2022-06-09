import { Formix } from '@euk-labs/formix';
import { FXPasswordField, FXSubmitButton } from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { zodValidator } from '@core/utils/validators';

import { useUsersRepository } from '@hooks/repositories';
import { useTranslation } from '@hooks/services';
import { useNotificationService } from '@hooks/services';

import LoginBanner from '@modules/login/components/LoginBanner';
import { ResetPasswordSchema, getResetPasswordSchema } from '@modules/login/login.schema';

interface ResetPasswordProps {
  token: string;
}

const initialValues = {
  password: '',
  confirmPassword: '',
};

const ResetPassword: NextPage<ResetPasswordProps> = () => {
  const notificationService = useNotificationService();
  const router = useRouter();
  const usersRepository = useUsersRepository();
  const { translate } = useTranslation();

  async function handleSubmit(values: ResetPasswordSchema) {
    const params = new URLSearchParams(window.location.search);

    await notificationService.handleHttpRequest(
      () =>
        usersRepository.resetPassword({
          token: params.get('token') || '',
          password: values.password,
        }),
      {
        feedbackSuccess: translate('feedbacks.changePassword'),
        feedbackError: translate('errors.changePassword'),
        onSuccess: () => {
          router.push('/login');
        },
      }
    );
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
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Box p={4}>
          <Grid container component="main" spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography align="center" variant="h4" component="h1" fontWeight={700}>
                {translate('actions.changePassword')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Formix
                initialValues={initialValues}
                validate={zodValidator(getResetPasswordSchema(translate))}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FXPasswordField name="password" label={translate('common.password')} />
                  </Grid>
                  <Grid item xs={12}>
                    <FXPasswordField
                      name="confirmPassword"
                      label={translate('actions.confirmPassword')}
                    />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <FXSubmitButton fullWidth label={translate('actions.change')} />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button fullWidth color="primary" type="submit" href="/login">
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
