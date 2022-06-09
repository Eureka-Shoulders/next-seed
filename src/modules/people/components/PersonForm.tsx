import { FXAutocomplete, FXDatePicker, FXTextField } from '@euk-labs/formix-mui';
import { Grid } from '@mui/material';

import FXCPFCNPJField from '@components/Inputs/FXCPFCNPJField';

import { useTranslation } from '@hooks/services';

import { getPersonTypes } from '../types';

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
          label={translate('common.birthDate')}
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
    </Grid>
  );
}
