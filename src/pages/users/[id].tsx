import { Box, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

import AuthLoader from '@core/components/AuthLoader';
import EntityUpdateWrapper from '@core/components/EntityUpdateWrapper';

import { useUsersRepository } from '@hooks/repositories';

import UpdateUserForm from '@modules/users/components/UpdateUserForm';

import { Breadcrumb } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';

function Index() {
  const router = useRouter();
  const usersRepository = useUsersRepository();

  const { id } = router.query;
  const userEntity = useEntity(usersRepository, id as string);

  return (
    <AuthLoader>
      <EntityUpdateWrapper entityStore={userEntity}>
        <Box p={3} mb={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Breadcrumb />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <UpdateUserForm userEntity={userEntity} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </EntityUpdateWrapper>
    </AuthLoader>
  );
}

export default Index;
