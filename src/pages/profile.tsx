import { Avatar, Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import getPersonType from '@utils/getPersonType';
import { withSSRAuth } from '@utils/withSSRAuth';
import axios from 'axios';
import { useUsersRepository } from 'hooks/repositories';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import { UserSchema } from 'modules/users/user.schema';
import { useEffect } from 'react';
import { Actions, Subjects, User } from 'types';

import useTranslation from '@hooks/useTranslation';

import { useUIStore } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';

function getInitialValues(user: User) {
  return {
    ...user,
    person: {
      ...user.person,
      birthDate: new Date(user.person.birthDate),
      type: getPersonType(user.person.identifier),
      contacts: [],
      addresses: [],
    },
    password: user.password || '',
    confirmPassword: '',
  };
}

const ProfileCard = observer(() => {
  const userStore = useUserStore();
  const { translate } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={userStore.user?.avatar ?? undefined}
        sx={{
          width: 150,
          height: 150,
        }}
      />
      <Typography variant="h6" textAlign="center">
        {userStore.user?.person.name || translate('common.noName')}
      </Typography>
    </Box>
  );
});

function Index() {
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const userEntity = useEntity(usersRepository);
  const { translate } = useTranslation();

  useEffect(() => {
    if (userStore.user?.id) {
      userEntity.setIdentifier(userStore.user.id);
      userEntity.fetch();
    }
  }, [userStore.user]); // eslint-disable-line

  async function handleSubmit(values: UserSchema) {
    try {
      await userEntity.update(values);
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
                  initialValues={getInitialValues(userStore.user)}
                  onSubmit={handleSubmit}
                  zodSchema={UserSchema}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FXTextField
                        name="person.name"
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
    { action: Actions.Read, subject: Subjects.Users },
    { action: Actions.Update, subject: Subjects.Users },
  ],
});
