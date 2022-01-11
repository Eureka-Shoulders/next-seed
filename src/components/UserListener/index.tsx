import { useUserStore } from 'hooks/stores';
import { useEffect } from 'react';

interface UserListenerProps {
  isPublicPage: boolean;
}

function UserListener({ isPublicPage }: UserListenerProps) {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage) {
      userStore.verifyToken();
    }
  }, [isPublicPage]); // eslint-disable-line

  return null;
}

export default UserListener;
