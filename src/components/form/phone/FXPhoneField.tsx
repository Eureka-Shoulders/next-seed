/* eslint-disable react/display-name */
import { useField } from '@euk-labs/formix';
import { TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import CustomSelect from './CountrySelect';

type FXPhoneFieldProps = { label: string; name: string };

const TextFieldForwarded = forwardRef((props, ref) => {
  return <TextField inputRef={ref} {...props} />;
});

export default function FXPhoneField({ label, name }: FXPhoneFieldProps) {
  const { field, helpers } = useField<string>(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <PhoneInput
      {...field}
      onChange={handleChange}
      countrySelectComponent={CustomSelect}
      placeholder={label}
      inputComponent={TextFieldForwarded}
    />
  );
}
