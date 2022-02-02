import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { observer } from 'mobx-react-lite';
import { UserSchema } from 'modules/users/user.schema';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import useTranslation from '@hooks/useTranslation';

import { getPersonTypes } from '@modules/people/types';

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
  const { translate } = useTranslation();

  async function handleSubmit(values: UserSchema) {
    try {
      const newUser = pipe(
        omit(['confirmPassword']),
        dissocPath(['person', 'type'])
      )(values);

      await usersRepository.create(newUser);
      uiStore.snackbar.show({
        message: translate('feedbacks.users.created'),
        severity: 'success',
      });
      router.push('/users');
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
                  <FXTextField
                    name="person.name"
                    label={translate('common.name')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FXAutocomplete
                    options={getPersonTypes(translate)}
                    name="person.type"
                    label={translate('common.personType')}
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
                    label={translate('common.birthDate')}
                    inputFormat="dd/MM/yyyy"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FXTextField name="email" label={translate('common.email')} />
                </Grid>
                <Grid item xs={6}>
                  <FXPasswordField
                    name="password"
                    label={translate('common.password')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FXPasswordField
                    name="confirmPassword"
                    label={translate('common.confirmPassword')}
                  />
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <FXSubmitButton label={translate('actions.save')} />
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
