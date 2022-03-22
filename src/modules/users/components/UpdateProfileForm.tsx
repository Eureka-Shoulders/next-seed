import { Grid } from '@mui/material';
import { User } from 'types';

import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';

import { useNotificationService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import { EntityStore } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

import { ProfileSchema } from '../profile.schema';

interface Props {
  userEntity: EntityStore;
}

function UpdateProfileForm({ userEntity }: Props) {
  const { translate } = useTranslation();
  const notificationService = useNotificationService();
  const userStore = useUserStore();

  async function handleSubmit(values: ProfileSchema) {
    const newData = {
      person: {
        name: values.name,
      },
      email: values.email,
    };
    const onSuccess = () => {
      userStore.setUser(userEntity.data as User);
    };

    await notificationService.handleHttpRequest(
      () => userEntity.update(newData),
      {
        feedbackSuccess: translate('feedbacks.user.updated'),
        feedbackError: translate('errors.users.update'),
        onSuccess,
      }
    );
  }

  return (
    <Formix
      initialValues={userEntity.data as ProfileSchema}
      onSubmit={handleSubmit}
      validate={zodValidator(ProfileSchema)}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FXTextField name="name" label={translate('common.name')} />
        </Grid>
        <Grid item xs={6}>
          <FXTextField name="email" label={translate('common.email')} />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <FXSubmitButton label={translate('actions.save')} />
        </Grid>
      </Grid>
    </Formix>
  );
}

export default UpdateProfileForm;
