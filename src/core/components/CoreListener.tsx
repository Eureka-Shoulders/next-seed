import { getPages } from '@config/pages';
import TYPES from '@containers/global.types';
import { useContainer } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import useTranslation from '@core/hooks/useTranslation';
import { ThemeType } from '@core/stores/theme';

import { useThemeStore, useUserStore } from '@hooks/stores';

import { useUIStore } from '@euk-labs/componentz';

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
  }, [router.locale]); // eslint-disable-line

  useEffect(() => {
    const cookies = parseCookies();
    const themeFromCookies = cookies.theme as ThemeType | null;

    if (themeFromCookies) {
      themeStore.setTheme(themeFromCookies);
    }

    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();

    uiStore.appBar.setDrawerHeaderContent(<DrawerHeader />);
    uiStore.appBar.setAppBarHeaderContent(<AppBarHeader />);
    uiStore.appBar.setOnClickDrawerOption((page) => {
      router.push(page.link);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isPublicPage) {
      userStore.verifyToken();
    }
  }, [isPublicPage]); // eslint-disable-line

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
  }, [router.pathname, userStore.abilities]); // eslint-disable-line

  return null;
}

export default observer(CoreListener);
