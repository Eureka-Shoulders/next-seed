import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Actions, Subjects, User } from 'types';

import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';
import { withSSRAuth } from '@core/utils/withSSRAuth';

import ProfileCard from '@components/ProfileCard';

import { useUsersRepository } from '@hooks/repositories';
import { useNotificationService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import { ProfileSchema } from '@modules/users/profile.schema';

import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

function Index() {
  const notificationService = useNotificationService();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const userEntity = useEntity(usersRepository);
  const { translate } = useTranslation();
  const initialValues = useMemo(
    () => ({
      name: userStore.user?.person.name || '',
      email: userStore.user?.email || '',
    }),
    [userStore.user]
  );

  useEffect(() => {
    if (userStore.user?.id) {
      userEntity.setIdentifier(userStore.user.id);
      userEntity.fetch();
    }
  }, [userStore.user]); // eslint-disable-line

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

  async function logoutDevices() {
    const refreshToken = userStore.getRefreshToken();

    if (!refreshToken) {
      return notificationService.notify(
        translate('errors.noRefreshToken'),
        'error'
      );
    }

    await notificationService.handleHttpRequest(
      () => usersRepository.logoutDevices(refreshToken),
      {
        feedbackSuccess: translate('feedbacks.logoutDevices'),
        feedbackError: translate('errors.user.logoutDevices'),
      }
    );
  }

  if (!userStore.user) {
    return (
      <Box p={3}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ProfileCard />
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {translate('actions.changeProfile')}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Formix
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validate={zodValidator(ProfileSchema)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FXTextField
                        name="name"
                        label={translate('common.name')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FXTextField
                        name="email"
                        label={translate('common.email')}
                      />
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <FXSubmitButton label={translate('actions.save')} />
                    </Grid>
                  </Grid>
                </Formix>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5">
                  {translate('common.settings')}
                </Typography>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                <Button onClick={logoutDevices}>
                  Sair de outros dispositivos
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default observer(Index);

export const getServerSideProps = withSSRAuth(async () => ({ props: {} }), {
  can: [
    { action: Actions.Read, subject: Subjects.User },
    { action: Actions.Update, subject: Subjects.User },
  ],
});
