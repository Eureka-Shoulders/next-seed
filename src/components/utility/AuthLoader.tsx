import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import Loading from '@components/Loading';

import { useUserStore } from '@hooks/stores';

interface Props {
  children: React.ReactNode;
}

function AuthLoader({ children }: Props) {
  const userStore = useUserStore();
  const router = useRouter();
  const privatePath = router.pathname.split('/')[1];

  if (!userStore.isLogged && privatePath === 'app') return <Loading />;

  return <>{children}</>;
}

export default observer(AuthLoader);
