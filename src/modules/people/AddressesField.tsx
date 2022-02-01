import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import Trans from '@components/Trans';

import { useArrayField } from '@euk-labs/formix';
import { FXTextField } from '@euk-labs/formix-mui';

function AddressesField() {
  const name = 'addresses';
  const router = useRouter();
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
              <Trans id="address" /> {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <FXTextField
              name={`${name}.${index}.zipcode`}
              label={getLocaleString('zipcode', router)}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.street`}
              label={getLocaleString('street', router)}
            />
          </Grid>
          <Grid item xs={3}>
            <FXTextField
              name={`${name}.${index}.number`}
              label={getLocaleString('number', router)}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.neighborhood`}
              label={getLocaleString('neighborhood', router)}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.city`}
              label={getLocaleString('city', router)}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.state`}
              label={getLocaleString('state', router)}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.country`}
              label={getLocaleString('country', router)}
            />
          </Grid>

          {!isLastItem(index) && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => helpers.push(newAddress)}>
          <AddIcon />
          <Trans id="add" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default observer(AddressesField);
