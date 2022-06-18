import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

import { useTranslation } from '@hooks/services';

import { BottomRightFab } from './BottomRightFab';

type NewEntityFabProps = {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
};

export default function NewEntityFab({ onClick, disabled, title }: NewEntityFabProps) {
  const router = useRouter();
  const { translate } = useTranslation();

  function handleClick() {
    if (!onClick) router.push(router.pathname + '/new');
    else onClick();
  }

  if (disabled) return null;

  return (
    <Tooltip title={title || translate('actions.add')}>
      <BottomRightFab onClick={handleClick} color="primary" aria-label="add">
        <AddIcon />
      </BottomRightFab>
    </Tooltip>
  );
}
