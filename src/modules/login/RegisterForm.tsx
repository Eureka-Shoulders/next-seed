import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { UserSchema } from 'modules/users/user.schema';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import { personTypes } from '@modules/people/types';

import { useUIStore } from '@euk-labs/componentz';
import { Formix } from '@euk-labs/formix';
import {
  FXAutocomplete,
  FXDatePicker,
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

const initialValues = {
  person: {
    name: '',
    identifier: '',
    type: null,
    birthDate: null,
    addresses: [],
    contacts: [],
  },
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm() {
  const uiStore = useUIStore();
  const router = useRouter();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: UserSchema) {
    try {
      await usersRepository.register(values);

      uiStore.snackbar.show({
        message: 'Usuário criado com sucesso',
        severity: 'success',
      });

      router.push('/login');
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
            zodSchema={UserSchema}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField name="email" label="E-mail" type="email" />
              </Grid>
              <Grid item xs={12}>
                <FXTextField name="person.name" label="Nome" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXAutocomplete
                  options={personTypes}
                  name="person.type"
                  label="Tipo de pessoa"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXCPFCNPJField
                  name="person.identifier"
                  typeField="person.type"
                />
              </Grid>
              <Grid item xs={12}>
                <FXDatePicker
                  name="person.birthDate"
                  label="Data de Nascimento"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField name="password" label="Senha" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField
                  name="confirmPassword"
                  label="Confirmar Senha"
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton fullWidth label="Cadastrar" />
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
