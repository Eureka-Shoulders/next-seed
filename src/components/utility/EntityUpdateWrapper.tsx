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

  async function fetch() {
    try {
      await entityStore.fetch();
    } catch (error) {
      router.push('/app/entity-not-found');
    }
  }

  useEffect(() => {
    if (entityStore.identifier) {
      fetch();
    }
  }, [entityStore.identifier]);

  if (entityStore.data && entityStore.identifier) {
    return <>{children}</>;
  }

  return <Loading />;
}

export default observer(EntityUpdateWrapper);
