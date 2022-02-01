import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import { UserSchema } from 'modules/users/user.schema';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import { personTypes } from '@modules/people/types';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import {
  FXAutocomplete,
  FXDatePicker,
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

('@euk-labs/formix-mui');

const initialValues = {
  avatar: null,
  person: {
    name: '',
    type: null,
    identifier: '',
    birthDate: null,
    addresses: [],
    contacts: [],
  },
  email: '',
  password: '',
  confirmPassword: '',
};

function Index() {
  const router = useRouter();
  const uiStore = useUIStore();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: UserSchema) {
    try {
      const newUser = pipe(
        omit(['confirmPassword']),
        dissocPath(['person', 'type'])
      )(values);

      await usersRepository.create(newUser);
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
              zodSchema={UserSchema}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FXTextField name="person.name" label="Nome" />
                </Grid>
                <Grid item xs={12}>
                  <FXAutocomplete
                    options={personTypes}
                    name="person.type"
                    label="Tipo de pessoa"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FXCPFCNPJField
                    name="person.identifier"
                    typeField="person.type"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FXDatePicker
                    name="person.birthDate"
                    label="Data de Nascimento"
                    inputFormat="dd/MM/yyyy"
                  />
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
