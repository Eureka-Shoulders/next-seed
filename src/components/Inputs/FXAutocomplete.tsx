import ERROR_MESSAGES from '@config/messages';
import { Autocomplete, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as zod from 'zod';

import { useField } from '@euk-labs/formix/hooks';

interface AutocompleteOption {
  label: string;
  value: string | number;
}

interface FieldProps {
  name: string;
  label?: string;
  options: readonly AutocompleteOption[];
}

export const AutocompleteSchema = zod.object(
  {
    label: zod.string(),
    value: zod.unknown(),
  },
  {
    required_error: ERROR_MESSAGES.required,
    invalid_type_error: ERROR_MESSAGES.required,
  }
);

function FXAutocomplete({ name, label, options, ...props }: FieldProps) {
  const { field, meta, helpers } = useField(name);

  const isOptionEqualToValue = (option: unknown, value: unknown) => {
    return (
      (option as AutocompleteOption).value ===
      (value as AutocompleteOption).value
    );
  };

  return (
    <Autocomplete
      {...field}
      {...props}
      fullWidth
      disablePortal
      options={options}
      onChange={(_event, value) => helpers.setValue(value)}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={(option) => (option as AutocompleteOption).label}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
}

export default observer(FXAutocomplete);
