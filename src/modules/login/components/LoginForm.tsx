import { Formix } from '@euk-labs/formix';
import {
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

// TODO: Logo
// import GPLogoImage from '@components/GPLogoImage';
import { useUsersRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import { LoginSchema, getLoginSchema } from '../login.schema';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const { translate } = useTranslation();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const notificationService = useNotificationService();

  async function handleSubmit(values: LoginSchema) {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect') || undefined;
    await notificationService.handleHttpRequest(
      () => usersRepository.login(values.email, values.password),
      {
        feedbackError: translate('errors.systemError'),
        onSuccess: (response) => {
          userStore.login(
            response.data.accessToken,
            response.data.refreshToken,
            redirectTo
          );
        },
      }
    );
  }

  return (
    <Box p={4}>
      <Grid container component="main" spacing={2} justifyContent="center">
        <Grid item xs="auto">
          {/* <GPLogoImage height={350} /> */}
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            <Trans id="common.welcomeBack" />
          </Typography>
          <Typography
            align="center"
            variant="h4"
            component="h1"
            fontWeight={700}
          >
            <Trans id="common.makeLogin" />
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

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton fullWidth label={translate('actions.login')} />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Link href="/recover-password" passHref>
                  <Button variant="outlined" fullWidth color="primary">
                    <Trans id="common.forgotPassword" />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
