import { Delete as DeleteIcon } from '@mui/icons-material';

import { useFormixContext } from '@euk-labs/formix';

import SmallButton from './SmallButton';

interface Props {
  onClear: () => void;
}

export default function ClearFiltersButton({ onClear }: Props) {
  const formix = useFormixContext();

  function handleReset() {
    formix.resetForm();
    formix.submitForm();
    onClear();
  }

  return (
    <SmallButton variant="contained" onClick={handleReset}>
      <DeleteIcon fontSize="small" />
    </SmallButton>
  );
}
