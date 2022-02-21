import { GridColDef } from '@mui/x-data-grid';
import { filter, fromPairs, map, pipe } from 'ramda';

import { Filter } from './types';

export function buildInitialValues(columns: GridColDef[]) {
  const pairs = filter(
    Boolean,
    map((column) => {
      if (column.filterable || column.filterable === undefined) {
        if (column.type === 'date') {
          return [column.field, null];
        }

        return [column.field, ''];
      }
    }, columns)
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
