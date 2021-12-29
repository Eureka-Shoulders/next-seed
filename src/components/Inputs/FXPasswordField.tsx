import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useState } from 'react';

import { useField } from '@euk-labs/formix/hooks';

interface FieldProps {
  name: string;
  label?: string;
}

function FXTextField({ name, label }: FieldProps) {
  const { field, meta } = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <TextField
      {...field}
      fullWidth
      type={showPassword ? 'text' : 'password'}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default observer(FXTextField);
