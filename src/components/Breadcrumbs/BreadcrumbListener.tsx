import { pages } from 'config/pages';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getBreadcrumbPaths } from '@components/Breadcrumbs/getBreadcrumbPaths';

import useUIStore from '@euk-labs/componentz/hooks/useUIStore';

export const BreadcrumbListener = () => {
  const uiStore = useUIStore();
  const router = useRouter();

  useEffect(() => {
    const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);
    uiStore.breadcrumb.setPaths(breadcrumbPaths);
  }, [router.pathname]); // eslint-disable-line

  return null;
};
