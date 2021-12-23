import ERROR_MESSAGES from '@config/messages';
import { Box, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import usersRepository from 'modules/users/repository';
import { useRouter } from 'next/router';
import * as zod from 'zod';

import FXSubmitButton from '@components/FXSubmitButton';
import FXPasswordField from '@components/Inputs/FXPasswordField';
import FXTextField from '@components/Inputs/FXTextField';

import { Breadcrumb } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';

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

  async function handleSubmit(values: NewUserSchema) {
    await usersRepository.create({ ...values, confirmPassword: undefined });
    router.push('/users');
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
