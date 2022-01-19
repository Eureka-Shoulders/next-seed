import { Grid } from '@mui/material';

import AddressesField from './AddressesField';

export default function AddressesForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AddressesField />
      </Grid>
    </Grid>
  );
}
