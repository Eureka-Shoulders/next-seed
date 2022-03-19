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
    return <h1>{translate('common.loading')}...</h1>;
  }

  if (entityStore.data === null) {
    return <h1>{translate('errors.people.notFound')}</h1>;
  }

  return null;
}

export default observer(EntityUpdateWrapper);
