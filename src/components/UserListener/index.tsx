import { getPages } from '@config/pages';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getBreadcrumbPaths } from '@components/Breadcrumbs/getBreadcrumbPaths';

interface UserListenerProps {
  isPublicPage: boolean;
}

function UserListener({ isPublicPage }: UserListenerProps) {
  const userStore = useUserStore();
  const router = useRouter();

  useEffect(() => {
    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage) {
      userStore.verifyToken();
    }
  }, [isPublicPage]); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage && userStore.user) {
      const pages = getPages(userStore.abilities);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);
      const lastPath = breadcrumbPaths.pop();

      if (lastPath?.disabled) {
        router.push('/no-permissions');
      }
    }
  }, [isPublicPage, userStore.user]); // eslint-disable-line

  return null;
}

export default observer(UserListener);
