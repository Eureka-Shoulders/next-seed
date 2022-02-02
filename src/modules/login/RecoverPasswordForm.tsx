import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import Trans from '@components/Trans';

import { useUsersRepository } from '@hooks/repositories';
import useTranslation from '@hooks/useTranslation';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

import { RecoverPasswordSchema } from './login.schema';

const initialValues = {
  email: '',
};

export default function RecoverPasswordForm() {
  const router = useRouter();
  const uiStore = useUIStore();
  const usersRepository = useUsersRepository();
  const { translate } = useTranslation();

  async function handleSubmit(values: RecoverPasswordSchema) {
    try {
      await usersRepository.recoverPassword(values.email);

      uiStore.snackbar.show({
        message: translate('feedbacks.recoverPassword'),
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.recoverPassword'),
          severity: 'error',
        });
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
            <Trans id="actions.recoverPassword" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={RecoverPasswordSchema}
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
