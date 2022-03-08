import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';
import { useEffect } from 'react';

import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import FXCPFCNPJField from '@components/Inputs/FXCPFCNPJField';

import { useUsersRepository } from '@hooks/repositories';

import { getPersonTypes } from '@modules/people/types';
import { UserSchema, getUserSchema } from '@modules/users/user.schema';

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

function Index() {
  const { translate } = useTranslation();
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
        message: translate('feedbacks.user.updated'),
        severity: 'success',
      });
      router.push('/users');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.user.update'),
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
                validate={zodValidator(getUserSchema(translate))}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FXTextField
                      name="person.name"
                      label={translate('common.name')}
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
                    <FXAutocomplete
                      options={getPersonTypes(translate)}
                      name="person.type"
                      label={translate('common.personType')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FXCPFCNPJField
                      name="person.identifier"
                      typeField="person.type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FXTextField
                      name="email"
                      label={translate('common.email')}
                    />
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
                      label={translate('actions.confirmPassword')}
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

  if (userEntity.identifier === null || userEntity.loading) {
    return <h1>{translate('common.loading')}...</h1>;
  }

  if (userEntity.data === null) {
    return <h1>{translate('errors.users.notFound')}</h1>;
  }

  return null;
}

export default observer(Index);
