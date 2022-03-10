import { Delete as DeleteIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import useTranslation from '@core/hooks/useTranslation';

import { useFormixContext } from '@euk-labs/formix';

import SmallButton from './SmallButton';

interface Props {
  onClear: () => void;
}

export default function ClearFiltersButton({ onClear }: Props) {
  const formix = useFormixContext();
  const { translate } = useTranslation();

  function handleReset() {
    formix.resetForm();
    formix.submitForm();
    // onClear();
  }

  return (
    <Tooltip title={translate('actions.filters.clearAll')}>
      <SmallButton variant="contained" onClick={handleReset}>
        <DeleteIcon fontSize="small" />
      </SmallButton>
    </Tooltip>
  );
}
