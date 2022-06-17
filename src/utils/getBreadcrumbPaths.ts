import { Page } from '@euk-labs/componentz/components/AppBar/types';

export function getBreadcrumbPaths(pages: Page[], pathname: string): Page[] {
  pathname = pathname.replace(/\[([^\]]+)\]/g, ':$1');

  const paths: Page[] = [];

  pages.forEach((page) => {
    if (pathname.includes(page.link)) {
      paths.push(page);

      if (page.sub) {
        const currentPath = page.sub.find((sub) => pathname.includes(sub.link));
        if (!currentPath) return;
        paths.push(currentPath);
      }
    }
  });

  return paths;
}
