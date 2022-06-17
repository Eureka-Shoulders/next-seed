import { Page } from '@euk-labs/componentz/components/AppBar/types';

export function getBreadcrumbPaths(pages: Page[], pathname: string): Page[] {
  pathname = pathname.replace(/\[([^\]]+)\]/g, ':$1');

  const urlPaths = pathname.split('/');
  const paths = [];

  if (urlPaths.length === 2 && urlPaths[1] === '') {
    const newPage = pages.find((page) => page.link === '/app');

    return newPage ? [newPage] : [];
  }

  for (const path of urlPaths) {
    if (path === '') {
      continue;
    }

    const newPage = pages.find((page) => page.link === `/${path}`);

    if (!newPage) {
      return paths;
    }

    pages = newPage.sub ?? [];
    paths.push({ ...newPage, sub: undefined });
  }

  return paths;
}
