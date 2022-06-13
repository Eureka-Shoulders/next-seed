import { EntityStore } from '@euk-labs/fetchx';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useTranslation } from '@hooks/services';

interface Props {
  children: React.ReactNode;
  entityStore: EntityStore;
}

function EntityUpdateWrapper({ children, entityStore }: Props) {
  const { translate } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (entityStore.identifier) {
      entityStore.fetch();
    }
  }, [entityStore.identifier]);

  if (entityStore.data && entityStore.identifier) {
    return <>{children}</>;
  }

  // TODO: implement a loading animation
  if (entityStore.identifier === null || entityStore.loading) {
    return (
      <Box p={3}>
        <Typography variant="h4">{translate('common.loading')}...</Typography>
      </Box>
    );
  }

  if (entityStore.data === null) {
    router.push('/entity-not-found');
  }

  return null;
}

export default observer(EntityUpdateWrapper);
