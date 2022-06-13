import { useFormixContext } from '@euk-labs/formix';
import { Save } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { BottomRightFab } from './BottomRightFab';

const FXSubmitFab = () => {
  const formixContext = useFormixContext();

  const disabled = formixContext.isSubmitting || !formixContext.isValid;
  const loading = formixContext.isSubmitting;

  return (
    <BottomRightFab disabled={disabled} type="submit" color="primary" aria-label="add">
      {loading ? <CircularProgress color="primary" size={20} /> : <Save />}
    </BottomRightFab>
  );
};

export default observer(FXSubmitFab);
