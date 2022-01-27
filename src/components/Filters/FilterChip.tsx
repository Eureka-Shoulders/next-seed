import { Chip } from '@mui/material';

import { useFormixContext } from '@euk-labs/formix';

interface FilterChipProps {
  label: string;
  key: string;
}

export default function FilterChip({ label, key }: FilterChipProps) {
  const formix = useFormixContext();

  function handleDelete() {
    formix.setFieldValue(key, '');
    formix.submitForm();
  }

  return <Chip label={label} onDelete={handleDelete} />;
}
