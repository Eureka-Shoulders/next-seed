import { Grid } from '@mui/material';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import {
  FXAutocomplete,
  FXDatePicker,
  FXTextField,
} from '@euk-labs/formix-mui';

import { personTypes } from './types';

export default function PersonForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FXTextField name="name" label="Nome" />
      </Grid>
      <Grid item xs={6}>
        <FXDatePicker
          name="birthDate"
          label="Data de Nascimento"
          inputFormat="dd/MM/yyyy"
        />
      </Grid>
      <Grid item xs={6}>
        <FXAutocomplete
          options={personTypes}
          name="type"
          label="Tipo de pessoa"
        />
      </Grid>
      <Grid item xs={6}>
        <FXCPFCNPJField name="identifier" typeField="type" />
      </Grid>
    </Grid>
  );
}
