import { Chip } from '@mui/material';

import { useFormixContext } from '@euk-labs/formix';

interface FilterChipProps {
  label: string;
  field: string;
}

export default function FilterChip({ label, field }: FilterChipProps) {
  const formix = useFormixContext();

  function handleDelete() {
    formix.setFieldValue(field, '');
    formix.submitForm();
  }

  return <Chip label={label} onDelete={handleDelete} />;
}
