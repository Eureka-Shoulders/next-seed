import { Box, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

import AuthLoader from '@core/components/AuthLoader';
import EntityUpdateWrapper from '@core/components/EntityUpdateWrapper';

import { usePeopleRepository } from '@hooks/repositories';

import UpdatePersonForm from '@modules/people/components/UpdatePersonForm';

import { Breadcrumb } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';

function Index() {
  const router = useRouter();
  const peopleRepository = usePeopleRepository();

  const { id } = router.query;
  const personEntity = useEntity(peopleRepository, id as string);

  return (
    <AuthLoader>
      <EntityUpdateWrapper entityStore={personEntity}>
        <Box p={3} mb={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Breadcrumb />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined">
                <UpdatePersonForm personEntity={personEntity} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </EntityUpdateWrapper>
    </AuthLoader>
  );
}

export default Index;
