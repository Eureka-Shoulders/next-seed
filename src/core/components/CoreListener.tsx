import { useUIStore } from '@euk-labs/componentz';
import { useContainer } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { getPages } from '@config/pages';

import TYPES from '@containers/global.types';

import { useTranslation } from '@hooks/services';
import { useThemeStore, useUserStore } from '@hooks/stores';

import { ThemeType } from '@stores/theme';

import AppBarHeader from './AppBarBuilder/AppBarHeader';
import DrawerHeader from './AppBarBuilder/DrawerHeader';
import { getBreadcrumbPaths } from './Breadcrumbs/getBreadcrumbPaths';

interface CoreListenerProps {
  isPublicPage: boolean;
}

function CoreListener({ isPublicPage }: CoreListenerProps) {
  const { translate } = useTranslation();
  const container = useContainer();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const themeStore = useThemeStore();
  const router = useRouter();

  useEffect(() => {
    if (router.locale) {
      container.rebind(TYPES.Locale).toConstantValue(router.locale);
    }
  }, [router.locale]);

  useEffect(() => {
    const cookies = parseCookies();
    const themeFromCookies = cookies.theme as ThemeType | null;

    if (themeFromCookies) {
      themeStore.setTheme(themeFromCookies);
    }

    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();
    userStore.catchForbiddenErrors();

    uiStore.appBar.setDrawerHeaderContent(<DrawerHeader />);
    uiStore.appBar.setAppBarHeaderContent(<AppBarHeader />);
    uiStore.appBar.setOnClickDrawerOption((page) => {
      router.push(page.link);
    });
  }, []);

  useEffect(() => {
    if (!isPublicPage) {
      userStore.verifyToken();
    }
  }, [isPublicPage]);

  useEffect(() => {
    if (userStore.abilities) {
      const pages = getPages(userStore.abilities, translate);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);

      uiStore.breadcrumb.setPaths(breadcrumbPaths);
      uiStore.breadcrumb.setOnClickBreadcrumbPath((breadcrumbPath) => {
        router.push(breadcrumbPath.link);
      });
      uiStore.appBar.setPages(pages);

      if (!isPublicPage) {
        const lastPath = breadcrumbPaths.pop();
        if (lastPath?.disabled) {
          router.push('/no-permissions');
        }
      }
    }
  }, [router.pathname, userStore.abilities]);

  return null;
}

export default observer(CoreListener);
