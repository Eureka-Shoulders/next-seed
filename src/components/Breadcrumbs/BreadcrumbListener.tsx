import { getPages } from 'config/pages';
import { useUserStore } from 'hooks/stores';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getBreadcrumbPaths } from '@components/Breadcrumbs/getBreadcrumbPaths';

import { useUIStore } from '@euk-labs/componentz';

function BreadcrumbListener() {
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (userStore.abilities) {
      const pages = getPages(userStore.abilities, router);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);

      uiStore.breadcrumb.setPaths(breadcrumbPaths);
      uiStore.breadcrumb.setOnClickBreadcrumbPath((breadcrumbPath) => {
        router.push(breadcrumbPath.link);
      });
    }
  }, [router.pathname, userStore.abilities]); // eslint-disable-line

  return null;
}

export default observer(BreadcrumbListener);
