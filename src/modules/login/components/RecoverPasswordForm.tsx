import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import { useUsersRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';

import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

import { ReccoverPasswordSchema, RecoverPasswordSchema } from '../login.schema';

const initialValues = {
  email: '',
};

export default function RecoverPasswordForm() {
  const router = useRouter();
  const notificationService = useNotificationService();
  const usersRepository = useUsersRepository();
  const { translate } = useTranslation();

  async function handleSubmit(values: ReccoverPasswordSchema) {
    const onSuccess = () => {
      router.push('/login');
    };

    await notificationService.handleHttpRequest(
      () => usersRepository.recoverPassword(values.email),
      {
        feedbackSuccess: translate('feedbacks.recoverPassword'),
        feedbackError: translate('errors.recoverPassword'),
        onSuccess,
      }
    );
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
            <Trans id="actions.recoverPassword" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            validate={zodValidator(RecoverPasswordSchema)}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField
                  name="email"
                  label={translate('common.email')}
                  type="email"
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton
                  fullWidth
                  label={translate('actions.recover')}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button fullWidth color="primary" type="submit" href="/login">
                  <Trans id="actions.goBack" />
                </Button>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
