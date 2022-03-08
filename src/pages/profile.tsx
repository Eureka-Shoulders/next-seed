import { Box, Button, Grid, Paper, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Actions, Subjects, User } from 'types';

import useTranslation from '@core/hooks/useTranslation';
import { zodValidator } from '@core/utils/validators';
import { withSSRAuth } from '@core/utils/withSSRAuth';

import ProfileCard from '@components/ProfileCard';

import { useUsersRepository } from '@hooks/repositories';
import { useUserStore } from '@hooks/stores';

import { ProfileSchema } from '@modules/users/profile.schema';

import { useUIStore } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

function Index() {
  const uiStore = useUIStore();
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
    try {
      await userEntity.update({
        person: {
          name: values.name,
        },
        email: values.email,
      });
      uiStore.snackbar.show({
        message: translate('feedbacks.user.updated'),
        severity: 'success',
      });
      userStore.setUser(userEntity.data as User);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        uiStore.snackbar.show({
          message:
            error.response?.data.message || translate('errors.users.update'),
          severity: 'error',
        });
      }
    }
  }

  async function logoutDevices() {
    const refreshToken = userStore.getRefreshToken();

    try {
      if (!refreshToken) {
        return uiStore.snackbar.show({
          message: translate('errors.noRefreshToken'),
          severity: 'error',
        });
      }

      await usersRepository.logoutDevices(refreshToken);

      uiStore.snackbar.show({
        message: translate('feedbacks.logoutDevices'),
        severity: 'success',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        uiStore.snackbar.show({
          message:
            error.response?.data.message ||
            translate('errors.user.logoutDevices'),
          severity: 'error',
        });
      }
    }
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
