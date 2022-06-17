import { AutocompleteOption, DateRangeOption } from '@types';
import { format } from 'date-fns';
import * as R from 'ramda';

import { EnumFilter, Filter, FilterEnum } from './types';

const getTrueKeys = R.pipe(R.filter(Boolean), R.keys);

function getEnumObject(enums: FilterEnum[]) {
  const enumerationPairs = enums.map(
    (enumeration) => [enumeration.value, false] as [string, boolean]
  );

  return R.fromPairs(enumerationPairs);
}

export function buildInitialValues(filters: Filter[]) {
  return R.pipe(
    R.map((filterObject: Filter): [string, unknown] => {
      switch (filterObject.type) {
        case 'date':
          return [filterObject.field, null];

        case 'autocomplete':
          return filterObject.multiple ? [filterObject.field, []] : [filterObject.field, null];

        case 'dateRange':
          return [filterObject.field, { start: null, end: null }];

        case 'enum':
          return [filterObject.field, getEnumObject(filterObject.enums)];

        default:
          return [filterObject.field, ''];
      }
    }),
    R.filter(Boolean),
    R.fromPairs
  )(filters);
}

export function getFilterValue(
  filterObject: Filter,
  values: Record<string, unknown>,
  useAutocompleteValue?: string[]
) {
  switch (filterObject.type) {
    case 'enum':
      return getTrueKeys(values[filterObject.field] as Record<string, boolean>);

    case 'autocomplete': {
      if (filterObject.multiple) {
        const autocompleteValue = values[filterObject.field] as AutocompleteOption[] | [];
        if (useAutocompleteValue?.includes(filterObject.field)) {
          return autocompleteValue.map((option) => option.value);
        }
        return autocompleteValue.map((option) => option.label);
      }
      const autocompleteValue = values[filterObject.field] as AutocompleteOption | null;
      if (useAutocompleteValue?.includes(filterObject.field)) {
        return autocompleteValue?.value;
      }
      return autocompleteValue?.label;
    }

    default:
      return values[filterObject.field];
  }
}

export interface FilterChip {
  title: string;
  field: string;
}

export const isAutocompleteOption = (x: unknown): x is AutocompleteOption =>
  R.has('label', x) && R.has('value', x);

export const isAutocompleteMultipleOption = (x: unknown): x is AutocompleteOption[] => {
  if (Array.isArray(x)) {
    return x.every((y) => isAutocompleteOption(y));
  }
  return false;
};

export const isDateRangeOption = (x: unknown): x is DateRangeOption =>
  R.has('start', x) || R.has('end', x);

export function getFilterChips(filters: Filter[], values: Record<string | number, unknown>) {
  return R.pipe(
    R.toPairs,
    R.filter(([, value]) => value !== '' && value !== null),
    R.map(([field, value]) => {
      const chip = {
        field,
        title: value,
      };

      if (field === 'orderBy') {
        return;
      }
      if (value instanceof Date) {
        chip.title = format(value, 'dd/MM/yyyy');
        return chip;
      }

      if (isAutocompleteOption(value)) {
        chip.title = value.label;
        return chip;
      }

      if (isAutocompleteMultipleOption(value)) {
        if (value.length === 0) return;
        chip.title = R.join(
          ', ',
          value.map((x) => x.label)
        );
        return chip;
      }

      if (isDateRangeOption(value)) {
        const start = value.start ? format(value.start, 'dd/MM/yyyy') : null;
        const end = value.end ? format(value.end, 'dd/MM/yyyy') : null;
        if (!start && !end) return;
        chip.title = start && end ? `${start} -> ${end}` : start;
        return chip;
      }

      if (typeof value === 'object') {
        if (R.isEmpty(R.filter(Boolean, value as Record<string, boolean>))) {
          return;
        }

        const enumOptions = filters.find((filter) => filter.field === field) as EnumFilter;

        const enumTitleGetter = R.pipe(
          R.filter(Boolean),
          R.keys,
          R.map(
            (key) => enumOptions.enums.find((enumOption) => enumOption.value === key)?.title || ''
          ),
          R.join(', ')
        );

        chip.title = enumTitleGetter(value);
        return chip;
      }

      return chip;
    })
  )(values);
}
