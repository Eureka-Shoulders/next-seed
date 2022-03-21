import { getPages } from '@config/pages';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getBreadcrumbPaths } from '@core/components/Breadcrumbs/getBreadcrumbPaths';
import useTranslation from '@core/hooks/useTranslation';

import { useAuthService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

interface UserListenerProps {
  isPublicPage: boolean;
}

function UserListener({ isPublicPage }: UserListenerProps) {
  const userStore = useUserStore();
  const authService = useAuthService();
  const router = useRouter();
  const { translate } = useTranslation();

  useEffect(() => {
    authService.startTokenInjector();
    authService.catchUnauthorizedErrors();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage) {
      authService.verifyToken();
    }
  }, [isPublicPage]); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage && userStore.user && userStore.abilities) {
      const pages = getPages(userStore.abilities, translate);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);
      const lastPath = breadcrumbPaths.pop();

      if (lastPath?.disabled) {
        router.push('/no-permissions');
      }
    }
  }, [isPublicPage, userStore.abilities, userStore.user]); // eslint-disable-line

  return null;
}

export default observer(UserListener);
