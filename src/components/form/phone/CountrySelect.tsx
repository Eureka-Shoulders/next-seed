import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';

type CountrySelectProps = {
  value: string;
  onChange: (value: unknown) => void;
  options: {
    value: string;
    label: string;
    divider?: boolean;
  }[];
};

const DIVIDER_STYLE = {
  fontSize: '1px',
  backgroundColor: 'currentColor',
  color: 'inherit',
};

export default function CountrySelect({ value, onChange, options, ...rest }: CountrySelectProps) {
  const onChange_ = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const value = event.target.value;
      onChange(value === 'ZZ' ? undefined : value);
    },
    [onChange]
  );

  return (
    <Box pr={2}>
      <Select {...rest} value={value || 'ZZ'} onChange={onChange_}>
        {options.map(({ value, label, divider }) => (
          <MenuItem
            key={divider ? '|' : value || 'ZZ'}
            value={divider ? '|' : value || 'ZZ'}
            disabled={divider ? true : false}
            style={divider ? DIVIDER_STYLE : undefined}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
