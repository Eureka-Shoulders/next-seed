import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import Trans from '@components/Trans';
import When from '@components/When';

import useTranslation from '@hooks/useTranslation';

import { useArrayField } from '@euk-labs/formix';
import { FXAutocomplete, FXTextField } from '@euk-labs/formix-mui';

function ContactsField() {
  const { translate } = useTranslation();
  const { values, helpers } = useArrayField('contacts');
  const newContact = {
    type: null,
    value: '',
  };
  const contactTypes = [
    {
      label: translate('common.phone'),
      value: 'PHONE',
    },
    {
      label: translate('common.email'),
      value: 'EMAIL',
    },
    {
      label: translate('common.facebook'),
      value: 'FACEBOOK',
    },
    {
      label: translate('common.twitter'),
      value: 'TWITTER',
    },
    {
      label: translate('common.instagram'),
      value: 'INSTAGRAM',
    },
    {
      label: translate('common.linkedin'),
      value: 'LINKEDIN',
    },
    {
      label: translate('common.github'),
      value: 'GITHUB',
    },
    {
      label: translate('common.website'),
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
              <Trans id="common.contact" /> {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <FXAutocomplete
              name={`contacts.${index}.type`}
              label={translate('common.type')}
              options={contactTypes}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`contacts.${index}.value`}
              label={translate('common.contact')}
            />
          </Grid>

          <When isNot={isLastItem(index)}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </When>
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => helpers.push(newContact)}>
          <AddIcon />
          <Trans id="actions.add" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default observer(ContactsField);
