import { filter, fromPairs, map, pipe } from 'ramda';

import { Filter, FilterEnum } from './types';

function getEnumObject(enums: FilterEnum[]) {
  const enumerationPairs = enums.map(
    (enumeration) => [enumeration.value, false] as [string, boolean]
  );

  return fromPairs(enumerationPairs);
}

export function buildInitialValues(filters: Filter[]) {
  const pairs = filter(
    Boolean,
    map((filterObject) => {
      if (filterObject.type === 'date') {
        return [filterObject.field, null];
      }

      if (filterObject.type === 'enum') {
        return [filterObject.field, getEnumObject(filterObject.enums)];
      }

      return [filterObject.field, ''];
    }, filters)
  ) as [key: string, value: string | null][];
  return fromPairs(pairs);
}

export function getFilterValue(
  filterObject: Filter,
  values: Record<string, unknown>
) {
  switch (filterObject.type) {
    case 'enum':
      return pipe(
        Object.entries,
        filter(([, value]) => value),
        map(([key]) => key)
      )(values[filterObject.field] as Record<string, boolean>);

    default:
      return values[filterObject.field];
  }
}
