import { format } from 'date-fns';
import {
  filter,
  fromPairs,
  isEmpty,
  join,
  keys,
  map,
  pipe,
  toPairs,
} from 'ramda';

import { EnumFilter, Filter, FilterEnum } from './types';

const getTrueKeys = pipe(filter(Boolean), keys);

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
      return getTrueKeys(values[filterObject.field] as Record<string, boolean>);

    default:
      return values[filterObject.field];
  }
}

export interface FilterChip {
  title: string;
  field: string;
}

export function getFilterChips(
  filters: Filter[],
  values: Record<string | number, unknown>
) {
  return pipe(
    toPairs,
    filter(([, value]) => value !== '' && value !== null),
    map(([field, value]) => {
      const chip = {
        field,
        title: value,
      };

      if (field === 'sort') {
        return;
      }
      if (value instanceof Date) {
        chip.title = format(value, 'dd/MM/yyyy');
        return chip;
      }
      if (typeof value === 'object') {
        if (isEmpty(filter(Boolean, value as Record<string, boolean>))) {
          return;
        }

        const enumOptions = filters.find(
          (filter) => filter.field === field
        ) as EnumFilter;
        const enumTitleGetter = pipe(
          filter(Boolean),
          keys,
          map(
            (key) =>
              enumOptions.enums.find((enumOption) => enumOption.value === key)
                ?.title || ''
          ),
          join(', ')
        );

        chip.title = enumTitleGetter(value);
        return chip;
      }

      return chip;
    })
  )(values);
}
