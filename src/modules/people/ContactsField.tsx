import ERROR_MESSAGES from '@config/messages';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import FXAutocomplete from '@components/Inputs/FXAutocomplete';
import FXTextField from '@components/Inputs/FXTextField';

import { useArrayField } from '@euk-labs/formix/hooks';

function ContactsField() {
  const { values, helpers } = useArrayField('contacts');
  const hasValues = values.length > 0;
  const newContact = {
    type: null,
    value: '',
  };
  const contactTypes = [
    {
      label: 'Telefone',
      value: 'PHONE',
    },
    {
      label: 'E-mail',
      value: 'EMAIL',
    },
    {
      label: 'Facebook',
      value: 'FACEBOOK',
    },
    {
      label: 'Twitter',
      value: 'TWITTER',
    },
    {
      label: 'Instagram',
      value: 'INSTAGRAM',
    },
    {
      label: 'LinkedIn',
      value: 'LINKEDIN',
    },
    {
      label: 'GitHub',
      value: 'GITHUB',
    },
    {
      label: 'Website',
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
              Contato {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={6}>
            <FXAutocomplete
              name={`contacts.${index}.type`}
              label="Tipo"
              options={contactTypes}
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`contacts.${index}.value`} label="Contato" />
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
          Adicionar
        </Button>
      </Grid>

      {!hasValues && (
        <Grid item xs={12}>
          <FormHelperText error>{ERROR_MESSAGES.required}</FormHelperText>
        </Grid>
      )}
    </Grid>
  );
}

export default observer(ContactsField);
