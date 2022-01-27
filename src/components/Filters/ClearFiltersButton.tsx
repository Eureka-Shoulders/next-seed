import { Delete as DeleteIcon } from '@mui/icons-material';

import { useFormixContext } from '@euk-labs/formix';

import SmallButton from './SmallButton';

export default function ClearFiltersButton() {
  const formix = useFormixContext();

  function handleReset() {
    formix.resetForm();
    formix.submitForm();
  }

  return (
    <SmallButton variant="contained" onClick={handleReset}>
      <DeleteIcon fontSize="small" />
    </SmallButton>
  );
}
