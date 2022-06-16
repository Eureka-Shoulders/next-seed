import { add, format } from 'date-fns';

import { Filter } from '@core/components/Filters/types';

import { TranslateFunc } from '@services/translation';

export function getFilters(translate: TranslateFunc): Filter[] {
  return [
    {
      field: 'name',
      title: translate('common.name'),
      type: 'string',
    },
    {
      field: 'identifier',
      title: translate('common.identifier'),
      type: 'string',
    },
    {
      field: 'birthDate',
      title: translate('common.birthDate'),
      type: 'date',
    },
    {
      field: 'createdAt',
      title: translate('common.createdAt'),
      type: 'date',
    },
  ];
}

export function buildFilters(filters: Record<string, unknown>, urlSearchParams: URLSearchParams) {
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
