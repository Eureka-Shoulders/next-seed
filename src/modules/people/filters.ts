import { add, format } from 'date-fns';
import getLocaleString from 'locales/getLocaleString';
import { NextRouter } from 'next/router';

import { Filter } from '@components/Filters/types';

export function getFilters(router: NextRouter): Filter[] {
  return [
    {
      field: 'name',
      title: getLocaleString('name', router),
      type: 'string',
    },
    {
      field: 'identifier',
      title: getLocaleString('identifier', router),
      type: 'string',
    },
    {
      field: 'birthDate',
      title: getLocaleString('birthDate', router),
      type: 'date',
    },
    {
      field: 'createdAt',
      title: getLocaleString('createdAt', router),
      type: 'date',
    },
  ];
}

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
