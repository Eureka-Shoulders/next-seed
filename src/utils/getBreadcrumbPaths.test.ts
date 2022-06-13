import { Page } from '@euk-labs/componentz/components/AppBar/types';

import { getBreadcrumbPaths } from './getBreadcrumbPaths';

const pages = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Users',
    link: '/users',
    sub: [
      {
        label: 'Create',
        link: '/new',
      },
      {
        label: 'Edit',
        link: '/:id',
      },
    ],
  },
  {
    label: 'People',
    link: '/people',
    sub: [
      {
        label: 'Create',
        link: '/new',
      },
      {
        label: 'Edit',
        link: '/:id',
      },
    ],
  },
] as Page[];

describe('Breadcrumb Tests', () => {
  it('should get only home path', () => {
    const route = '/';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(1);
    expect(paths[0].label).toBe('Home');
  });

  it('should get users path', () => {
    const route = '/users';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(1);
    expect(paths[0].label).toBe('Users');
  });

  it('should get users create path', () => {
    const route = '/users/new';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(2);
    expect(paths[0].label).toBe('Users');
    expect(paths[1].label).toBe('Create');
  });

  it('should get users edit path', () => {
    const route = '/users/[id]';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(2);
    expect(paths[0].label).toBe('Users');
    expect(paths[1].label).toBe('Edit');
  });
});
