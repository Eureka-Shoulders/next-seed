import { Box, Skeleton } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useUserStore } from '@hooks/stores';

interface Props {
  children: React.ReactNode;
}

function AuthLoader({ children }: Props) {
  const userStore = useUserStore();

  if (!userStore.isLogged) {
    return (
      <Box p={3}>
        <Skeleton variant="rectangular" width="100%" height={500} />
      </Box>
    );
  }

  return <>{children}</>;
}

export default observer(AuthLoader);
