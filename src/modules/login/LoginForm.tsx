import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import { useUsersRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import getLocaleString from 'locales/getLocaleString';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Trans from '@components/Trans';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import {
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

import { LoginSchema } from './login.schema';

const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: LoginSchema) {
    try {
      const response = await usersRepository.login(
        values.email,
        values.password
      );

      userStore.login(response.data.access_token);
    } catch (error) {
      uiStore.snackbar.show({
        message: getLocaleString('errors.login.invalidCredentials', router),
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
            <Trans id="login" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField
                  name="email"
                  label={getLocaleString('email', router)}
                />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField
                  name="password"
                  label={getLocaleString('password', router)}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <NextLink href="/recover-password" passHref>
                  <MuiLink>
                    <Trans id="forgotPassword" />
                  </MuiLink>
                </NextLink>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton
                  fullWidth
                  label={getLocaleString('login', router)}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/register" passHref>
                  <MuiLink>
                    <Trans id="createAccount" />
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
