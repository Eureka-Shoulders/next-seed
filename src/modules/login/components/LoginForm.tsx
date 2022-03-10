import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import NextLink from 'next/link';

import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import { useUsersRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import { Formix } from '@euk-labs/formix';
import {
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

import { LoginSchema, getLoginSchema } from '../login.schema';

const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const { translate } = useTranslation();
  const notificationService = useNotificationService();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: LoginSchema) {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect') || undefined;

    try {
      const response = await usersRepository.login(
        values.email,
        values.password
      );

      userStore.login(
        response.data.accessToken,
        response.data.refreshToken,
        redirectTo
      );
    } catch (error) {
      notificationService.notify(
        translate('errors.invalidCredentials'),
        'error'
      );
    }
  }

  return (
    <Box p={4}>
      <Grid container component="main" spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h4"
            component="h1"
            fontWeight={700}
          >
            <Trans id="actions.login" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            validate={zodValidator(getLoginSchema(translate))}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="email" label={translate('common.email')} />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField
                  name="password"
                  label={translate('common.password')}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <NextLink href="/recover-password" passHref>
                  <MuiLink>
                    <Trans id="common.forgotPassword" />
                  </MuiLink>
                </NextLink>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton fullWidth label={translate('actions.login')} />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/register" passHref>
                  <MuiLink>
                    <Trans id="actions.createAccount" />
                  </MuiLink>
                </NextLink>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}