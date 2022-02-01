import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import getLocaleString from 'locales/getLocaleString';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import Trans from '@components/Trans';

import { useArrayField } from '@euk-labs/formix';
import { FXAutocomplete, FXTextField } from '@euk-labs/formix-mui';

function ContactsField() {
  const router = useRouter();
  const { values, helpers } = useArrayField('contacts');
  const newContact = {
    type: null,
    value: '',
  };
  const contactTypes = [
    {
      label: getLocaleString('phone', router),
      value: 'PHONE',
    },
    {
      label: getLocaleString('email', router),
      value: 'EMAIL',
    },
    {
      label: getLocaleString('facebook', router),
      value: 'FACEBOOK',
    },
    {
      label: getLocaleString('twitter', router),
      value: 'TWITTER',
    },
    {
      label: getLocaleString('instagram', router),
      value: 'INSTAGRAM',
    },
    {
      label: getLocaleString('linkedin', router),
      value: 'LINKEDIN',
    },
    {
      label: getLocaleString('github', router),
      value: 'GITHUB',
    },
    {
      label: getLocaleString('website', router),
      value: 'WEBSITE',
    },
  ];
  const isLastItem = (index: number) => index === values.length - 1;

  return (
    <Grid container spacing={2}>
      {values.map((_contact, index) => (
        <Fragment key={`contact-${index}`}>
          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="bold">
              <Trans id="contact" /> {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <FXAutocomplete
              name={`contacts.${index}.type`}
              label={getLocaleString('type', router)}
              options={contactTypes}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`contacts.${index}.value`}
              label={getLocaleString('contact', router)}
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
        <Button variant="outlined" onClick={() => helpers.push(newContact)}>
          <AddIcon />
          <Trans id="add" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default observer(ContactsField);
