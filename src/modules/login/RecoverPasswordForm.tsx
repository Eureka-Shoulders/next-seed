import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import Trans from '@components/Trans';

import { useUsersRepository } from '@hooks/repositories';

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

  async function handleSubmit(values: RecoverPasswordSchema) {
    try {
      await usersRepository.recoverPassword(values.email);

      uiStore.snackbar.show({
        message: getLocaleString('feedback.recoverPassword', router),
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            getLocaleString('errors.recoverPassword', router),
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
            <Trans id="recoverPassword" />
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
                  label={getLocaleString('email', router)}
                  type="email"
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton
                  fullWidth
                  label={getLocaleString('recover', router)}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button fullWidth color="primary" type="submit" href="/login">
                  <Trans id="goBack" />
                </Button>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
