import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react-lite';

import { useFormixContext } from '@euk-labs/formix/hooks';

interface FXSubmitButtonProps {
  label: string;
}

function FXSubmitButton({ label }: FXSubmitButtonProps) {
  const formix = useFormixContext();

  return (
    <LoadingButton
      loading={formix.isSubmitting}
      disabled={formix.isSubmitting}
      variant="contained"
      type="submit"
    >
      {label}
    </LoadingButton>
  );
}

export default observer(FXSubmitButton);
