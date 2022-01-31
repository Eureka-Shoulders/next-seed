import { add, format } from 'date-fns';

import { Filter } from '@components/Filters/types';

export const filters: Filter[] = [
  {
    field: 'name',
    title: 'Nome',
    type: 'string',
  },
  {
    field: 'email',
    title: 'E-mail',
    type: 'string',
  },
  {
    field: 'createdAt',
    title: 'Data de criação',
    type: 'date',
  },
];

export function buildFilters(
  filters: Record<string, unknown>,
  urlSearchParams: URLSearchParams
) {
  const whereObject: Record<string, unknown> = {};

  if (filters.name) {
    whereObject.person = { name: { contains: filters.name } };
  }

  if (filters.email) {
    whereObject.email = { contains: filters.email };
  }

  if (filters.createdAt) {
    const date = new Date(format(filters.createdAt as Date, 'yyyy-MM-dd'));
    whereObject.createdAt = {
      gte: date,
      lt: add(date, { days: 1 }),
    };
  }

  urlSearchParams.set('where', JSON.stringify(whereObject));
}
