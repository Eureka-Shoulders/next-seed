import { Avatar, Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import useTranslation from '@core/hooks/useTranslation';

import { useUserStore } from '@hooks/stores';

function ProfileCard() {
  const userStore = useUserStore();
  const { translate } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={userStore.user?.avatar ?? undefined}
        sx={{
          width: 150,
          height: 150,
        }}
      />
      <Typography variant="h6" textAlign="center">
        {userStore.user?.person.name || translate('common.noName')}
      </Typography>
    </Box>
  );
}

export default observer(ProfileCard);
