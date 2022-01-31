import { add, format } from 'date-fns';

import { Filter } from '@components/Filters/types';

export const filters: Filter[] = [
  {
    field: 'name',
    title: 'Nome',
    type: 'string',
  },
  {
    field: 'identifier',
    title: 'Identificador',
    type: 'string',
  },
  {
    field: 'birthDate',
    title: 'Data de Nascimento',
    type: 'date',
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
    whereObject.name = { contains: filters.name };
  }

  if (filters.identifier) {
    whereObject.identifier = { contains: filters.identifier };
  }

  if (filters.birthDate) {
    const date = new Date(format(filters.birthDate as Date, 'yyyy-MM-dd'));
    whereObject.birthDate = {
      gte: date,
      lt: add(date, { days: 1 }),
    };
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
