import { EntityStore } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import {
  FXAutocomplete,
  FXDatePicker,
  FXPasswordField,
  FXSubmitButton,
  FXTextField,
} from '@euk-labs/formix-mui';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { dissocPath, omit, pipe } from 'ramda';

import { zodValidator } from '@core/utils/validators';

import FXCPFCNPJField from '@components/form/FXCPFCNPJField';

import { useTranslation } from '@hooks/services';
import { useNotificationService } from '@hooks/services';

import { getPersonTypes } from '@modules/people/types';

import { UserSchema, getUserSchema } from '../user.schema';

interface Props {
  userEntity: EntityStore;
}

function UpdateUserForm({ userEntity }: Props) {
  const { translate } = useTranslation();
  const router = useRouter();
  const notificationService = useNotificationService();

  async function handleSubmit(values: UserSchema) {
    const onSuccess = () => {
      router.push('/users');
    };
    const updatedUser = pipe(omit(['confirmPassword']), dissocPath(['person', 'type']))(values);

    await notificationService.handleHttpRequest(() => userEntity.update(updatedUser), {
      feedbackSuccess: translate('feedbacks.user.updated'),
      feedbackError: translate('errors.user.update'),
      onSuccess,
    });
  }

  return (
    <Formix
      initialValues={userEntity.data as UserSchema}
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
        <Grid item xs={6}>
          <FXAutocomplete
            options={getPersonTypes(translate)}
            name="person.type"
            label={translate('common.personType')}
          />
        </Grid>
        <Grid item xs={6}>
          <FXCPFCNPJField name="person.identifier" typeField="person.type" />
        </Grid>
        <Grid item xs={12}>
          <FXTextField name="email" label={translate('common.email')} />
        </Grid>
        <Grid item xs={6}>
          <FXPasswordField name="password" label={translate('common.password')} />
        </Grid>
        <Grid item xs={6}>
          <FXPasswordField name="confirmPassword" label={translate('actions.confirmPassword')} />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <FXSubmitButton label={translate('actions.save')} />
        </Grid>
      </Grid>
    </Formix>
  );
}

export default UpdateUserForm;
