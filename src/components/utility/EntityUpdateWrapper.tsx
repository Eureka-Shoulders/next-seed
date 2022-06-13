import { EntityStore } from '@euk-labs/fetchx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loading from '@components/Loading';

interface Props {
  children: React.ReactNode;
  entityStore: EntityStore;
}

function EntityUpdateWrapper({ children, entityStore }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (entityStore.identifier) {
      entityStore.fetch();
    }
  }, [entityStore.identifier]);

  if (entityStore.data && entityStore.identifier) {
    return <>{children}</>;
  }

  if (entityStore.identifier === null || entityStore.loading) {
    return <Loading />;
  }

  if (entityStore.data === null) {
    router.push('/entity-not-found');
  }

  return null;
}

export default observer(EntityUpdateWrapper);
