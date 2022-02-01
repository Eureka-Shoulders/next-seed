import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import { UserSchema } from 'modules/users/user.schema';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';
import { useEffect } from 'react';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import { getPersonTypes } from '@modules/people/types';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import {
  FXAutocomplete,
  FXDatePicker,
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

// TODO: translate this
function Index() {
  const uiStore = useUIStore();
  const router = useRouter();
  const { id } = router.query;

  if (Array.isArray(id)) {
    router.replace('/users');
  }

  const usersRepository = useUsersRepository();
  const userEntity = useEntity(usersRepository, id as string);

  async function handleSubmit(values: UserSchema) {
    try {
      const updatedUser = pipe(
        omit(['confirmPassword']),
        dissocPath(['person', 'type'])
      )(values);

      await userEntity.update(updatedUser);
      uiStore.snackbar.show({
        message: 'Usuário atualizado com sucesso!',
        severity: 'success',
      });
      router.push('/users');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            'Ocorreu um erro ao atualizar o usuário!',
          severity: 'error',
        });
      }
    }
  }

  useEffect(() => {
    if (userEntity.identifier) {
      userEntity.fetch();
    }
  }, [userEntity.identifier]); // eslint-disable-line

  if (userEntity.data && userEntity.identifier) {
    return (
      <Box p={3} mb={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumb />
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Formix
                initialValues={userEntity.data as UserSchema}
                zodSchema={UserSchema}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FXTextField name="person.name" label="Nome" />
                  </Grid>
                  <Grid item xs={12}>
                    <FXAutocomplete
                      options={getPersonTypes(router)}
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

  if (userEntity.identifier === null || userEntity.loading) {
    return <h1>Loading...</h1>;
  }

  if (userEntity.data === null) {
    return <h1>User not found</h1>;
  }

  return null;
}

export default observer(Index);
