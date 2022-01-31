import { Grid } from '@mui/material';

import { FXDatePicker, FXTextField } from '@euk-labs/formix-mui';

export default function PersonForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FXTextField name="name" label="Nome" />
      </Grid>
      <Grid item xs={6}>
        <FXTextField name="identifier" label="Identificador (CPF, CNPJ...)" />
      </Grid>
      <Grid item xs={12}>
        <FXDatePicker
          name="birthDate"
          label="Data de Nascimento"
          inputFormat="dd/MM/yyyy"
        />
      </Grid>
    </Grid>
  );
}
