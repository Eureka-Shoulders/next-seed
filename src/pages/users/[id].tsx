import { Breadcrumb } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Box, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

import EntityUpdateWrapper from '@components/utility/EntityUpdateWrapper';

import { useUsersRepository } from '@hooks/repositories';

import UpdateUserForm from '@modules/users/components/UpdateUserForm';

function Index() {
  const router = useRouter();
  const usersRepository = useUsersRepository();

  const { id } = router.query;
  const userEntity = useEntity(usersRepository, id as string);

  return (
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
  );
}

export default Index;
