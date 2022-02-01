import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import getLocaleString from 'locales/getLocaleString';
import { UserSchema } from 'modules/users/user.schema';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import FXCPFCNPJField from '@components/FXCPFCNPJField';
import Trans from '@components/Trans';

import { getPersonTypes } from '@modules/people/types';

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
        message: getLocaleString('feedback.users.created', router),
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            getLocaleString('errors.userCreation', router),
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
            <Trans id="createAccount" />
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
                <FXTextField
                  name="email"
                  label={getLocaleString('email', router)}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FXTextField
                  name="person.name"
                  label={getLocaleString('name', router)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXAutocomplete
                  options={getPersonTypes(router)}
                  name="person.type"
                  label={getLocaleString('personType', router)}
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
                  label={getLocaleString('birthDate', router)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField
                  name="password"
                  label={getLocaleString('password', router)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField
                  name="confirmPassword"
                  label={getLocaleString('confirmPassword', router)}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton
                  fullWidth
                  label={getLocaleString('register', router)}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/login" passHref>
                  <MuiLink>
                    <Trans id="alreadyHaveAccount" />
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
