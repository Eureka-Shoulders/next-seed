import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import useTranslation from '@core/hooks/useTranslation';

import { EntityStore } from '@euk-labs/fetchx';

interface Props {
  children: React.ReactNode;
  entityStore: EntityStore;
}

function EntityUpdateWrapper({ children, entityStore }: Props) {
  const { translate } = useTranslation();

  useEffect(() => {
    if (entityStore.identifier) {
      entityStore.fetch();
    }
  }, [entityStore.identifier]); // eslint-disable-line

  if (entityStore.data && entityStore.identifier) {
    return <>{children}</>;
  }

  if (entityStore.identifier === null || entityStore.loading) {
    return (
      <Box p={3}>
        <Typography variant="h4">{translate('common.loading')}...</Typography>
      </Box>
    );
  }

  if (entityStore.data === null) {
    return (
      <Box p={3}>
        <Typography variant="h4">
          {translate('errors.people.notFound')}
        </Typography>
      </Box>
    );
  }

  return null;
}

export default observer(EntityUpdateWrapper);
