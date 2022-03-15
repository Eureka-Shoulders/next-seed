import { getPages } from '@config/pages';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useTranslation from '@core/hooks/useTranslation';

import { useThemeStore, useUserStore } from '@hooks/stores';

import { useUIStore } from '@euk-labs/componentz';

import AppBarHeader from './AppBarBuilder/AppBarHeader';
import DrawerHeader from './AppBarBuilder/DrawerHeader';
import { getBreadcrumbPaths } from './Breadcrumbs/getBreadcrumbPaths';

interface CoreListenerProps {
  isPublicPage: boolean;
}

function CoreListener({ isPublicPage }: CoreListenerProps) {
  const themeStore = useThemeStore();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter();
  const { translate } = useTranslation();

  useEffect(() => {
    /**
     * Hydrating stores on client-side
     */
    themeStore.hydrate();

    /**
     * Starting API interceptors
     */
    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();

    /**
     * AppBar configuration
     */
    uiStore.appBar.setDrawerHeaderContent(<DrawerHeader />);
    uiStore.appBar.setAppBarHeaderContent(<AppBarHeader />);
    uiStore.appBar.setOnClickDrawerOption((page) => {
      router.push(page.link);
    });
  }, []); // eslint-disable-line

  /**
   * Breadcrumb configuration
   */
  useEffect(() => {
    if (userStore.abilities) {
      const pages = getPages(userStore.abilities, translate);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);

      uiStore.breadcrumb.setPaths(breadcrumbPaths);
      uiStore.breadcrumb.setOnClickBreadcrumbPath((breadcrumbPath) => {
        router.push(breadcrumbPath.link);
      });
    }
  }, [router.pathname, userStore.abilities]); // eslint-disable-line

  /**
   * AppBar pages configuration based on user roles
   */
  useEffect(() => {
    if (userStore.abilities) {
      const pages = getPages(userStore.abilities, translate);

      uiStore.appBar.setPages(pages);
    }
  }, [userStore.abilities]); // eslint-disable-line

  /**
   * User authentication on private pages
   */
  useEffect(() => {
    if (!isPublicPage) {
      userStore.verifyToken();
    }
  }, [isPublicPage]); // eslint-disable-line

  /**
   * Validating user permissions on private pages
   */
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

export default observer(CoreListener);
