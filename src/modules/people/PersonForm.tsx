import { Grid } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import {
  FXAutocomplete,
  FXDatePicker,
  FXTextField,
} from '@euk-labs/formix-mui';

import { getPersonTypes } from './types';

export default function PersonForm() {
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FXTextField name="name" label={getLocaleString('name', router)} />
      </Grid>
      <Grid item xs={12}>
        <FXAutocomplete
          options={getPersonTypes(router)}
          name="type"
          label={getLocaleString('personType', router)}
        />
      </Grid>
      <Grid item xs={12}>
        <FXCPFCNPJField name="identifier" typeField="type" />
      </Grid>
      <Grid item xs={12}>
        <FXDatePicker
          name="birthDate"
          label={getLocaleString('birthDate', router)}
          inputFormat="dd/MM/yyyy"
        />
      </Grid>
    </Grid>
  );
}
