import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import FXSubmitButton from '@components/FXSubmitButton';
import FXTextField from '@components/Inputs/FXTextField';

import { useUsersRepository } from '@hooks/repositories';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';

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
        message:
          'Recuperação enviada com sucesso! Confira sua caixa de entrada.',
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            'Ocorreu um erro ao solicitar recuperação de senha!',
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
            Recuperar Senha
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
                <FXTextField name="email" label="E-mail" type="email" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton fullWidth label="Recuperar" />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button fullWidth color="primary" type="submit" href="/login">
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Formix>
        </Grid>
      </Grid>
    </Box>
  );
}
