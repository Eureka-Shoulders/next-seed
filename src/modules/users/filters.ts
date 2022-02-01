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
      field: 'email',
      title: getLocaleString('email', router),
      type: 'string',
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
