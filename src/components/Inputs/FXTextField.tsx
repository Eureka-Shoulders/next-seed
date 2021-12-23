import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useField } from '@euk-labs/formix';

interface FieldProps {
  name: string;
  label?: string;
}

function FXTextField({ name, label, ...props }: FieldProps & TextFieldProps) {
  const { field, meta } = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
}

export default observer(FXTextField);
