import { add, format } from 'date-fns';

import { Filter } from '@core/components/Filters/types';
import { TranslateFunc } from '@core/hooks/useTranslation';

export function getFilters(translate: TranslateFunc): Filter[] {
  return [
    {
      field: 'name',
      title: translate('common.name'),
      type: 'string',
    },
    {
      field: 'email',
      title: translate('common.email'),
      type: 'string',
    },
    {
      field: 'createdAt',
      title: translate('common.createdAt'),
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

  /**
   * This is just an example of how to use the enum filter
   */
  // if (filters.enumeration) {
  //   whereObject.enumeration = {
  //     in: filters.enumeration as string[],
  //   };
  // }

  urlSearchParams.set('where', JSON.stringify(whereObject));
}
