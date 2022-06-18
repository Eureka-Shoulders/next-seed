import { Page } from '@euk-labs/componentz/components/AppBar/types';

import { getBreadcrumbPaths } from './getBreadcrumbPaths';

const pages = [
  {
    label: 'Home',
    link: '/app',
  },
  {
    label: 'Users',
    link: '/app/users',
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
    link: '/app/people',
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
    const route = '/app';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(1);
    expect(paths[0].label).toBe('Home');
  });

  it('should get users path', () => {
    const route = '/app/users';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(2);
    expect(paths[0].label).toBe('Home');
    expect(paths[1].label).toBe('Users');
  });

  it('should get users create path', () => {
    const route = '/app/users/new';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(3);
    expect(paths[0].label).toBe('Home');
    expect(paths[1].label).toBe('Users');
    expect(paths[2].label).toBe('Create');
  });

  it('should get users edit path', () => {
    const route = '/app/users/[id]';
    const paths = getBreadcrumbPaths(pages, route);

    expect(paths).toHaveLength(3);
    expect(paths[0].label).toBe('Home');
    expect(paths[1].label).toBe('Users');
    expect(paths[2].label).toBe('Edit');
  });
});
