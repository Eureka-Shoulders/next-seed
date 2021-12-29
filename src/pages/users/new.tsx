import ERROR_MESSAGES from '@config/messages';
import { Box, Grid, Paper } from '@mui/material';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';
import usersRepository from 'modules/users/repository';
import { useRouter } from 'next/router';
import * as zod from 'zod';

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
const NewUserSchema = zod
  .object({
    name: zod.string().min(1, ERROR_MESSAGES.required),
    email: zod.string().email(ERROR_MESSAGES.invalid_email),
    password: zod.string().min(8, ERROR_MESSAGES.minimum_password),
    confirmPassword: zod.string().min(8, ERROR_MESSAGES.minimum_password),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.password_mismatch,
    path: ['confirmPassword'],
  });

type NewUserSchema = zod.infer<typeof NewUserSchema>;

function Index() {
  const router = useRouter();
  const uiStore = useUIStore();

  async function handleSubmit(values: NewUserSchema) {
    try {
      const response = await usersRepository.create<
        NewUserSchema,
        Omit<NewUserSchema, 'confirmPassword'> & { id: string }
      >(values);

      uiStore.snackbar.show({
        message: 'Usuário criado com sucesso',
        severity: 'success',
      });
      router.push('/users/' + response.data?.id);
    } catch (error) {
      uiStore.snackbar.show({
        message:
          (error as AxiosError).response?.data.message ||
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
