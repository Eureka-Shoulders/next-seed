import { Pages } from '@locales/types/pages';

export const pages: Pages = {
  users: {
    list: 'Users',
    create: 'Create User',
    edit: 'Edit User',
  },
  people: {
    list: 'People',
    create: 'Create Person',
    edit: 'Edit Person',
  },
  noPermissions: {
    title: 'Access denied',
    description: `You don't got the necessary permissions to access this page`,
    buttonLabel: 'Home page',
  },
  notFound: {
    title: 'Page not found',
    description: 'The page you are trying to access does not exist',
  },
  entityNotFound: {
    title: 'Entity not found',
    description: 'The entity you are trying to access does not exist',
  },
  ohNo: {
    title: 'Oh no!',
    description:
      "Something unexpected happened while you were using our application. We are going to analyze the problem and try to fix it as soon as possible. Please, don't worry, your data is safe.",
  },
};
