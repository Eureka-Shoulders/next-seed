import { Box, Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import TYPES from 'containers/global.types';
import useUserStore from 'hooks/useUserStore';
import { useInjection } from 'inversify-react';
import UsersRepository from 'modules/users/repository';
import NextLink from 'next/link';

import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix/components';

import { LoginSchema } from './login.schema';

const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const usersRepository = useInjection<UsersRepository>(TYPES.UsersRepository);

  async function handleSubmit(values: LoginSchema) {
    try {
      const response = await usersRepository.login(
        values.email,
        values.password
      );

      userStore.login(response.data.access_token);
    } catch (error) {
      uiStore.snackbar.show({
        message: 'Usuário ou senha inválidos',
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
            Entrar
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
                <FXTextField name="email" label="E-mail" />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField name="password" label="Senha" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <NextLink href="/recover-password" passHref>
                  <MuiLink>Esqueceu sua senha?</MuiLink>
                </NextLink>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Entrar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/register" passHref>
                  <MuiLink>Criar uma conta</MuiLink>
                </NextLink>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
