import { observer } from 'mobx-react-lite';

import Loading from '@components/Loading';

import { useUserStore } from '@hooks/stores';

interface Props {
  children: React.ReactNode;
}

function AuthLoader({ children }: Props) {
  const userStore = useUserStore();

  if (!userStore.isLogged) return <Loading />;

  return <>{children}</>;
}

export default observer(AuthLoader);
