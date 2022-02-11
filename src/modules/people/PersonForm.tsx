import { Grid } from '@mui/material';

import FXCPFCNPJField from '@components/FXCPFCNPJField';

import useTranslation from '@hooks/useTranslation';

import {
  FXAutocomplete,
  FXDatePicker,
  FXTextField,
} from '@euk-labs/formix-mui';

import { getPersonTypes } from './types';

export default function PersonForm() {
  const { translate } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FXTextField name="name" label={translate('common.name')} />
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
          options={getPersonTypes(translate)}
          name="type"
          label={translate('common.personType')}
        />
      </Grid>
      <Grid item xs={6}>
        <FXCPFCNPJField name="identifier" typeField="type" />
      </Grid>
      <Grid item xs={12}>
        <FXDatePicker
          name="birthDate"
          label={translate('common.birthDate')}
          inputFormat="dd/MM/yyyy"
        />
      </Grid>
    </Grid>
  );
}
