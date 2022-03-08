import { Box, Grid, Link as MuiLink, Typography } from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Trans from '@core/components/Trans';
import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import FXCPFCNPJField from '@components/Inputs/FXCPFCNPJField';

import { useUsersRepository } from '@hooks/repositories';

import { getPersonTypes } from '@modules/people/types';
import { UserSchema, getUserSchema } from '@modules/users/user.schema';

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
  const { translate } = useTranslation();
  const uiStore = useUIStore();
  const router = useRouter();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: UserSchema) {
    try {
      await usersRepository.register(values);

      uiStore.snackbar.show({
        message: translate('feedbacks.user.created'),
        severity: 'success',
      });

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error))
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.users.creation'),
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
            <Trans id="actions.createAccount" />
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Formix
            initialValues={initialValues}
            validate={zodValidator(getUserSchema(translate))}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FXTextField
                  name="email"
                  label={translate('common.email')}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FXTextField
                  name="person.name"
                  label={translate('common.name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXAutocomplete
                  options={getPersonTypes(translate)}
                  name="person.type"
                  label={translate('common.personType')}
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
                  label={translate('common.birthDate')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField
                  name="password"
                  label={translate('common.password')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FXPasswordField
                  name="confirmPassword"
                  label={translate('actions.confirmPassword')}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <FXSubmitButton
                  fullWidth
                  label={translate('actions.register')}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <NextLink href="/login" passHref>
                  <MuiLink>
                    <Trans id="common.alreadyHaveAccount" />
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
