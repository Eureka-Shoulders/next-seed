import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Breadcrumb } from '@euk-labs/componentz';

// import { Formix } from '@euk-labs/formix';

// const userInitialValues = {
//   name: '',
//   email: '',
//   password: '',
// };

function Index() {
  return (
    <Box p={3} mb={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>

        <Grid item xs={12}>
          {/* <Formix initialValues={userInitialValues}></Formix> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default observer(Index);
