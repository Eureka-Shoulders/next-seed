import { Box, Grid, Paper } from '@mui/material';

import CreateUserForm from '@modules/users/components/CreateUserForm';

import { Breadcrumb } from '@euk-labs/componentz';

function Index() {
  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <CreateUserForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
