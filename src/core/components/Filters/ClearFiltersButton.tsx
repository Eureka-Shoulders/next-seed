import { useFormixContext } from '@euk-labs/formix';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { useTranslation } from '@hooks/services';

import SmallButton from './SmallButton';

export default function ClearFiltersButton() {
  const formix = useFormixContext();
  const { translate } = useTranslation();

  function handleReset() {
    formix.resetForm();
    formix.submitForm();
  }

  return (
    <Tooltip title={translate('actions.filters.clearAll')}>
      <SmallButton variant="contained" onClick={handleReset}>
        <DeleteIcon fontSize="small" />
      </SmallButton>
    </Tooltip>
  );
}
