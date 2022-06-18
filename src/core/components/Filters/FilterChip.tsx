import { useFormixContext } from '@euk-labs/formix';
import { Chip } from '@mui/material';
import { map } from 'ramda';

import { isAutocompleteMultipleOption, isAutocompleteOption, isDateRangeOption } from './utils';

interface FilterChipProps {
  label: string;
  field: string;
}

export default function FilterChip({ label, field }: FilterChipProps) {
  const formix = useFormixContext<Record<string, unknown>>();
  const value = formix.values[field];

  function handleDelete() {
    let newValue: unknown = '';

    if (value instanceof Date) {
      newValue = null;
    } else if (typeof value === 'object' && value !== null) {
      newValue = map(() => false, value) as Record<string, boolean>;
    }

    if (value instanceof Date) {
      newValue = null;
    } else if (typeof value === 'object' && value !== null) {
      newValue = map(() => false, value) as Record<string, boolean>;
    }

    if (isAutocompleteMultipleOption(value)) {
      newValue = [];
    }

    if (isAutocompleteOption(value)) {
      newValue = null;
    }

    if (isDateRangeOption(value)) {
      newValue = { start: null, end: null };
    }

    formix.setFieldValue(field, newValue);
    formix.submitForm();
  }

  return <Chip label={label} onDelete={handleDelete} />;
}
