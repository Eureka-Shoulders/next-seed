import { Grid } from '@mui/material';

import ContactsField from './ContactsField';

export default function ContactsForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ContactsField />
      </Grid>
    </Grid>
  );
}
