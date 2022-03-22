import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';

import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import FXCPFCNPJField from '@components/Inputs/FXCPFCNPJField';

import { useUsersRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';

import { getPersonTypes } from '@modules/people/types';

import { Formix } from '@euk-labs/formix';
import {
  FXAutocomplete,
  FXDatePicker,
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';

import { initialValuesForCreate } from '../initialValues';
import { UserSchema, getUserSchema } from '../user.schema';

function CreateUserForm() {
  const { translate } = useTranslation();
  const router = useRouter();
  const notificationService = useNotificationService();
  const usersRepository = useUsersRepository();

  async function handleSubmit(values: UserSchema) {
    const newUser = pipe(
      omit(['confirmPassword']),
      dissocPath(['person', 'type'])
    )(values);
    const onSuccess = () => {
      router.push('/users');
    };

    await notificationService.handleHttpRequest(
      () => usersRepository.create(newUser),
      {
        feedbackSuccess: translate('feedbacks.user.created'),
        feedbackError: translate('errors.users.creation'),
        onSuccess,
      }
    );
  }

  return (
    <Formix
      initialValues={initialValuesForCreate}
      validate={zodValidator(getUserSchema(translate))}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FXTextField name="person.name" label={translate('common.name')} />
        </Grid>
        <Grid item xs={6}>
          <FXDatePicker
            name="person.birthDate"
            label={translate('common.birthDate')}
            inputFormat="dd/MM/yyyy"
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
          <FXCPFCNPJField name="person.identifier" typeField="person.type" />
        </Grid>

        <Grid item xs={12}>
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
            label={translate('actions.confirmPassword')}
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <FXSubmitButton label={translate('actions.save')} />
        </Grid>
      </Grid>
    </Formix>
  );
}

export default CreateUserForm;
