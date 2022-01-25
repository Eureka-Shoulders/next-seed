import { LoadingButton } from '@mui/lab';
import { ButtonProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useFormixContext } from '@euk-labs/formix';

interface FXSubmitButtonProps extends ButtonProps {
  label: string;
}

function FXSubmitButton({ label, ...props }: FXSubmitButtonProps) {
  const formix = useFormixContext();

  return (
    <LoadingButton
      loading={formix.isSubmitting}
      disabled={!formix.isValid || formix.isSubmitting}
      variant="contained"
      type="submit"
      {...props}
    >
      {label}
    </LoadingButton>
  );
}

export default observer(FXSubmitButton);
