import { Box, Grid, Paper } from '@mui/material';

import CreatePersonForm from '@modules/people/components/CreatePersonForm';

import { Breadcrumb } from '@euk-labs/componentz';

function Index() {
  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined">
            <CreatePersonForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
