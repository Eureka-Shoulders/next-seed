import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { Button, Grid } from '@mui/material';

import { zodValidator } from '@core/utils/validators';

import UnloadListener from '@components/listeners/UnloadListener';

import { useUsersRepository } from '@hooks/repositories';
import { useTranslation } from '@hooks/services';
import { useNotificationService } from '@hooks/services';

import { RecoverPasswordSchema, RecoverPasswordValues } from '../login.schema';

type RecoverPasswordFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  email?: string;
};

export default function RecoverPasswordForm({
  onCancel,
  onSuccess,
  email,
}: RecoverPasswordFormProps) {
  const usersRepository = useUsersRepository();
  const { translate } = useTranslation();
  const notificationService = useNotificationService();

  async function handleSubmit(values: RecoverPasswordValues) {
    await notificationService.handleHttpRequest(
      () => usersRepository.recoverPassword(values.email),
      {
        feedbackError: translate('errors.recoverPassword'),
        feedbackSuccess: translate('feedbacks.recoverPassword'),
        onSuccess: () => onSuccess(),
      }
    );
  }

  return (
    <Formix
      initialValues={{ email: email || '' }}
      validate={zodValidator(RecoverPasswordSchema)}
      onSubmit={handleSubmit}
    >
      <UnloadListener />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FXTextField name="email" label={translate('common.email')} type="email" />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center">
          <FXSubmitButton fullWidth label={translate('actions.recover')} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button onClick={onCancel} color="primary" variant="outlined" fullWidth>
            {translate('actions.goBack')}
          </Button>
        </Grid>
      </Grid>
    </Formix>
  );
}
