import { observer } from 'mobx-react-lite';
import { Actions, Subjects } from 'types';

import { useUserStore } from '@hooks/stores';

interface Props {
  children: React.ReactNode;
  action: Actions;
  subject: Subjects;
}

function Can({ children, ...props }: Props) {
  const userStore = useUserStore();

  if (
    userStore.isLogged &&
    userStore.abilities!.can(props.action, props.subject)
  ) {
    return <>{children}</>;
  }

  return null;
}

export default observer(Can);
