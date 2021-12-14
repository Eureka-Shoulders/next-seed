import { Page } from '@config/pages';

export function getBreadcrumbPaths(pages: Page[], pathname: string): Page[] {
  const urlPaths = pathname.split('/');
  let paths = [];

  if (urlPaths.length === 2 && urlPaths[1] === '') {
    const newPage = pages.find((page) => page.link === '/');

    if (!newPage) {
      return [];
    }
    return [newPage];
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
