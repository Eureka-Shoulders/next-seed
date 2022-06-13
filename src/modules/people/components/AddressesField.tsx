import { useArrayField } from '@euk-labs/formix';
import { FXTextField } from '@euk-labs/formix-mui';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import Trans from '@components/utility/Trans';
import When from '@components/utility/When';

import { useTranslation } from '@hooks/services';

function AddressesField() {
  const name = 'addresses';
  const { translate } = useTranslation();
  const { values, helpers } = useArrayField(name);
  const newAddress = {
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  };
  const isLastItem = (index: number) => index === values.length - 1;

  return (
    <Grid container spacing={2}>
      {values.map((_address, index) => (
        <Fragment key={`address-${index}`}>
          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="bold">
              <Trans id="common.address" /> {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <FXTextField name={`${name}.${index}.zipcode`} label={translate('common.zipcode')} />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.street`} label={translate('common.street')} />
          </Grid>
          <Grid item xs={3}>
            <FXTextField name={`${name}.${index}.number`} label={translate('common.number')} />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.neighborhood`}
              label={translate('common.neighborhood')}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.city`} label={translate('common.city')} />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.state`} label={translate('common.state')} />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.country`} label={translate('common.country')} />
          </Grid>

          <When isNot={isLastItem(index)}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </When>
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => helpers.push(newAddress)}>
          <AddIcon />
          <Trans id="actions.add" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default observer(AddressesField);
