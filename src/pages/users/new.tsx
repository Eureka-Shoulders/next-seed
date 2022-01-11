import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import { NewUserSchema } from 'modules/users/user.schema';
import { useRouter } from 'next/router';

import FXSubmitButton from '@components/FXSubmitButton';
import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix/components';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Index() {
  const router = useRouter();
  const uiStore = useUIStore();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: NewUserSchema) {
    try {
      await usersRepository.create<
        Partial<NewUserSchema>,
        Omit<NewUserSchema, 'confirmPassword'> & { id: string }
      >({ ...values, confirmPassword: undefined });

      uiStore.snackbar.show({
        message: 'Usuário criado com sucesso',
        severity: 'success',
      });

      router.push('/users');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            'Ocorreu um erro ao criar o usuário!',
          severity: 'error',
        });
    }
  }

  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Formix
              initialValues={initialValues}
              zodSchema={NewUserSchema}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FXTextField name="name" label="Nome" />
                </Grid>
                <Grid item xs={6}>
                  <FXTextField name="email" label="E-mail" />
                </Grid>
                <Grid item xs={6}>
                  <FXPasswordField name="password" label="Senha" />
                </Grid>
                <Grid item xs={6}>
                  <FXPasswordField
                    name="confirmPassword"
                    label="Confirmar Senha"
                  />
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <FXSubmitButton label="Salvar" />
                </Grid>
              </Grid>
            </Formix>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default observer(Index);
