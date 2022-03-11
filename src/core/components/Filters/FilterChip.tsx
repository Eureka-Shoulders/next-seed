import { Chip } from '@mui/material';
import { map } from 'ramda';

import { useFormixContext } from '@euk-labs/formix';

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

    formix.setFieldValue(field, newValue);
    formix.submitForm();
  }

  return <Chip label={label} onDelete={handleDelete} />;
}
