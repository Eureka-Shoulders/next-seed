import { Box, Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import UsersRepository from 'modules/users/repository';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix/components';

import { RegisterSchema } from './register.schema';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

export default function RegisterForm() {
  const uiStore = useUIStore();
  const router = useRouter();
  const usersRepository = useInjection<UsersRepository>(TYPES.UsersRepository);

  async function handleSubmit(values: RegisterSchema) {
    try {
      await usersRepository.create(values);
      uiStore.snackbar.show({
        message: 'Usuário criado com sucesso',
        severity: 'success',
      });
      router.push('/login');
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
            Criar conta
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            zodSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="email" label="E-mail" type="email" />
              </Grid>
              <Grid item xs={12}>
                <FXTextField name="username" label="Username" />
              </Grid>
              <Grid item xs={12}>
                <FXPasswordField name="password" label="Password" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/login" passHref>
                  <MuiLink>Já tem uma conta?</MuiLink>
                </NextLink>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
